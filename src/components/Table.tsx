import {
    ColumnDef, createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel, SortingState,
    useReactTable
} from "@tanstack/react-table";
import {useState, useMemo} from "react";
import {LinkData} from "../types";
import MenuPopup from "./MenuPopup";
import {toast} from "react-toastify";

const columnHelper = createColumnHelper<LinkData>()

export default function Table({links, userid}: { links: LinkData[], userid: string | undefined }) {
    const [sorting, setSorting] = useState<SortingState>([])

    const columns = useMemo<ColumnDef<LinkData, any>[]>(
        () => [
            columnHelper.display({
                id: "settings",
                size: 50,
                cell: props => <MenuPopup userid={userid}
                                          element={`${props.row.getVisibleCells()[1].getValue() ?? ""}`}/>
            }),
            columnHelper.accessor("short", {
                header: "Short",
                size: 98,
                cell: info => <span className={"max-w-[98] w-[98px]"}>{info.getValue()}</span>,
            }),
            columnHelper.accessor("long", {
                header: "Original",
                id: "long",
                size: 150,
                cell: info => <span className={"max-w-[150px] w-[150px]"}>{info.getValue()}</span>,
            }),
            columnHelper.accessor("desc", {
                header: "Description",
                id: "desc",
                size: 218,
                cell: info => <span className={"max-w-[218px] w-[218px]"}>{info.getValue()}</span>,
            }),
            columnHelper.display({
                header: "QR Code",
                size: 98,
                cell: props =>
                    <button className={"max-w-[98px] w-[98px]"} onClick={() => {}}>OPEN</button>
            }),
            columnHelper.display({
                header: "URL",
                size: 98,
                cell: props =>
                    <button className={"max-w-[98px] w-[98px]"}
                            onClick={() => {
                                navigator.clipboard.writeText(`${window.location.href}${props.row.getVisibleCells()[1].getValue()}`)
                                    .then(() => toast.success("Link was copied from to your clipboard!"))
                                    .catch(() => toast.error("An error occurred while attempting to copy link."))
                            }}
                    >
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
    if (links.length === 0) {
        return <p className={"text-center"}>No links, fill out the form to get started!</p>
    }

    return (
        <div className="overflow-x-scroll rounded hide-scrollbar w-[101%]">
            <table className={"min-w-max"}>
                <thead className={"bg-gray-200"}>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr
                        key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} colSpan={header.colSpan}
                                className={"text-left"}>
                                {header.isPlaceholder ? null : (
                                    <div
                                        className={`my-3 ${header.column.getCanSort() ? "cursor-pointer select-none" : ""} w-[${header.getSize()}px]`}
                                        onClick={header.column.getToggleSortingHandler()}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{
                                            asc: '⬆',
                                            desc: '⬇',
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
                                className={`text-left px-2
                                ${(cell.column.id === "desc" || cell.column.id === "long") ? "overflow-hidden overflow-x-scroll hide-scrollbar" : ""}
                                 max-w-[${cell.column.getSize()}px]`}>
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

