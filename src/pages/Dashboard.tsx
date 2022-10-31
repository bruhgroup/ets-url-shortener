import {useAuthState} from "react-firebase-hooks/auth";
import {auth, firestore} from "../App";
import React, {useCallback, useEffect, useState} from "react";
import useLocalStorageState from "use-local-storage-state";
import {LinkData} from "../types";
import {resolveUserLinks} from "../Database";
import NavBar from "../components/NavBar";
import DataEntry from "../components/DataEntry";
import Table from "../components/Table";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";

function Dashboard() {
    const [user, loading] = useAuthState(auth);
    const [uid, setUid] = useState(user?.uid);
    const [editing, setEditing] = useState(false);
    const [entry, setEntry] = useState<LinkData>(Object);
    const [resolvedLinks, setResolvedLinks] = useLocalStorageState<LinkData[]>("resolve-links", {defaultValue: []});
    const memoResolve = useCallback((linksArr: LinkData[]) => setResolvedLinks(linksArr), [setResolvedLinks])

    // Update UID once user logs in.
    useEffect(() => {
        if (loading) return;
        setUid(user?.uid);
    }, [loading, user?.uid]);

    //attaches listener
    useEffect(() => {
        const q = query(collection(firestore, `/users/${uid}/userLinks`), orderBy("url", "asc"))
        const unsub = onSnapshot(q, async (querySnapshot) => {
            memoResolve(await resolveUserLinks(uid, querySnapshot));
        });
        return () => unsub();
    }, [memoResolve, uid])

    const editEntry = (entries: LinkData) => setEntry(entries);

    return (
        <div className={"bg-c-gray-100 h-screen"}>
            <NavBar/>
            <div className={"max-w-screen-md mx-auto p-4 flex flex-col gap-2 bg-white rounded-b-lg "}>
                <DataEntry userid={uid} editState={editing} editEntry={entry} setEditState={setEditing}/>
                {editing ? (
                    <button
                        className={"bg-red-500 rounded-lg m-auto p-1"}
                        onClick={() => setEditing(false)}>Cancel Edit</button>
                ) : <></>}
                <div className={"flex flex-col items-center justify-center"}>
                    <div className={"flex flex-row w-full"}>
                    </div>
                </div>
                <Table links={resolvedLinks} userid={uid} setEditing={setEditing} entry={editEntry}/>
            </div>
        </div>
    )
}

export default Dashboard;