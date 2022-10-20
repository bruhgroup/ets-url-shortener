import {database} from "./App";
import {child, get, ref, update, remove, DataSnapshot} from "firebase/database";
import {LinkData} from "./types";

export function write(userid: string | undefined, url: string, surl: string) {
    if (!userid) return;
    let result = generateDistinct();
    //Legacy: remove later
    let urlResult = generateDistinct();
    url = url === "" ? urlResult : url;
    surl = surl === "" ? result : surl;
    let r = ref(database);
    get(child(r, `/links/${surl}`)).then((snapshot) => {
        if (snapshot.exists()) {
            if (surl === result) {
                generateDistinct();
                write(userid, url, "");
                return;
            }
            alert("Surl already exists!!");
            return;
        }
    }).catch((error) => {
        console.error(error);
    });
    const updates: { [index: string]: string | boolean } = {};
    updates[`/links/${surl}`] = url;
    updates[`/users/${userid}/links/${surl}`] = true;
    return update(ref(database), updates);
}

/**
 * #Creates a random string with distinct lettering
 */
export function generateDistinct() {
    const distinct: string = "ABCDEFGHJKLMNPQRSTUVabcdefhjkmnorstuv23456789"
    let result = "";
    for (let i = 0; i < 6; i++) {
        result += distinct.charAt(Math.floor(Math.random() * distinct.length));
    }
    return result;
}

export async function resolveLink(key: string) {
    let data;
    const snapshot = await get(child(ref(database), `/links/${key}`));
    if (snapshot.exists()) data = snapshot.exportVal();
    return data;
}

export async function resolveUserLinks(userid: string | undefined, snapshot?: DataSnapshot): Promise<LinkData[]> {
    if (!userid) return [] as LinkData[];
    if (snapshot) return resolveSnapshotUserLinks(snapshot);
    const newSnapshot = await get(child(ref(database), `/users/${userid}/links`));
    console.log({_msg: "new snapshot", ...newSnapshot});
    return resolveSnapshotUserLinks(newSnapshot);
}

async function resolveSnapshotUserLinks(snapshot: DataSnapshot) {
    let data: LinkData[] = [];
    const keys = snapshot.exportVal() == null ? Object.keys(0) : Object.keys(snapshot.exportVal())
    await Promise.all(keys.map(async k => data.push({short: await resolveLink(k), long: k})))
    return data;
}

export async function removeData(userid: string | undefined, surl: string) {
    await remove(ref(database, `/users/${userid}/links/${surl}`));
    await remove(ref(database, `/links/${surl}`));
}
