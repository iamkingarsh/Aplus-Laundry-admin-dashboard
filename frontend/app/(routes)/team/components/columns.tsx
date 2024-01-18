"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Delete, Edit, Edit2, MoreHorizontal, ToggleLeft, Trash, User } from "lucide-react"
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
import CellAction from "./cell-action"

export type CustomersColumns = {
    id: string
    profileImg: string
    fullName: string
    email: string
    address: string
    role: string
    allowedAccess: Array<string>
    mobileNumber: string
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
        accessorKey: "profilepic",
        header: "Profile",
        cell: ({ row }) => (
            <div className="flex items-center">
                <Avatar className='w-8 h-8'>
                    <AvatarImage src={row.original.profileImg} alt="@shadcn" />
                    <AvatarFallback> {row.original.fullName[0]} </AvatarFallback>
                </Avatar>

            </div>
        ),
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
        accessorKey: "role",
        header: "Role",
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
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },

]
