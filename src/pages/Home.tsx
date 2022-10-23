import {onValue, ref} from "firebase/database";
import {resolveUserLinks, write} from "../Database";
import {useAuthState} from "react-firebase-hooks/auth";
import LinksTable from "../components/LinksTable";
import {useEffect, useState} from "react";
import Authentication from "../components/Authentication";
import useLocalStorageState from "use-local-storage-state";
import {LinkData} from "../types";
import {auth, firestore} from "../App";
import { collection, addDoc,onSnapshot, doc, query,orderBy} from "firebase/firestore";
import firebase from "firebase/compat";
import Table from "../components/Table";

function Home() {
    const [user, loading, error] = useAuthState(auth);
    const [uid, setUid] = useState(user?.uid);
    const [resolvedLinks, setResolvedLinks] = useLocalStorageState<LinkData[]>("resolve-links", {defaultValue: []})
    const [link, setLink] = useState('');
    const [customLink, setCustomLink] = useState('');

    // Update UID once user logs in.
    useEffect(() => {
        if (loading) return;

        setUid(user?.uid);
        // Always calls once on page load and updates the snapshot, so local storage isn't really doing anything..?
        const q = query(collection(firestore,`/users/${uid}/userLinks`), orderBy("surl", "asc"))
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            setResolvedLinks(await resolveUserLinks(uid, querySnapshot));
        });
    }, [user, loading, uid, setResolvedLinks]);

    return (
        <div className={"max-w-screen-2xl mx-auto my-4"}>
            <div className={"flex flex-col justify-center items-center"}>
                <Authentication className={"flex flex-col space-x-2"}/>
            </div>
        </div>
    );
}

export default Home;
