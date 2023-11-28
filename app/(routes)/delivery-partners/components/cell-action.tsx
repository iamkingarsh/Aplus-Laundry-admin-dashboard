"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useGlobalModal } from '@/hooks/GlobalModal';
import { Edit2, Eye, MoreHorizontal, Trash, User } from 'lucide-react'
import React from 'react'
import { DeliveryAgentsColumns } from './columns'
import { Alert } from '@/components/forms/Alert';
import toast from 'react-hot-toast';

interface Props {
    data: DeliveryAgentsColumns
}

export const CellAction: React.FC<Props> = ({ data }) => {
    const GlobalModal = useGlobalModal();
    const deleteOrder = () => {
        console.log('delete Customer')
        GlobalModal.onClose()
        toast.success('Customer deleted successfully')
    }
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
                    View Delivery Agent Details</DropdownMenuItem>
                <DropdownMenuItem>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Delivery Agent Details</DropdownMenuItem>
                <DropdownMenuItem
                    onSelect={() => {
                        GlobalModal.title = 'Delete Customer'
                        GlobalModal.description = 'Are you sure you want to delete this customer?'
                        GlobalModal.children = <Alert onConfirm={deleteOrder} />
                        GlobalModal.onOpen()
                    }
                    }
                    className="focus:bg-destructive focus:text-destructive-foreground">
                    <Trash className="mr-2 h-4 w-4" />
                    Deactivate Delivery Agent</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CellAction
