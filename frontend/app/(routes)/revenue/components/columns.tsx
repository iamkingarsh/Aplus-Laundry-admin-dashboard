"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TransactionsColumns = {
    id: string;
    payment_id: string;
    status: string
    source: {
        id: string;
        payer_name: string;
        payer_account: string;
        payer_ifsc: string;
        mode: string;
        entity: string;
        bank_reference: string;
    };
    amount: number;
    credit: number;
    debit: number;
    created_at: string;
};






export const columns: ColumnDef<TransactionsColumns>[] = [


    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "source.payer_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Customer Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Transaction Amt.
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center">
                <span className={` ${row.original.credit > 0 ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`} >
                    <span>
                        {row.original.credit > 0 ? "+" : "-"}
                    </span>
                    {
                        new Intl.NumberFormat('en-IN', {
                            style: 'currency',
                            currency: 'INR'
                        }).format(row.original.amount / 100)
                    }
                </span>
            </div >
        ),
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Transaction Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },

        cell: ({ row }) => (
            <div className="flex items-center py-1">
                <div
                    className={`w-2 h-2 rounded-full mr-2  ${row.original.status === "captured" ? "bg-green-500"
                        : "bg-red-500"}`}
                />
                {row.original.status === 'captured' ? 'Payment Successful' : 'Failed'}
            </div>
        ),
    },
    {
        accessorKey: "source.entity",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Transaction Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center">
                <div
                    className={`w-2 h-2 rounded-full mr-2 ${row.original.source.entity === "bank_transfer" && "bg-green-500"
                        } ${row.original.source.entity === "payout" && "bg-red-500"
                        }`}
                />
                {row.original.source.entity === "payment" ? "Credit" : "Debit"}
            </div>
        ),
    },

    {
        id: "actions",
        // cell: ({ row }) => <CellAction data={row.original} />
    },

]

