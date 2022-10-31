import React, {useEffect, useState} from "react";
import {resolveLink} from "../firebase/Firestore";
import Landing from "../components/Landing";
import LoadingIcon from "../assets/LoadingIcon";
import Analytics from "../firebase/Analytics";

function Redirect() {
    // TODO: Handle authenticated URLs
    // const [user, loading, error] = useAuthState(auth);
    // const [uid, setUid] = useState(user?.uid);
    const [loading, setLoading] = useState<boolean>(true);
    const [path, setPath] = useState<string>();
    const [cancel, setCancelled] = useState<boolean>(false);
    const [redirectTimer, setRedirectTimer] = useState<boolean>(true);
    const [timing, setTiming] = useState<number>(5);

    useEffect(() => {
        // Only render once and never again.
        resolveLink(window.location.pathname)
            .then(({link, timer}) => {
                setPath(link);
                setRedirectTimer(timer);
                setLoading(false);
            });
    }, [])

    // Handle redirect timer & cancels
    useEffect(() => {
            if (path && !cancel) {
                if (!redirectTimer) {
                    window.location.href = path;
                    Analytics().redirect(window.location.pathname);
                }
                const interval = setInterval(() => {
                    if (timing > 0) return setTiming(timing - 1);
                    window.location.href = path;
                    Analytics().redirect(window.location.pathname);
                }, 1000);
                return () => clearInterval(interval);
            }
        },
        [path, cancel, timing, redirectTimer])

    // Handle cancel analytics
    useEffect(() => {
            if (cancel) Analytics().redirect_cancelled(window.location.pathname);
        },
        [cancel])

    if (loading || !redirectTimer) {
        return (
            <Landing w={false}>
                <LoadingIcon width={"5rem"} height={"5rem"}/>
            </Landing>
        )
    }

    if (!path) {
        return (
            <Landing>
                <div className={"flex flex-wrap justify-center text-center gap-[24px]"}>
                    <span className={"font-medium text-2xl"}>Something's wrong here.</span>
                    <span className={"text-xl"}>You've clicked on a bad link or entered an invalid URL.</span>
                    <span className={"text-xl"}>Remember, they're case-sensitive!</span>
                </div>
            </Landing>
        )
    }

    return (
        <Landing>
            {cancel ?
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
                )
            }
        </Landing>
    );
}

export default Redirect;
