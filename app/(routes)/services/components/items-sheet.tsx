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
import { Card, CardHeader } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ScrollAreaScrollbar, ScrollAreaViewport } from '@radix-ui/react-scroll-area';
import SwitchComponent from './Switch';

interface Props {
    data: ServicesColumns | any
}

export const ItemsSheet: React.FC<Props> = ({ data }) => {
    const GlobalModal = useGlobalModal();
    const [checked, setChecked] = React.useState(data.laundrybykg === 'Active' ? true : false)
    const deleteOrder = () => {
        console.log('delete')
        GlobalModal.onClose()
    }
    const router = useRouter()
    return (
        <Sheet>
            <SheetTrigger>View Items
            </SheetTrigger>
            <SheetContent className='h-full'>
                <SheetHeader>
                    <SheetTitle>Laundry Items of <br /> {data.title} service</SheetTitle>
                    <Separator orientation='horizontal' />





                    <ScrollArea>
                        <div
                            className='grid gap-4  h-[85vh] py-4 pr-4 '
                        >


                            {


                                Object.keys(data.laundry_items as any).map((item: any, index) => {
                                    return (
                                        // <div key={index} className='flex justify-between items-center'>
                                        //     <p className='text-sm font-semibold'>{data.laundry_items[item].product_name}</p>
                                        //     <Switch />
                                        // </div>
                                        <Card key={index}
                                            className='flex w-full p-3  text-left'

                                        >



                                            {data.laundry_items[item].product_name}

                                            <SwitchComponent data={data.laundry_items[item].status} />


                                        </Card>
                                    )
                                })


                            }

                        </div>
                    </ScrollArea>





                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default ItemsSheet
