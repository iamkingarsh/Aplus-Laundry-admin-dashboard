"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CustomersColumns = {
    id: string
    label: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const columns: ColumnDef<CustomersColumns>[] = [
    {
        accessorKey: "status",
        header: "Status",
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
        accessorKey: "amount",
        header: "Amount",
    },
]
