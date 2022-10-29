import React, {ReactNode} from "react";
import SiteLogo from "../assets/SiteLogo";

export default function Landing({children}: { children: ReactNode }) {
    return (
        <div className={"bg-c-gray-100 h-screen"}>
            <div className={"max-w-screen-md h-full m-auto py-[32px] px-[8px] flex flex-col gap-2"}>
                <div className={"flex justify-center items-center"}>
                    <SiteLogo color={"black"}/>
                </div>
                <div className={"flex flex-grow justify-center items-center"}>
                    <div
                        className={"flex flex-col gap-4 bg-white p-8 justify-center rounded max-w-full w-[36em] shadow-2xl"}>
                        {children}
                    </div>
                </div>
                <div className={"flex justify-center items-center"}>
                    <SiteLogo color={"black"}/>
                </div>
            </div>
        </div>
    )
}