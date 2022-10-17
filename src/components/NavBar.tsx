import LinkIcon from "../assets/LinkIcon";

export default function NavBar() {
    return (
        <div className={"bg-cyan-500 w-full h-auto"}>
            <div className={"flex flex-row justify-between items-center px-[24px] py-[15px] pointer-events-none"}>
                <div className={"flex flex-row gap-[8px]"}>
                    <LinkIcon/>
                    <span className={"items-center text-white text-2xl font-bold"}>URL Shortener</span>
                </div>
                <div
                    className={"flex flex-row items-center box-border border-white border-2 rounded px-[16px] py-[8px]"}>
                    <button className={"items-center text-white text-xl"} type={"submit"}
                            onClick={() => console.log("clicked")}>Login
                    </button>
                </div>
            </div>
        </div>
    )
}