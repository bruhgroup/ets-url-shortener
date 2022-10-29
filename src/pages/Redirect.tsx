import React, {useEffect, useState} from "react";
import {resolveLink} from "../Database";
import Landing from "../components/Landing";

function Redirect() {
    // TODO: Handle authenticated URLs
    // const [user, loading, error] = useAuthState(auth);
    // const [uid, setUid] = useState(user?.uid);
    const [path, setPath] = useState<string>();
    const [cancel, setCancelled] = useState<boolean>(false);
    const [noTimer, setNoTimer] = useState<boolean>(false);
    const [timing, setTiming] = useState<number>(5)

    useEffect(() => {
            resolveLink(window.location.pathname)
                .then(({link, cancel}) => {
                    setPath(link);
                    setNoTimer(cancel);
                });
            if (path !== undefined && !cancel) {
                if (noTimer) window.location.href = path;

                const interval = setInterval(() => {
                    setTiming(timing - 1)
                    if (timing === 0) window.location.href = path;
                }, 1000);
                return () => clearInterval(interval);
            }
        },
        [path, cancel, timing, noTimer])

    return (
        cancel ?
            (
                <Landing>
                    <div className={"flex flex-col justify-center"}>
                        <p className={"flex flex-col gap-4 m-auto my-2 max-w-full"}>
                            Redirect Cancelled. {path}
                        </p>
                        <button
                            className={"py-2 px-3 m-auto text-center bg-blue-500 text-white rounded hover:bg-blue-600"}
                            onClick={() => window.location.reload()}>
                            Reload to try again
                        </button>
                    </div>
                </Landing>
            ) : (
                <Landing>
                    <div className={"flex justify-center"}>
                        <p className={"flex flex-col gap-4 m-auto max-w-full w-[22em]"}
                        >Redirecting to {path} in {timing} seconds...</p>
                        <button
                            className={"px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"}
                            onClick={() => setCancelled(true)}>Click here to cancel
                        </button>
                    </div>
                </Landing>
            )
    );
}

export default Redirect;
