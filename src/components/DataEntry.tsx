import ArrowIcon from "../assets/ArrowIcon";
import {useState} from "react";
import Switch from "./Switch";

export default function DataEntry() {
    const [link, setLink] = useState<string>();
    const [customLink, setCustomLink] = useState<string>((Math.random() + 1).toString(36).substring(7));
    const [description, setDescription] = useState<string>();
    const [requireAuth, setRequiredAuth] = useState<boolean>(false);
    const [somethingElse, setSomethingElse] = useState<boolean>(false);

    return (
        <div
            className={"flex flex-col justify-center items-center px-[8px] py-[12px] gap-[12px] bg-c-gray-100 rounded"}>
            <div className={"flex flex-row justify-center items-center gap-[20px] w-full"}>
                <input
                    className={"flex rounded w-[50%] p-2 min-w-[20px] border-2 border-c-gray-300"}
                    placeholder={link ?? "Your URL to shorten"}
                />
                <ArrowIcon/>
                <div className={"flex flex-row items-center w-[50%] border-2 border-c-gray-300 rounded"}>
                    <div className={"bg-c-gray-200 p-2 border-r-2 border-c-gray-300"}>
                        <span className={"text-c-gray-500"}>hi.gov/</span>
                    </div>
                    <input
                        className={"w-full p-2 min-w-[50px]"}
                        placeholder={`${customLink} (or set your own)`}
                    />
                </div>
            </div>
            <div className={"bg-gray-300 h-[3px] rounded w-full"}/>
            <div className={"flex flex-col items-center gap-[5px] w-full"}>
                <div className={"flex justify-center items-center gap-[10px] w-full"}>
                    <input
                        className={"flex-grow-[1] min-w-[20px] rounded p-2 border-2 border-c-gray-300"}
                        placeholder={description ?? "Add a description (recommended)"}
                    />
                    <div className={"max-h-[45px] rounded px-[16px] py-[8px] bg-black font-medium"}>
                        <button className={"text-white"}>Create Short URL</button>
                    </div>
                </div>
                <div className={"flex justify-evenly items-center gap-[10px] w-full"}>
                    <Switch label={"Require Authentication"} state={requireAuth}
                            onChange={() => setRequiredAuth(!requireAuth)}/>
                    <Switch label={"Something else"} state={somethingElse}
                            onChange={() => setSomethingElse(!somethingElse)}/>
                    <Switch label={"Something else"} state={somethingElse}
                            onChange={() => setSomethingElse(!somethingElse)}/>
                </div>
            </div>
        </div>)
}