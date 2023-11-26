"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Banknote, CreditCard, UserCheck } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

import { MobileIcon } from "@radix-ui/react-icons"
import CellAction from "./cell-action"

export type ProductsColumns = {
    product_id: string
    product_name: string
    active: boolean
    pricing: {
        price: number
        discount: number
        discounted_price: number
    }
    category: string
    sub_category: string
    description: string
    image: string


}



export const columns: ColumnDef<ProductsColumns>[] = [
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
        accessorKey: "product_id",
        header: "Product ID",
    },
    {
        accessorKey: "product_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Product Name
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
        accessorKey: "order_date",
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
            <div className="flex items-center">
                <div
                    className={`w-2 h-2 rounded-full mr-2 ${row.original.status === "onhold" && "bg-yellow-500"
                        } ${row.original.status === "pending" && "bg-blue-500"
                        } ${row.original.status === "picked" && "bg-green-500"
                        } ${row.original.status === "onway" && "bg-purple-500"
                        } ${row.original.status === "delivered" && "bg-green-500"
                        } ${row.original.status === "cancelled" && "bg-red-500"
                        }`}
                />
                {row.original.status}
            </div>
        ),
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
