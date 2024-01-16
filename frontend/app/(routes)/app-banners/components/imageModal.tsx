"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useGlobalModal } from '@/hooks/GlobalModal';
import { Edit2, Eye, EyeIcon, MoreHorizontal, Trash, User } from 'lucide-react'
import React from 'react'
import { CustomersColumns } from './columns'
import { Alert } from '@/components/forms/Alert';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface Props {
    data: CustomersColumns
}

export const ImageModal: React.FC<Props> = ({ data }) => {
    const GlobalModal = useGlobalModal();
    console.log('delete banner',data)
    
    const deleteOrder = () => {
        console.log('delete banner')
        GlobalModal.onClose()
        toast.success('banner deleted successfully')
    }
    return (
        <>
            <EyeIcon onClick={
                () => {
                    GlobalModal.title = 'Banner Preview'
                    GlobalModal.description = ' '
                    GlobalModal.children = <Image alt={data.banner_title} src={data.banner_image} width={400} height={200} />

                    GlobalModal.onOpen()
                }
            }
                className="h-4 w-4" />
        </>
    )
}

export default ImageModal
