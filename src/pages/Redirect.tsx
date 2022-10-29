import React, {useEffect, useState} from "react";
import {resolveLink} from "../Database";
import Landing from "../components/Landing";
import LoadingIcon from "../assets/LoadingIcon";

function Redirect() {
    // TODO: Handle authenticated URLs
    // const [user, loading, error] = useAuthState(auth);
    // const [uid, setUid] = useState(user?.uid);
    const [loading, setLoading] = useState<boolean>(true);
    const [path, setPath] = useState<string>();
    const [cancel, setCancelled] = useState<boolean>(false);
    const [noTimer, setNoTimer] = useState<boolean>(false);
    const [timing, setTiming] = useState<number>(5)

    useEffect(() => {
            resolveLink(window.location.pathname)
                .then(({link, cancel}) => {
                    setPath(link);
                    setNoTimer(cancel);
                    setLoading(false);
                });
            if (path && !cancel) {
                if (noTimer) window.location.href = path;
                const interval = setInterval(() => {
                    if (timing > 0) return setTiming(timing - 1);
                    window.location.href = path;
                }, 1000);
                return () => clearInterval(interval);
            }
        },
        [path, cancel, timing, noTimer])

    if (loading) {
        return (
            <Landing w={false}>
                <LoadingIcon width={"5rem"} height={"5rem"}/>
            </Landing>
        )
    }

    return (
        <Landing>
            {!path ?
                (
                    <div className={"flex flex-wrap justify-center text-center gap-[24px]"}>
                        <span className={"font-medium text-2xl"}>Something's wrong here.</span>
                        <span className={"text-xl"}>You've clicked on a bad link or entered an invalid URL.</span>
                        <span className={"text-xl"}>Remember, they're case-sensitive!</span>
                    </div>
                ) : cancel ?
                    (
                        <>
                            <div className={"flex justify-center text-center"}>
                                <span className={"font-medium text-2xl mb-[24px]"}>Redirect Cancelled</span>
                            </div>
                            <div
                                className={"flex flex-col justify-center text-center gap-4 m-auto max-w-full w-[22em]"}>
                                <button
                                    className={"max-h-[45px] rounded px-[16px] py-[8px] bg-blue-500 font-medium w-full text-center text-white"}
                                    onClick={() => {
                                        setCancelled(false);
                                        setTiming(5);
                                    }}>
                                    Resume
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={"flex justify-center text-center"}>
                            <span
                                className={"font-medium text-2xl mb-[24px]"}>You will be redirected in {timing}...</span>
                            </div>
                            <div
                                className={"flex flex-col justify-center text-center gap-4 m-auto max-w-full w-[22em]"}>
                                <span className={"text-xl mb-[24px]"}>Navigating to {path}</span>
                                <button
                                    className={"max-h-[45px] rounded px-[16px] py-[8px] bg-blue-500 font-medium w-full text-center text-white"}
                                    onClick={() => setCancelled(true)}>
                                    Click here to cancel
                                </button>
                            </div>
                        </>
                    )}
        </Landing>
    );
}

export default Redirect;
