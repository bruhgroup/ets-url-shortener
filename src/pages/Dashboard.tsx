import {useAuthState} from "react-firebase-hooks/auth";
import {analytics, auth, firestore} from "../App";
import React, {useCallback, useEffect, useState} from "react";
import useLocalStorageState from "use-local-storage-state";
import {LinkData} from "../types";
import {resolveSnapshotLinks} from "../firebase/Firestore";
import NavBar from "../components/NavBar";
import DataEntry from "../components/DataEntry";
import Table from "../components/Table";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {setUserId} from "firebase/analytics";

function Dashboard() {
    const [user, loading] = useAuthState(auth);
    const [editing, setEditing] = useState(false);
    const [entry, setEntry] = useState<LinkData>(Object);
    const [resolvedLinks, setResolvedLinks] = useLocalStorageState<LinkData[]>("resolve-links", {defaultValue: []});
    const memoResolve = useCallback((linksArr: LinkData[]) => setResolvedLinks(linksArr), [setResolvedLinks])

    // Update UID once user logs in.
    useEffect(() => {
        if (loading) return;
        setUserId(analytics, user?.uid ?? null)
    }, [loading, user?.uid]);

    // Attach Firestore listener
    useEffect(() => {
        const q = query(collection(firestore, `/users/${user?.uid}/userLinks`), orderBy("url", "asc"))
        const unsub = onSnapshot(q, async (querySnapshot) => {
            memoResolve(await resolveSnapshotLinks(user?.uid, querySnapshot));
        });
        return () => unsub();
    }, [memoResolve, user?.uid])

    // This should never happen, but just in case.
    if (user?.uid === undefined) {
        return <>Not authenticated.</>
    }

    return (
        <div className={"bg-c-gray-100 h-screen"}>
            <NavBar/>
            <div className={"max-w-screen-md mx-auto p-4 flex flex-col gap-2 bg-white rounded-b-lg "}>
                <DataEntry userid={user?.uid} editState={editing} editEntry={entry} setEditState={setEditing}/>
                <div className={"flex flex-col items-center justify-center"}>
                    <div className={"flex flex-row w-full"}>
                    </div>
                </div>
                <Table links={resolvedLinks} userid={user?.uid} setEditing={setEditing}
                       entry={(entries: LinkData) => setEntry(entries)}/>
            </div>
        </div>
    )
}

export default Dashboard;