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

const columnHelper = createColumnHelper<LinkData>()

export default function Table({links, userid}: { links: LinkData[], userid: string | undefined }) {
    const [sorting, setSorting] = useState<SortingState>([])

    const columns = useMemo<ColumnDef<LinkData, any>[]>(
        () => [
            columnHelper.display({
                id: 'actions',
                cell: (props) =>
                    <button className={"bg-red-600 rounded-2xl w-6 h-6 mx-2"}
                            onClick={() => removeData(userid, `${props.row.getVisibleCells()[1].getValue() ?? ""}`)}/>
            }),
            columnHelper.accessor("short", {
                cell: info => info.getValue(),
                header: "Short"
            }),
            columnHelper.accessor("long", {
                size: 10,
                cell: (props) => <p
                className={"truncate w-[32rem]"}
                >{props.getValue()}</p>,
                header: "Original"
            }),
            columnHelper.accessor("desc", {
                id: 'description',
                cell: info => info.getValue(),
                header: "Description"
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
        <div className="p-2">
            <table
            className={"shadow"}>
                <thead
                className={"bg-gray-200"}
                >
                {table.getHeaderGroups().map(headerGroup => (
                    <tr
                        className={""}
                        key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} colSpan={header.colSpan}
                            className={
                                `${(header.id === "actions" ? "rounded-tl-md" : header.id === "description" ? "rounded-tr-md" : "")}
                                text-left px-2`
                            }
                            >
                                {header.isPlaceholder ? null : (
                                    <div
                                        className={`
                                            ${header.column.getCanSort()
                                                ? 'cursor-pointer select-none'
                                                : ''} my-3`
                                        }
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
                            >
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