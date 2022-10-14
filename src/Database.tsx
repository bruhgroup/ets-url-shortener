import {database} from "./App";
import {child, get, ref, update, remove, DataSnapshot} from "firebase/database";
import {LinkDataType} from "./types";

export function write(userid: string | undefined, url: string, surl: string) {
    if (!userid) return;
    //TODO: validate surl
    //for testing
    url = url === "" ? (Math.random() + 1).toString(36).substring(7) : url;
    surl = surl === "" ? (Math.random() + 1).toString(36).substring(7) : surl;
    const updates: { [index: string]: string | boolean } = {};
    updates[`/links/${surl}`] = url;
    updates[`/users/${userid}/links/${surl}`] = true;
    return update(ref(database), updates);
}

export async function resolveLink(key: string) {
    let data;
    const snapshot = await get(child(ref(database), `/links/${key}`));
    if (snapshot.exists()) data = snapshot.exportVal();
    return data;
}

export async function resolveUserLinks(userid: string | undefined, snapshot?: DataSnapshot): Promise<LinkDataType> {
    if (!userid) return {} as LinkDataType;
    if (snapshot) return resolveSnapshotUserLinks(snapshot);
    const newSnapshot = await get(child(ref(database), `/users/${userid}/links`));
    console.log({_msg: "new snapshot", ...newSnapshot});
    return resolveSnapshotUserLinks(newSnapshot);
}

async function resolveSnapshotUserLinks(snapshot: DataSnapshot) {
    let data: { [index: string]: string } = {};
    const keys = snapshot.exportVal() == null ? Object.keys(0) : Object.keys(snapshot.exportVal())
    await Promise.all(keys.map(async k => data[k] = await resolveLink(k)))
    return data;
}

export async function removeData(userid: string | undefined, surl: string) {
    await remove(ref(database, `/users/${userid}/links/${surl}`));
    await remove(ref(database, `/links/${surl}`));
}
