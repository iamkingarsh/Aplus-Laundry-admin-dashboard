"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useGlobalModal } from '@/hooks/GlobalModal';
import { Edit2, Eye, MoreHorizontal, Trash } from 'lucide-react'
import React from 'react'
import { ServicesColumns } from './columns'
import { Alert } from '@/components/forms/Alert';
import { useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Switch } from '@/components/ui/switch';

interface Props {
    data: ServicesColumns | any
}

export const ItemsSheet: React.FC<Props> = ({ data }) => {
    const GlobalModal = useGlobalModal();
    const deleteOrder = () => {
        console.log('delete')
        GlobalModal.onClose()
    }
    const router = useRouter()
    return (
        <Sheet>
            <SheetTrigger>View Items
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Laundry Items of <br /> {data.title} service</SheetTitle>
                    <Separator orientation='horizontal' />
                    <SheetDescription>
                        {

                            Object.keys(data.laundry_items as any).map((item: any, index) => {
                                return (
                                    <div key={index} className='flex justify-between items-center'>
                                        <p className='text-sm font-semibold'>{data.laundry_items[item].title}</p>
                                        <Switch />
                                    </div>
                                )
                            })


                        }
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default ItemsSheet
