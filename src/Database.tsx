import {firestore} from "./App";
import {
    setDoc,
    doc,
    serverTimestamp,
    QuerySnapshot,
    DocumentData,
    deleteDoc,
    getDoc
} from "firebase/firestore";
import {LinkData} from "./types";



export async function write(userid: string | undefined, url: string, surl: string) {
    if (!userid) return;
    let result = generateDistinct(5);
    //Legacy: remove later
    let urlResult = generateDistinct(10);
    url = url === "" ? urlResult : url;
    surl = surl === "" ? result : surl;
    //TODO: Validate surl, right now it overwrites if same surl
    //possible idea, querery , where: surl == surl
    try {
        await setDoc(doc(firestore, 'links', surl),{
            surl: url
        })
        await setDoc(doc(firestore,`users/${userid}/userLinks`, surl),{
            surl: url,
            time: serverTimestamp()
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

/**
 * Creates a random string with distinct lettering
 */
export function generateDistinct(length: number) {
    const distinct: string = "ABCDEFGHJKLMNPQRSTUVabcdefhjkmnorstuv23456789"
    let result = "";
    for ( let i = 0; i < length; i++ ) {
        result += distinct.charAt(Math.floor(Math.random() * distinct.length));
    }
    return result;
}

//TODO: Legacy I think? remove later
export async function resolveLink(key: string) {
    let final;
    const d = doc(firestore, 'links', key)
    let want = await getDoc(d)
    if (want.exists()) final = want.data().surl
    return final;
}

export async function resolveUserLinks(userid: string | undefined, snapshot?: QuerySnapshot<DocumentData>): Promise<LinkData[]> {
    if (!userid) return [] as LinkData[];
    if (snapshot) return resolveSnapshotUserLinks(snapshot);
   // const newSnapshot = await get(child(ref(database), `/users/${userid}/links`));
   // console.log({_msg: "new snapshot", ...newSnapshot});
    //TODO: make new  snapshot if no snapshot
    return [] as LinkData[];
}

async function resolveSnapshotUserLinks(snapshot: QuerySnapshot) {
    let data: LinkData[] = [];
    snapshot.forEach((docs) => {
        let o = docs.data().surl
        data.push({short: docs.id, long: o.toString()})
    });
    console.log(data);
    return data;
}

export async function removeData(userid: string | undefined, surl: string) {
    const userPath = doc(firestore, `/users/${userid}/userLinks`, surl)
    const linkPath = doc(firestore, 'links', surl)
    await deleteDoc(userPath);
    await deleteDoc(linkPath);
}
