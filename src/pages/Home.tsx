import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import Authentication from "../components/Authentication";
import {auth} from "../App";

function Home() {
    const [user, loading, error] = useAuthState(auth);
    const [uid, setUid] = useState(user?.uid);

    // Update UID once user logs in.
    useEffect(() => {
        if (loading) return;

        setUid(user?.uid);
        // Always calls once on page load and updates the snapshot, so local storage isn't really doing anything..?
    }, [user, loading, uid]);

    return (
        <div className={"max-w-screen-2xl mx-auto my-auto"}>
            <div className={"flex flex-col justify-center items-center"}>
                <Authentication className={"flex flex-col space-x-2"}/>
            </div>
        </div>
    );
}

export default Home;
