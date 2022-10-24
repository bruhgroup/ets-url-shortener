import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import {auth} from "../App";
import {resolveLink} from "../Database";

function Redirect() {
    // TODO: Handle authenticated URLs
    // const [user, loading, error] = useAuthState(auth);
    // const [uid, setUid] = useState(user?.uid);
    const [path, setPath] = useState<string>();
    const [cancel, setCancelled] = useState<boolean>(false);
    const [noTimer, setNoTimer] = useState<boolean>(false);

    useEffect(() => {
            resolveLink(window.location.pathname).then(setPath,setNoTimer);
            if (path !== undefined && !cancel) {
                const timeout = setTimeout(() => {
                    window.location.href = path;
                }, noTimer ? 5000:0);
                return () => clearTimeout(timeout)
            }
        },
        [path, cancel])

    return (
        <div className={"flex flex-col justify-center items-center m-8"}>
            {
                cancel ?
                    <>
                        <p>Redirect cancelled. {path}</p>
                    </> :
                    <>
                        <p>Redirecting to {path} in 5 seconds...</p>
                        <button onClick={() => {
                            setCancelled(true)
                        }}>Click here to cancel
                        </button>
                    </>
            }
        </div>
    );
}

export default Redirect;
