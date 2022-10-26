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
                id: 'setting',
                cell: props =>
                    <button
                        className={"p-4"}
                        onClick={() => removeData(userid, `${props.row.getVisibleCells()[1].getValue() ?? ""}`)}>
                        <SettingIcon/>
                    </button>
            }),
            columnHelper.accessor("short", {
                header: "Short",
                cell: info => info.getValue(),
            }),
            columnHelper.accessor("long", {
                // cell: (props) => <p className={"truncate w-[12em]"}>{props.getValue()}</p>,
                header: "Original",
                cell: props => props.getValue(),
            }),
            columnHelper.accessor("desc", {
                id: 'description',
                header: "Description",
                cell: info => info.getValue(),
            }),
            columnHelper.display({
                id: 'qr',
                header: "QR Code",
                cell: props =>
                    <button
                        className={"p-4"}
                        onClick={() => {
                        }}>
                        COPY
                    </button>
            }),
            columnHelper.display({
                id: 'copy',
                header: "URL",
                cell: props =>
                    <button
                        className={"p-4"}
                        onClick={() => {
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
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    })

    return (
        <div className="overflow-x-auto rounded">
            <table className={"table-auto shadow w-full"}>
                <thead className={"bg-gray-200"}>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr
                        className={""}
                        key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} colSpan={header.colSpan}
                                className={"text-left px-2"}
                            >
                                {header.isPlaceholder ? null : (
                                    <div
                                        className={`my-3 ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}`}
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
                            <td key={cell.id}>
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