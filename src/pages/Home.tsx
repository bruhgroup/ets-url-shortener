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
        <div className={"max-w-screen-2xl mx-auto my-4"}>
            <div className={"flex flex-col justify-center items-center"}>
                <Authentication className={"flex flex-col space-x-2"}/>
                <form
                        id={"urls"}
                        onSubmit={(e)  => {e.preventDefault(); write(uid,link,customLink)}}>
                    <div className={"flex flex-row space-x-4"}>
                        <input
                            className={"border border-solid border-black rounded bg-gray-100"}
                            type="url"
                            placeholder={"Paste a link here"}
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>

                    <div className={"flex flex-row py-1"}>
                        <p>hi.gov/</p>

                            <input
                                className={"border border-solid border-gray-500 rounded bg-gray-100"}
                                type="text"
                                pattern= "[a-zA-Z0-9]+$"
                                placeholder= {" leave blank for random"}
                                value={customLink}
                                onChange={(e) => {setCustomLink(e.target.value); console.log(e.target.value)}}
                            />
                            <button className={"rounded-full bg-amber-200 px-1"}
                                    type={"submit"}
                                    >Shorten
                            </button>
                    </div>
                </form>
                <LinksTable links={resolvedLinks} userid={uid}/>
            </div>
        </div>
    );
}

export default Home;
