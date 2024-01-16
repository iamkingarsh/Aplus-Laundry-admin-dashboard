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

interface Props {
    data: CustomersColumns
}

export const CellAction: React.FC<Props> = ({ data }) => {
    const GlobalModal = useGlobalModal();
    const router = useRouter()
    const deleteOrder = () => {
        console.log('delete banner')
        GlobalModal.onClose()
        toast.success('banner deleted successfully')
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
                        GlobalModal.title = 'Banner Preview'
                        GlobalModal.description = '  '
                        GlobalModal.children = <Card className="w-[400px] relative m-auto h-48 overflow-hidden flex border-2  items-center">

                            <Image src={data.banner_image} width={400} height={192} alt="banner image" objectFit="contain" className=" absolute" />
                            <div className="absolute text-white text-left p-4 ">
                                <h1 className="text-2xl font-bold">{data.banner_title}</h1>
                                <p className="text-sm">{data.banner_description}</p>
                            </div>
                        </Card>
                        GlobalModal.onOpen()
                    }
                    }
                >
                    <User className="mr-2 h-4 w-4" />
                    Banner Preview</DropdownMenuItem>
                <DropdownMenuItem
                    onSelect={() => {
                        router.push(`/app-banners/edit/${data._id}`)
                    }
                    }
                >
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Banner Details</DropdownMenuItem>
                <DropdownMenuItem
                    onSelect={() => {
                        GlobalModal.title = 'Delete Customer'
                        GlobalModal.description = 'Are you sure you want to delete this banner?'
                        GlobalModal.children = <Alert onConfirm={deleteOrder} />
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
