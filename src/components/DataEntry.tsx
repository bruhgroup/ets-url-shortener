import ArrowIcon from "../assets/ArrowIcon";

export default function DataEntry() {
    return (
        <div
            className={"flex flex-col justify-center items-center px-[8px] py-[12px] gap-[12px] bg-gray-300 rounded"}>
            <div className={"flex flex-row justify-center items-center gap-[20px]"}>
                <input/>
                <ArrowIcon/>
                <input/>
            </div>
            <div className={"border-2 bg-gray-300 w-full"}/>
            <div className={"flex flex-col items-center gap-[5px]"}>test</div>
        </div>)
}