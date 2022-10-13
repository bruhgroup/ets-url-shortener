import {LinkDataType} from "../types";

export default function LinksTable({className, links}: { className: string, links: LinkDataType }) {
    return (
        <div className={className}>
            <table className="table-auto border-collapse border border-slate-500 bg-slate-400">
                <thead>
                <tr>
                    <th className={"border border-slate-700"}>Long url</th>
                    <th className={"border border-slate-700"}>Shortened</th>
                    <th className={"border border-slate-700"}>Stuff lol</th>
                </tr>
                </thead>
                <tbody className={"bg-slate-500"}>
                {Object.entries(links).map((l) => {
                    return (<tr>
                        <td className="border border-slate-700">{l[0]}</td>
                        <td className="border border-slate-700">{l[1]}</td>
                        <td className="border border-slate-700">hELLO</td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>
    )
}