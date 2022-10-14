import {onValue, ref} from "firebase/database";
import {resolveUserLinks, write} from "../Database";
import {useAuthState} from "react-firebase-hooks/auth";
import LinksTable from "../components/LinksTable";
import {useEffect, useState} from "react";
import Authentication from "../components/Authentication";
import useLocalStorageState from "use-local-storage-state";
import {LinkDataType} from "../types";
import {auth, database} from "../App";

function Home() {
    const [user, loading, error] = useAuthState(auth);
    const [uid, setUid] = useState(user?.uid);
    const [resolvedLinks, setResolvedLinks] = useLocalStorageState<LinkDataType>("resolve-links", {defaultValue: {}})

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
        <div className={"max-w-screen-2xl mx-auto my-4"}>
            <div className={"flex flex-col justify-center items-center"}>
                <Authentication className={"flex flex-col"}/>

                <div className={"flex flex-row space-x-4"}>
                    <button className={"rounded-full bg-amber-200"} type={"submit"}
                            onClick={() => write(uid, (Math.random() + 1).toString(36).substring(7), (Math.random() + 1).toString(36).substring(7))}>write
                    </button>
                </div>

                <LinksTable className={"flex flex-row"} links={resolvedLinks} userid={uid}/>

            </div>
        </div>
    );
}

export default Home;
