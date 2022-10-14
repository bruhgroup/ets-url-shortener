import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import {auth} from "../App";
import {resolveLink} from "../Database";

function Redirect() {
    // TODO: Handle authenticated URLs
    // const [user, loading, error] = useAuthState(auth);
    // const [uid, setUid] = useState(user?.uid);
    const [path, setPath] = useState();

    useEffect(() => {
        resolveLink(window.location.pathname).then(setPath);
        console.log({path});
    }, [path])

    return (
        <div className={"flex flex-col justify-center items-center m-8"}>
            <p>Redirecting to {path}</p>
        </div>
    );
}

export default Redirect;
