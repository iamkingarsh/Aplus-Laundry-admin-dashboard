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
import { Card } from '@/components/ui/card';

interface Props {
    data: CustomersColumns
}

export const ImageModal: React.FC<Props> = ({ data }) => {
    const GlobalModal = useGlobalModal();

    return (
        <>
            <EyeIcon onClick={
                () => {
                    GlobalModal.title = 'Banner Preview'
                    GlobalModal.description = ' '
                    GlobalModal.children = <Card className="w-[400px] relative m-auto h-48 overflow-hidden flex border-2  items-center">
                        <Image src={data.banner_image} width={400} height={192} alt="banner image" objectFit="contain" className=" absolute" />
                    </Card>

                    GlobalModal.onOpen()
                }
            }
                className="h-4 w-4" />
        </>
    )
}

export default ImageModal
