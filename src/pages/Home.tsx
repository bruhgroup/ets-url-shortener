import {useAuthState} from "react-firebase-hooks/auth";
import React from "react";
import {auth} from "../App";
import SiteLogo from "../assets/SiteLogo";
import Authentication from "../components/Authentication";
import Dashboard from "./Dashboard";

function Home() {
    const [user, loading, error] = useAuthState(auth);

    if (!loading) {
        if (user) return <Dashboard/>
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

    return <></>
}

export default Home;
