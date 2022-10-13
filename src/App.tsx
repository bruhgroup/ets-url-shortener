import React, {useEffect, useState} from 'react';
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getDatabase, onValue, ref} from "firebase/database";
import {getAuth} from "firebase/auth";
import {read, resolveUserLinks, write} from "./Database";
import Authentication from "./components/Authentication";
import useLocalStorageState from "use-local-storage-state";
import {useAuthState} from "react-firebase-hooks/auth";
import LinksTable from "./components/LinksTable";
import {LinkDataType} from "./types";


const firebaseConfig = {
    apiKey: "AIzaSyBmSG0ulPPy-A2SgAELbwF-f467doKJiw4",
    authDomain: "ets-url-shortener.firebaseapp.com",
    projectId: "ets-url-shortener",
    storageBucket: "ets-url-shortener.appspot.com",
    databaseURL: "https://ets-url-shortener-default-rtdb.firebaseio.com/",
    messagingSenderId: "44963408642",
    appId: "1:44963408642:web:83caa24a0d7c31052b301b",
    measurementId: "G-LKSEDM1380"
};
export const firebase = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebase);
export const database = getDatabase(firebase);
export const auth = getAuth(firebase);

function App() {
    const [user, loading, error] = useAuthState(auth);
    const [uid, setUid] = useState(user?.uid);
    const [resolvedLinks, setResolvedLinks] = useLocalStorageState<LinkDataType>("resolve-links", {defaultValue: {}})

    // Update UID once user logs in.
    useEffect(() => {
        if (!loading) {
            setUid(user?.uid);
            console.log(resolvedLinks)
        }
    }, [user, loading, resolvedLinks]);

    const resolve = async () => {
        console.log({uid})
        setResolvedLinks(await resolveUserLinks(uid));
    }

    const update = onValue(ref(database, `/users/${uid}/links`), async snapshot => {
        setResolvedLinks(await resolveUserLinks(uid));
    })

    return (
        <div className={"flex flex-col justify-center items-center m-8"}>
            <Authentication className={"flex flex-row"}/>

            <div className={"flex flex-row space-x-4"}>
                <button className={"rounded-full bg-amber-200"} type={"submit"}
                        onClick={() => write(uid, (Math.random() + 1).toString(36).substring(7), (Math.random() + 1).toString(36).substring(7))}>write
                </button>
                <button className={"rounded-full bg-amber-200"} type={"submit"} onClick={() => read("ummmy")}>read
                </button>
                <button className={"rounded-full bg-amber-200"} type={"submit"} onClick={() => resolve()}>read links</button>
            </div>

            <LinksTable className={"flex flex-row"} links={resolvedLinks}  userid={uid}/>

        </div>
    );
}

export default App;
