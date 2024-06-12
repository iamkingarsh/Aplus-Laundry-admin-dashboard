"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Edit2, MoreHorizontal, User } from 'lucide-react'
import React from 'react'
import { CustomersColumns } from './columns'
import { useRouter } from 'next/navigation'

interface Props {
    data: CustomersColumns
}

export const CellAction: React.FC<Props> = ({ data }) => {

    const router = useRouter()
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
                <DropdownMenuItem
                    onClick={() => {
                        router.push(`/customers/${data._id}`)
                    }}
                >
                    <User className="mr-2 h-4 w-4" />
                    View Customer Details</DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        router.push(`/customers/edit/${data._id}`)
                    }}
                >

                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Customer Details</DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CellAction
