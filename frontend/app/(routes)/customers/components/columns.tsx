"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Copy } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CellAction from "./cell-action"
import format from "date-fns/format"
import toast from "react-hot-toast"

export type CustomersColumns = {
    _id: string
    fullName: string
    address: Array<{ location: string }>
    mobileNumber: string
    createdAt: string
    email: string
    customerId: string
    profileImg: string
}

export const columns: ColumnDef<CustomersColumns>[] = [
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
        accessorKey: "profileImg",
        header: "Profile",
        cell: ({ row }) => (
            <div className="flex items-center">
                <Avatar className='w-8 h-8'>
                    <AvatarImage src={row.original.profileImg} alt="@shadcn" />
                    <AvatarFallback> {row.original.fullName} </AvatarFallback>
                </Avatar>

            </div>
        ),
    },
    {
        accessorKey: "customerId",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Customer ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell(props) {
            return (
                <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2" />
                    <span >{props.row.original.customerId}</span>
                    <Copy
                        onClick={() => {
                            navigator.clipboard.writeText(props.row.original.customerId)
                            toast.success("Copied to clipboard")
                        }
                        }
                        className="ml-2 h-4 w-4 cursor-pointer" />
                </div>
            )
        },
    },
    {
        accessorKey: "fullName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Full Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "mobileNumber",
        header: "Mobile No.",
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => (
            <div className="flex items-center">
                {row.original.address[0]?.location}
            </div>
        ),
    },
    {
        accessorKey: "dateCreated",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
                >
                    Date Created
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center">
                {format(new Date(row.original.createdAt), "PP")}
            </div>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },

]
