"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useGlobalModal } from '@/hooks/GlobalModal';
import { Edit2, Eye, MoreHorizontal, Trash, User } from 'lucide-react'
import React from 'react'
import { CustomersColumns } from './columns'
import { Alert } from '@/components/forms/Alert';
import toast from 'react-hot-toast';
import { deleteData } from '@/axiosUtility/api';

interface Props {
    data: CustomersColumns
}

export const CellAction: React.FC<Props> = ({ data }) => {
    const GlobalModal = useGlobalModal();

    const deleteCustomer = async () => {


        try {
            const result = await deleteData(`/auth/id/${data._id}`); // Replace 'your-delete-endpoint' with the actual DELETE endpoint

            toast.success('Category Deleted Successfully')
            GlobalModal.onClose()
            window.location.reload()
        } catch (error) {
            console.error('Error deleting data:', error);
        }


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
                    View Customer Details</DropdownMenuItem>
                <DropdownMenuItem>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Customer Details</DropdownMenuItem>
                <DropdownMenuItem
                    onSelect={() => {
                        GlobalModal.title = 'Delete Customer'
                        GlobalModal.description = 'Are you sure you want to delete this customer?'
                        GlobalModal.children = <Alert onConfirm={deleteCustomer} />
                        GlobalModal.onOpen()
                    }
                    }
                    className="focus:bg-destructive focus:text-destructive-foreground">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Customer</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CellAction
