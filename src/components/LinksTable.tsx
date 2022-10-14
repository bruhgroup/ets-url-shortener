import {LinkDataType} from "../types";
import {removeData} from "../Database";

export default function LinksTable({ links, userid}: {  links: LinkDataType, userid: string | undefined}) {
    return (
            <table className="table-fixed border-collapse border border-slate-500 bg-slate-40 w-full">
                <thead>
                <tr>
                    <th className={"border border-slate-700 w-20 px-1"}>Remove</th>
                    <th className={"border border-slate-700"}>Shortened url</th>
                    <th className={"border border-slate-700"}>Long url</th>
                </tr>
                </thead>
                <tbody className={"bg-slate-500"}>
                {Object.entries(links).map((l) => {
                    return (<tr className={"odd:bg-white even:bg-slate-200"}>
                        <td className={"flex justify-center border border-slate-700"}>
                            <button className={"bg-red-600 rounded-2xl w-6 h-6"} onClick={() => removeData(userid,`${l[0]}`)}/>
                        </td>
                        <td className={"border border-slate-700"}> {l[0]} </td>
                        <td className={"border border-slate-700"}> {l[1]} </td>
                    </tr>)
                })}
                </tbody>
            </table>
    )
}