"use client"
import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    getPaginationRowModel,

} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { DataTablePagination } from "./data-table-pagination"
import toast from "react-hot-toast"
import { useGlobalModal } from "@/hooks/GlobalModal"
import { Alert } from "../forms/Alert"
import { deleteAllData } from '../../axiosUtility/api'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey: string;
    bulkDeleteIdName?: string;
    bulkDeleteTitle?: string;
    bulkDeleteDescription?: string;
    bulkDeleteToastMessage?: string;
    deleteRoute?: string


}


export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    bulkDeleteIdName,
    bulkDeleteTitle,
    bulkDeleteDescription,
    bulkDeleteToastMessage,
    deleteRoute
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            rowSelection,
            columnVisibility,
        },
    })

    const modal = useGlobalModal()

    const handleBulkDelete = (ids: any) => {
        // @mujahed add delete functionallity here

        console.log('ids ids', ids);

        const Delete = async () => {
            try {
                const result = await deleteAllData(deleteRoute as string, ids); // Assuming deleteData supports sending data in the request body
                window.location.reload();

                modal.onClose();
            } catch (error) {
                console.error('Error deleting data:', error);
            }
        };


        Delete()
        toast.success(bulkDeleteToastMessage ?? "Successfully Deleted")


    };

    return (
        <div>
            <div className="flex items-center py-4">
                <div className="relative max-w-sm w-full flex items-center">
                    <Search className="h-4 absolute right-2 text-gray-500" />
                    <Input
                        placeholder={`Search by ${searchKey}...`}
                        value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn(searchKey)?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results Found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div>

                    {table.getFilteredSelectedRowModel().rows.length > 0 && <span className="ml-2  text-sm font-semibold text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </span>}
                    {
                        table.getFilteredSelectedRowModel().rows.length > 1 &&
                        <Button variant="outline" className="ml-2" onClick={() => table.toggleAllPageRowsSelected()}>
                            Clear Selection
                        </Button>
                    }

                    {
                        table.getFilteredSelectedRowModel().rows.length > 1 &&
                        <Button variant="destructive" className="ml-2" onClick={() => {

                            const selectedIds = table.getFilteredSelectedRowModel().rows.map((row: any) => row.original[bulkDeleteIdName as string]);


                            modal.title = bulkDeleteTitle ?? "Delete This Data?"
                            modal.description = bulkDeleteDescription ?? "Are you sure you want to delete this data? This action cannot be undone."
                            modal.children = <Alert onConfirm={() => handleBulkDelete(selectedIds)} />
                            modal.onOpen()

                        }}>
                            Delete Selected
                        </Button>
                    }
                </div>
                <div >
                    <DataTablePagination table={table} />
                </div>
            </div>
        </div>
    )
}
