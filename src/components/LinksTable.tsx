import {LinkDataType} from "../types";
import {removeData} from "../Database";

export default function LinksTable({className, links, userid}: { className: string, links: LinkDataType, userid: string | undefined}) {
    return (
        <div className={className}>
            <table className="table-auto border-collapse border border-slate-500 bg-slate-400">
                <thead>
                <tr>
                    <th className={"border border-slate-700"}>Shortened</th>
                    <th className={"border border-slate-700"}>Long url</th>
                    <th className={"border border-slate-700 align-center"}> remove </th>
                </tr>
                </thead>
                <tbody className={"bg-slate-500"}>
                {Object.entries(links).map((l) => {
                    return (<tr>
                        <td className="border border-slate-700"> {l[0]} </td>
                        <td className="border border-slate-700"> {l[1]} </td>
                        <td className={"object-center border border-slate-700 bg-red-200"}>
                            <button className={"not-italic hover:italic"} onClick={() => removeData(userid,`${l[0]}`)}>  x</button>
                        </td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>
    )
}