"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useGlobalModal } from '@/hooks/GlobalModal';
import { Edit2, Eye, MoreHorizontal, Trash } from 'lucide-react'
import React from 'react'
import { ProductsColumns } from './columns'
import { Alert } from '@/components/forms/Alert';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { deleteData } from '@/axiosUtility/api';

interface Props {
    data: ProductsColumns | any
}

export const CellAction: React.FC<Props> = ({ data }) => {
    const GlobalModal = useGlobalModal();
    const router = useRouter()
    const deleteOrder = async () => {
        console.log(data._id)
        try {
            const result = await deleteData(`/product/id/${data._id}`); // Replace 'your-delete-endpoint' with the actual DELETE endpoint
            console.log('Success:', result);
            toast.success('Category Deleted Successfully')
            GlobalModal.onClose()
            router.refresh()
            window.location.reload()
        } catch (error) {
            console.error('Error deleting data:', error);
        }

        GlobalModal.onClose()
    }
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
                                router.push(`products/edit/${data._id}`)
                            }
                        }

                    >
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit Item</DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={() => {
                            GlobalModal.title = `Delete Laundry Item`
                            GlobalModal.description = "Are you sure you want to delete this laundry item? This action cannot be undone."
                            GlobalModal.children = <Alert onConfirm={deleteOrder} />
                            GlobalModal.onOpen()
                        }}
                        className="focus:bg-destructive focus:text-destructive-foreground">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Item</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default CellAction
