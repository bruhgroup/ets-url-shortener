import {
    ColumnDef, createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel, SortingState,
    useReactTable
} from "@tanstack/react-table";
import {useState, useMemo} from "react";
import {LinkDataType} from "../types";
import LinkIcon from "../assets/LinkIcon";

type LinkData = {
    long: string,
    short: string
}

const data: LinkData[] = [
    {
        long: "somelongURL",
        short: "abcdsde"
    },
    {
        long: "fancyIRl",
        short: "bcdcds"
    },
    {
        long: "coolIRL",
        short: "zfdsjdsk"
    },
    {
        long: "Undersea",
        short: "ijiwdsd"
    }
]

const columnHelper = createColumnHelper<LinkData>()

export default function Table({links, userid}: { links: LinkDataType, userid: string | undefined }) {
    const [sorting, setSorting] = useState<SortingState>([])

    const columns = useMemo<ColumnDef<LinkData>[]>(
        () => [
            columnHelper.display({
                id: 'actions',
                cell: props => <button>hehex</button>,
            }),
            columnHelper.group({
                header: "Data",
                columns: [
                    columnHelper.accessor("short", {
                        cell: info => info.getValue(),
                    }),
                    columnHelper.accessor("long", {
                        cell: info => info.getValue(),
                    }),
                ]
            })
        ], [])

    const table = useReactTable({
        data: data,
        columns: columns,
        state: {sorting},
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    })

    return (
        <div className="p-2">
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} colSpan={header.colSpan}>
                                {header.isPlaceholder ? null : (
                                    <div
                                        className={
                                            header.column.getCanSort()
                                                ? 'cursor-pointer select-none'
                                                : ''
                                        }
                                        onClick={header.column.getToggleSortingHandler()}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{
                                            asc: 'up',
                                            desc: 'down',
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
                    <tr key={row.id}>
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