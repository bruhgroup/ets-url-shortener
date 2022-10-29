import {useAuthState} from "react-firebase-hooks/auth";
import React, {useEffect, useState} from "react";
import {auth} from "../App";
import {resolveLink} from "../Database";
import SiteLogo from "../assets/SiteLogo";
import Authentication from "../components/Authentication";

function Redirect() {
    // TODO: Handle authenticated URLs
    // const [user, loading, error] = useAuthState(auth);
    // const [uid, setUid] = useState(user?.uid);
    const [path, setPath] = useState<string>();
    const [cancel, setCancelled] = useState<boolean>(false);
    const [noTimer, setNoTimer] = useState<boolean>(false);
    const [timing, setTiming] = useState<number>(5)

    useEffect(() => {
            resolveLink(window.location.pathname).then(({link, cancel}) => {
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
        [path, cancel,timing,noTimer])

    return (
        <div className={"flex flex-col justify-center items-center "}>
            {
                cancel ?

                        <div className={"bg-c-gray-100 h-screen w-screen"}>
                            <div className={"w-full h-full m-auto py-[32px] px-[8px] flex flex-col gap-2"}>
                                <div className={"flex justify-center items-center"}>
                                    <SiteLogo color={"black"}/>
                                </div>
                                <div className={"flex flex-grow justify-center items-center"}>
                                    <div className={"flex flex-col gap-4 bg-white p-8 justify-center rounded max-w-full w-[36em] shadow-2xl"}>
                                        <div className={"flex flex-col justify-center"}>
                                            <p className={"flex flex-col gap-4 m-auto my-2 max-w-full"}
                                            >Redirect Cancelled. {path}</p>
                                            <button className={"py-2 px-3 m-auto text-center bg-blue-500 text-white rounded hover:bg-blue-600"}
                                                    onClick={() => window.location.reload()}
                                            >Reload to try again</button>
                                        </div>
                                    </div>
                                </div>
                                <div className={"flex justify-center items-center"}>
                                    <SiteLogo color={"black"}/>
                                </div>
                            </div>
                        </div>
                    :
                    <div className={"bg-c-gray-100 h-screen w-screen"}>
                        <div className={"w-full h-full m-auto py-[32px] px-[8px] flex flex-col gap-2"}>
                            <div className={"flex justify-center items-center"}>
                                <SiteLogo color={"black"}/>
                            </div>
                            <div className={"flex flex-grow justify-center items-center"}>
                                <div className={"flex flex-col gap-4 bg-white p-8 justify-center rounded max-w-full w-[36em] shadow-2xl"}>
                                    <div className={"flex justify-center"}>
                                        <p className={"flex flex-col gap-4 m-auto max-w-full w-[22em]"}
                                        >Redirecting to {path} in {timing} seconds...</p>
                                        <button
                                            className={"px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"}
                                            onClick={() => {
                                            setCancelled(true)
                                        }}>Click here to cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex justify-center items-center"}>
                                <SiteLogo color={"black"}/>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Redirect;
