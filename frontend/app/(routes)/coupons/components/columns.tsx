"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Banknote, BoxIcon, Clipboard, CreditCard, Delete, Edit, Edit2, Eye, Globe2, IndianRupee, MoreHorizontal, Percent, ShipIcon, ToggleLeft, Trash, User, UserCheck, UserCog } from "lucide-react"
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
import toast from "react-hot-toast"
import { useState } from "react"
import SwitchComponent from "./switch"
import format from "date-fns/format"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CouponsColumns = {

    discount_code: string
    discount_type: string
    discount_value: string
    discount_minimum_purchase_amount: string
    active: boolean
    discount_expiry_date: Date
    _id: string
}


export const columns: ColumnDef<CouponsColumns>[] = [
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
        accessorKey: "discount_code",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Coupon Code
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center">
                <div
                    className={`w-2 h-2 rounded-full mr-2 `}
                />
                {row.original.discount_code} <Clipboard onClick={() => { navigator.clipboard.writeText(row.original.discount_code); toast.success("Copied to clipboard") }} className='ml-2 w-4 h-4 cursor-pointer' />
            </div>
        ),

    },
    {
        accessorKey: "discount_type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Discount Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center">
                <div
                    className={`w-2 h-2 rounded-full mr-2 `}
                />
                {row.original.discount_type} {row.original.discount_type == 'percentage' ? <Percent className='ml-2 w-4 h-4' /> : <IndianRupee className='ml-2 w-4 h-4' />}
            </div>
        ),
    },
    {
        accessorKey: "discount_minimum_purchase_amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Min Order Value
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center">
                <div
                    className={`w-2 h-2 rounded-full mr-2 `}
                />
                {row.original.discount_minimum_purchase_amount}
            </div>
        ),
    },
    {
        accessorKey: "discount_value",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Discount Value
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center">
                <div
                    className={`w-2 h-2 rounded-full mr-2 `}
                />
                {row.original.discount_value} {row.original.discount_type == 'percentage' ? <Percent className='ml-2 w-4 h-4' /> : <IndianRupee className='ml-2 w-4 h-4' />}

            </div>
        ),
    },
    {
        accessorKey: "active",
        header: "active",
        cell: ({ row }) => <SwitchComponent data={row.original} />
        ,
    },
    {
        accessorKey: "discount_expiry_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Expiry Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center">
                <div
                    className={`w-2 h-2 rounded-full mr-2 `}
                />
                {format(new Date(row.original.discount_expiry_date), 'PP')}
            </div>
        ),

    },

    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },

]
