import {auth, database} from "./App";
import {child, get, ref, update, onValue} from "firebase/database";

export function write(userid: string | undefined, url: string, surl: string) {
    if (!userid) return;
    const updates: { [index: string]: string | boolean } = {};
    updates[`/links/${surl}`] = url;
    updates[`/users/${userid}/links/${surl}`] = true;
    return update(ref(database), updates);
}

export async function read(key: string) {
    let data = "";
    await get(child(ref(database), `/links/${key}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                data = snapshot.exportVal();
            }
        }).catch(console.error)
    return data;
}

export async function resolveUserLinks(userid: string | undefined): Promise<{ [index: string]: string }> {
    let data: { [index: string]: string } = {};
    if (!userid) return data;
    const linkRef = ref(database, `/users/${userid}/links`);
    onValue(linkRef, async (snapshot) => {
        const keys = Object.keys(snapshot.exportVal())
        await Promise.all(keys.map(async k => {
            data[k] = await read(k);
        }))
    });
    return data;
}