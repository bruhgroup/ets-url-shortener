import ArrowIcon from "../assets/ArrowIcon";
import {useEffect, useState} from "react";
import Switch from "./Switch";
import {generateDistinct, update, write} from "../Database";
import {LinkData} from "../types";

export default function DataEntry({userid, editState, editEntry, setEditState}: { userid: string | undefined, editState: boolean, editEntry: LinkData, setEditState: any }) {
    const [editing, setEditing] = useState<boolean>(editState);
    const [link, setLink] = useState<string>("");
    const [customLink, setCustomLink] = useState<string>(generateDistinct(5));
    const [description, setDescription] = useState<string>("");
    const [requireAuth, setRequiredAuth] = useState<boolean>(false);
    const [noRedirectTimer, setNoRedirectTimer] = useState<boolean>(false);
    const [somethingElse, setSomethingElse] = useState<boolean>(false);

    useEffect(() => {
        setEditing(editState)
    }, [editState])

    return (
        <form
            className={"flex flex-col justify-center items-center px-[8px] py-[12px] gap-[12px] bg-c-gray-100 rounded"}
            onSubmit={(e) => {
                e.preventDefault();
                editing ? update(userid, link, editEntry.short, description, noRedirectTimer) : write(userid, link, customLink, description, noRedirectTimer);
                console.log({_msg:"link created", link, customLink, description})
                setLink("");
                setCustomLink(generateDistinct(5));
                setDescription("");
                setEditState(false)
            }}
            id={"urls"}>

            {editing ? <span className={"stripes w-full text-center h-full m-auto"}>Editing Mode</span> : <></>}

            <div className={"flex flex-row justify-center items-center gap-[20px] w-full"}>
                <input
                    className={"flex rounded w-[50%] p-2 min-w-[20px] border-2 border-c-gray-300"}
                    placeholder={"Your URL to shorten"}
                    onChange={(e) => setLink(e.target.value)}
                    value = {link}
                    type={"url"}
                />
                <ArrowIcon/>
                <div className={"flex flex-row items-center w-[50%] border-2 border-c-gray-300 rounded"}>
                    <div className={"bg-c-gray-200 p-2 border-r-2 border-c-gray-300"}>
                        <span className={"text-c-gray-500"}>hi.gov/</span>
                    </div>
                    <input
                        className={"w-full p-2 min-w-[50px]"}
                        placeholder={`${customLink} (or set your own)`}
                        pattern={"[a-zA-Z0-9]+$"}
                        disabled = {editing}
                        onChange={(e) => setCustomLink(e.target.value)}
                        value={editing ? editEntry.short : customLink}
                        type={"text"}
                    />
                </div>
            </div>
            <div className={"bg-gray-300 h-[3px] rounded w-full"}/>
            <div className={"flex flex-col items-center gap-[5px] w-full"}>
                <div className={"flex justify-center items-center gap-[10px] w-full"}>
                    <input
                        className={"flex-grow min-w-[20px] rounded p-2 border-2 border-c-gray-300"}
                        placeholder={"Add a description (recommended)"}
                        pattern={"[a-zA-Z0-9 ]+"}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        type={"text"}
                    />
                    <div className={"max-h-[45px] rounded px-[16px] py-[8px] bg-black font-medium"}>
                        <button className={"text-white"} type={"submit"}>{editing ? "Submit edit" :"Create Short URL"}</button>
                    </div>
                </div>

                <div className={"flex justify-evenly items-center gap-[10px] w-full"}>
                    <Switch label={"Require Authentication"} state={requireAuth}
                            onChange={() => setRequiredAuth(!requireAuth)}/>
                    <Switch label={"Disable Redirect Timer"} state={noRedirectTimer}
                            onChange={() => setNoRedirectTimer(!noRedirectTimer)}/>
                    <Switch label={"Something else"} state={somethingElse}
                            onChange={() => setSomethingElse(!somethingElse)}/>
                </div>
            </div>
        </form>)
}