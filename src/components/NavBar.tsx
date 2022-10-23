import LinkIcon from "../assets/LinkIcon";
import {auth} from "../App";
import {Logout} from "./Authentication";
import {signOut} from "firebase/auth";
import {Navigate, useNavigate} from "react-router-dom";
import {useState} from "react";

export default function NavBar() {
    const navigate = useNavigate();

    return (
        <div className={"bg-cyan-500 w-full h-auto"}>
            <div className={"flex flex-row justify-between items-center px-[24px] py-[15px] "}>
                <div className={"flex flex-row gap-[8px]"}>
                    <LinkIcon/>
                    <span className={"items-center text-white text-2xl font-bold"}>URL Shortener</span>
                </div>
                <div
                    className={"flex flex-row items-center box-border border-white border-2 rounded px-[16px] py-[8px]"}>
                    <button className={"items-center text-white text-xl"} type= "button"
                            onClick={() => {signOut(auth).then(() => navigate('/')) }}>Logout
                    </button>
                </div>
            </div>
        </div>
    )
}
