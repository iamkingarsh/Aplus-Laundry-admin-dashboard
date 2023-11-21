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
import { Switch } from "@/components/ui/switch"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CustomersColumns = {
    id: string
    fullname: string
    address: string
    mobile: string
    status: "active" | "inactive"
    email: string
    profilepic: string
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
                    <AvatarImage src={row.original.profilepic} alt="@shadcn" />
                    <AvatarFallback> {row.original.fullname[0]} </AvatarFallback>
                </Avatar>

            </div>
        ),
    },
    {
        accessorKey: "id",
        header: "User id",
    },
    {
        accessorKey: "fullname",
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
        accessorKey: "mobile",
        header: "Mobile No.",
    },
    {
        accessorKey: "address",
        header: "Address",
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
                    className={`w-2 h-2 rounded-full mr-2 ${row.original.status === "active" ? "bg-green-500" : "bg-red-500"
                        }`}
                />
                {row.original.status}
            </div>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="gap-2" align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            View Customer Details</DropdownMenuItem>
                        <DropdownMenuItem>
                            <Edit2 className="mr-2 h-4 w-4" />
                            Edit Customer Details</DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-destructive focus:text-destructive-foreground">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Customer</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]
