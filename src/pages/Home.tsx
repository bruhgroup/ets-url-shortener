import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import {auth} from "../App";
import SiteLogo from "../assets/SiteLogo";
import Authentication from "../components/Authentication";

function Home() {
    const [user, loading, error] = useAuthState(auth);
    const [uid, setUid] = useState<string>();

    // Update UID once user logs in.
    useEffect(() => {
        if (!loading && user) setUid(user.uid);
    }, [user, loading, uid]);

    return (
        <div className={"bg-c-gray-100 h-screen"}>
            <div className={"max-w-screen-md h-full m-auto py-[32px] px-[8px] flex flex-col gap-2"}>
                <div className={"flex justify-center items-center"}>
                    <SiteLogo color={"black"}/>
                </div>
                <div className={"flex flex-grow justify-center items-center"}>
                    <Authentication/>
                </div>
                <div className={"flex justify-center items-center"}>
                    <SiteLogo color={"black"}/>
                </div>
            </div>
        </div>
    );
}

export default Home;
