import {useAuthState} from "react-firebase-hooks/auth";
import {auth, firestore} from "../App";
import {useEffect, useState} from "react";
import useLocalStorageState from "use-local-storage-state";
import {LinkData} from "../types";
import {resolveUserLinks} from "../Database";
import NavBar from "../components/NavBar";
import DataEntry from "../components/DataEntry";
import Table from "../components/Table";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";

function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [uid, setUid] = useState(user?.uid);
    const [resolvedLinks, setResolvedLinks] = useLocalStorageState<LinkData[]>("resolve-links", {defaultValue: []})

    // Update UID once user logs in.
    useEffect(() => {
        if (loading) return;

        setUid(user?.uid);
        // Always calls once on page load and updates the snapshot, so local storage isn't really doing anything..?
        const q = query(collection(firestore,`/users/${uid}/userLinks`), orderBy("surl", "asc"))
        return onSnapshot(q, async (querySnapshot) => {
            setResolvedLinks(await resolveUserLinks(uid, querySnapshot));
            console.log("resolve links " + resolvedLinks)
        });
    }, [user, loading, uid, setResolvedLinks, resolvedLinks]);

    return (
        <div className={"bg-c-gray-100 h-screen"}>
            <NavBar/>
            <div className={"max-w-screen-md mx-auto p-4 flex flex-col gap-2 bg-white rounded-b-lg"}>
                <DataEntry userid={uid}/>
                <div className={"flex flex-col items-center justify-center"}>
                    <div className={"flex flex-row"}><p>Test!</p></div>
                    <div className={"flex flex-row w-full"}></div>
                </div>
                 <Table links={resolvedLinks} userid={uid}/>
            </div>
        </div>
    )
}

export default Dashboard;