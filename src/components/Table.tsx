import {
    ColumnDef, createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel, SortingState,
    useReactTable
} from "@tanstack/react-table";
import {useState, useMemo} from "react";
import {LinkData} from "../types";
import {removeData} from "../Database";
import SettingIcon from "../assets/SettingIcon";

const columnHelper = createColumnHelper<LinkData>()

export default function Table({links, userid}: { links: LinkData[], userid: string | undefined }) {
    const [sorting, setSorting] = useState<SortingState>([])

    const columns = useMemo<ColumnDef<LinkData, any>[]>(
        () => [
            columnHelper.display({
                id: "settings",
                size: 50,
                cell: props =>
                    <button
                        className={"p-4"}
                        onClick={() => removeData(userid, `${props.row.getVisibleCells()[1].getValue() ?? ""}`)}>
                        <SettingIcon/>
                    </button>
            }),
            columnHelper.accessor("short", {
                header: "Short",
                size: 100,
                cell: info => <span className={"max-w-[100px]"}>{info.getValue()}</span>,
            }),
            columnHelper.accessor("long", {
                header: "Original",
                size: 150,
                cell: info => <span className={"max-w-[150px]"}>{info.getValue()}</span>,
            }),
            columnHelper.accessor("desc", {
                header: "Description",
                size: 250,
                cell: info => <span className={"max-w-[250px]"}>{info.getValue()}</span>,
            }),
            columnHelper.display({
                header: "QR Code",
                size: 100,
                cell: props =>
                    <button className={"max-w-[100px] w-[100px]"} onClick={() => {
                    }}>
                        COPY
                    </button>
            }),
            columnHelper.display({
                header: "URL",
                size: 100,
                cell: props =>
                    <button className={"max-w-[100px] w-[100px]"} onClick={() => {
                    }}>
                        COPY
                    </button>
            })
        ], [userid])

    const table = useReactTable({
        data: links,
        columns: columns,
        state: {sorting},
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    return (
        <div className="overflow-x-scroll rounded hide-scrollbar">
            <table className={"min-w-max"}>
                <thead className={"bg-gray-200"}>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr
                        key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} colSpan={header.colSpan}
                                className={"text-left px-2"}>
                                {header.isPlaceholder ? null : (
                                    <div
                                        className={`my-3 ${header.column.getCanSort() ? "cursor-pointer select-none" : ""}`}
                                        onClick={header.column.getToggleSortingHandler()}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{
                                            asc: '⬆️',
                                            desc: '👎',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}
                        className={"odd:bg-white even:bg-gray-100"}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}
                                className={`text-left px-2 overflow-hidden overflow-x-scroll hide-scrollbar max-w-[${cell.column.getSize()}px]`}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}