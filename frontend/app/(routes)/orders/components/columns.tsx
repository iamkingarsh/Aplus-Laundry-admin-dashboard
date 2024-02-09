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
import format from "date-fns/format"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrdersColumns = {
    _id: string
    customer_name: string
    customer_id: string
    mobile: string
    status: "onhold" | "pending" | "picked" | "onway" | "delivered" | "cancelled"
    orderDate: string
    payment_method: "cod" | "payment gateway"
    channel: "manual" | "Mobile App"
}





export const columns: ColumnDef<OrdersColumns>[] = [
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
        accessorKey: "_id",
        header: "Order ID",
        cell: ({ row }) => (
            <div className="flex items-center">
                <div className="w-2 h-2 rounded-full mr-2" />
                <span >#{row.original._id?.toUpperCase().slice(0, 7)}</span>
            </div>
        ),
    },
    {
        accessorKey: "customer_name",
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
        accessorKey: "mobile",
        header: "Mobile No.",
    },
    {
        accessorKey: "orderDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Order Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center">
                {new Date(row.original.orderDate).toDateString()}
            </div>
        ),
        // cell: ({ row }) => <div>{new Date(row.original.orderDate).toDateString()}</div>,
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
        accessorKey: "payment_method",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Payment Method
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center">
                <div
                    className={`w-2 h-2 rounded-full mr-2 `}
                />
                {row.original.payment_method === "cod" && <Banknote className="mr-2 text-green-500 h-4 w-4" />}
                {row.original.payment_method === "payment gateway" && <CreditCard className="mr-2 text-purple-800 dark:text-purple-400 h-4 w-4" />}
                {row.original.payment_method}
            </div>
        ),
    },
    {
        accessorKey: "channel",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Channel
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center">
                <div
                    className={`w-2 h-2 rounded-full mr-2 `}
                />
                {row.original.channel === "manual" && <UserCheck className="mr-2 text-yellow-500 h-4 w-4" />}
                {row.original.channel === "Mobile App" && <MobileIcon className="mr-2 text-green-500 h-4 w-4" />}
                {row.original.channel}
            </div>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },

]
