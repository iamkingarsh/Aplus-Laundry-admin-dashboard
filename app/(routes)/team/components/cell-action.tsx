"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useGlobalModal } from '@/hooks/GlobalModal';
import { Edit2, Eye, MoreHorizontal, Trash, User } from 'lucide-react'
import React from 'react'
import { CustomersColumns } from './columns'
import { Alert } from '@/components/forms/Alert';
import toast from 'react-hot-toast';

interface Props {
    data: CustomersColumns
}

export const CellAction: React.FC<Props> = ({ data }) => {
    const GlobalModal = useGlobalModal();
    const deleteOrder = () => {
        console.log('delete Customer')
        GlobalModal.onClose()
        toast.success('Removed Team Member successfully')
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
                    View Team Member</DropdownMenuItem>
                <DropdownMenuItem>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Team Member</DropdownMenuItem>
                <DropdownMenuItem
                    onSelect={() => {
                        GlobalModal.title = `Remove ${data.fullname}`
                        GlobalModal.description = `Are you sure you want to remove ${data.fullname} from Team?`
                        GlobalModal.children = <Alert onConfirm={deleteOrder} />
                        GlobalModal.onOpen()
                    }
                    }
                    className="focus:bg-destructive focus:text-destructive-foreground">
                    <Trash className="mr-2 h-4 w-4" />
                    Remove Team Member</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CellAction
