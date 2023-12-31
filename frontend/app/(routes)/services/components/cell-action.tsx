"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useGlobalModal } from '@/hooks/GlobalModal';
import { Edit2, Eye, MoreHorizontal, Trash } from 'lucide-react'
import React from 'react'
import { ServicesColumns } from './columns'
import { Alert } from '@/components/forms/Alert';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {
    data: ServicesColumns
}

export const CellAction: React.FC<Props> = ({ data }) => {
    const GlobalModal = useGlobalModal();
    const deleteOrder = () => {
        console.log('delete')
        toast.success('Service Deleted Successfully')
        GlobalModal.onClose()
    }
    const router = useRouter()
    return (
        <div>
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
                        onSelect={
                            () => {
                                router.push(`/services/edit/${data.service_id}`)
                            }
                        }>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit Service Details</DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={() => {
                            GlobalModal.title = `Delete ${data.title} `
                            GlobalModal.description = "Are you sure you want to delete this Service?"
                            GlobalModal.children = <Alert onConfirm={deleteOrder} />
                            GlobalModal.onOpen()
                        }}
                        className="focus:bg-destructive focus:text-destructive-foreground">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Service</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default CellAction
