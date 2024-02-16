"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Banknote, BoxIcon, CreditCard, Delete, Edit, Edit2, Eye, Globe2, IndianRupee, MoreHorizontal, ShipIcon, ToggleLeft, Trash, User, UserCheck, UserCog } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { MobileIcon } from "@radix-ui/react-icons"
import { useGlobalModal } from "@/hooks/GlobalModal"
import CellAction from "./cell-action"
import { OrderStatusChanger } from "./order-status-changer"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TransactionsColumns = {
    id: string
    status: "queued" | "pending" | "processing" | "processed" | "reversed" | "cancelled" | "rejected"
    source: {
        id: string
        payer_name: string
        payer_account: string
        payer_ifsc: string
        mode: string
        entity: string
        bank_reference: string
    }
    amount: number
    credit: number
    debit: number
    created_at: string

}





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

        cell: ({ row }) => <OrderStatusChanger data={row.original} />
        //     <div className="flex items-center">
        //         <div
        //             className={`w-2 h-2 rounded-full mr-2 ${row.original.status === "onhold" && "bg-yellow-500"
        //                 } ${row.original.status === "pending" && "bg-blue-500"
        //                 } ${row.original.status === "picked" && "bg-green-500"
        //                 } ${row.original.status === "onway" && "bg-purple-500"
        //                 } ${row.original.status === "delivered" && "bg-green-500"
        //                 } ${row.original.status === "cancelled" && "bg-red-500"
        //                 }`}
        //         />
        //         {row.original.status}
        //     </div>
        // ),
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
                {row.original.source.entity === "bank_transfer" ? "Credit" : "Debit"}
            </div>
        ),
    },
    // {
    //     accessorKey: "channel",
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //             >
    //                 Channel
    //                 <ArrowUpDown className="ml-2 h-4 w-4" />
    //             </Button>
    //         )
    //     },
    //     cell: ({ row }) => (
    //         <div className="flex items-center">
    //             <div
    //                 className={`w-2 h-2 rounded-full mr-2 `}
    //             />
    //             {row.original.channel === "manual" && <UserCheck className="mr-2 text-yellow-500 h-4 w-4" />}
    //             {row.original.channel === "Mobile App" && <MobileIcon className="mr-2 text-green-500 h-4 w-4" />}
    //             {row.original.channel}
    //         </div>
    //     ),
    // },
    {
        id: "actions",
        // cell: ({ row }) => <CellAction data={row.original} />
    },

]
