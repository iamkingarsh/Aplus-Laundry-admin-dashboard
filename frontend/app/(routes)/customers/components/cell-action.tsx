"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Edit2, MoreHorizontal, User } from 'lucide-react'
import React from 'react'
import { CustomersColumns } from './columns'

interface Props {
    data: CustomersColumns
}

export const CellAction: React.FC<Props> = ({ data }) => {


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

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CellAction
