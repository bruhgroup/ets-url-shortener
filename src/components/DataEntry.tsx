import ArrowIcon from "../assets/ArrowIcon";
import {useState} from "react";

export default function DataEntry() {
    const [link, setLink] = useState<string>();
    const [customLink, setCustomLink] = useState<string>((Math.random() + 1).toString(36).substring(7));

    return (
        <div
            className={"flex flex-col justify-center items-center px-[8px] py-[12px] gap-[12px] bg-gray-300 rounded"}>
            <div className={"flex flex-row justify-center items-center gap-[20px]"}>
                <input
                    className={"border-black rounded"}
                    placeholder={link ?? "Your URL to shorten"}
                />
                <ArrowIcon/>
                <div className={"flex flex-row items-center"}>
                    <div className={"box-border bg-gray-400 border-2 border-gray-600 rounded"}>https://hi.gov/</div>
                    <input
                        className={"border-black rounded"}
                        placeholder={`${customLink} (or set your own)`}
                    />
                </div>
            </div>
            <div className={"border-2 bg-gray-300 w-full"}/>
            <div className={"flex flex-col items-center gap-[5px]"}>test</div>
        </div>)
}