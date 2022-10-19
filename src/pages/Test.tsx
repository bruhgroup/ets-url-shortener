import LinksTable from "../components/LinksTable";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, database} from "../App";
import {useEffect, useState} from "react";
import useLocalStorageState from "use-local-storage-state";
import {LinkDataType} from "../types";
import {onValue, ref} from "firebase/database";
import {resolveUserLinks, write} from "../Database";
import NavBar from "../components/NavBar";
import DataEntry from "../components/DataEntry";

function Test() {
    const [user, loading, error] = useAuthState(auth);
    const [uid, setUid] = useState(user?.uid);
    const [resolvedLinks, setResolvedLinks] = useLocalStorageState<LinkDataType>("resolve-links", {defaultValue: {}})
    const [link, setLink] = useState('');
    const [customLink, setCustomLink] = useState('');

    // Update UID once user logs in.
    useEffect(() => {
        if (loading) return;

        setUid(user?.uid);
        // Always calls once on page load and updates the snapshot, so local storage isn't really doing anything..?
        return onValue(ref(database, `/users/${uid}/links`), async (snapshot) => {
            console.log({_msg: "snapshot updated", ...snapshot.exportVal()});
            setResolvedLinks(await resolveUserLinks(uid, snapshot));
        })
    }, [user, loading, uid, setResolvedLinks]);

    return (
        <div className={"bg-c-gray-100 h-full min-h-screen"}>
            <NavBar/>
            <div className={"max-w-screen-md mx-auto my-4 p-4 flex flex-col gap-2 bg-white rounded-xl"}>
                <DataEntry/>
                <div className={"flex flex-col items-center justify-center"}>
                    <div className={"flex flex-row"}><p>Test!</p></div>
                    <div className={"flex flex-row w-full"}>
                        <LinksTable links={resolvedLinks} userid={uid}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test;