"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useGlobalModal } from '@/hooks/GlobalModal';
import { Edit2, Eye, MoreHorizontal, Trash, User } from 'lucide-react'
import React from 'react'
import { CustomersColumns } from './columns'
import { Alert } from '@/components/forms/Alert';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { deleteData } from '@/axiosUtility/api';
import { storage } from '@/lib/firebase';
import { deleteObject, getDownloadURL, ref } from 'firebase/storage';

interface Props {
    data: CustomersColumns
}

export const CellAction: React.FC<Props> = ({ data }) => {
    const GlobalModal = useGlobalModal();
    const router = useRouter()

    const deleteBanner = async () => {
        try {
            const urlParts = data.banner_image.split('/');
            const encodedFileName = urlParts[urlParts.length - 1].split('?')[0];
            const decodedFileName = decodeURIComponent(encodedFileName);
            const imageRef = ref(storage, `${decodedFileName}`);


            await deleteObject(imageRef).then(() => {
                toast.success('Banner Deleted Successfully')
                router.refresh()
                window.location.reload()
                GlobalModal.onClose()
            }).catch((error: any) => {
                toast.error('Error deleting image')
                console.log(error)
            }).finally(async () => {
                await deleteData(`/appBanner/id/${data._id}`)
            });

        } catch (error) {
            toast.error('Error deleting data')
            console.error('Error deleting data:', error);
        }
        GlobalModal.onClose()

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

                <DropdownMenuItem
                    onSelect={() => {
                        GlobalModal.title = 'Delete Customer'
                        GlobalModal.description = 'Are you sure you want to delete this banner?'
                        GlobalModal.children = <Alert onConfirm={deleteBanner} />
                        GlobalModal.onOpen()
                    }
                    }
                    className="focus:bg-destructive focus:text-destructive-foreground">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Banner</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CellAction
