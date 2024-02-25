"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useGlobalModal } from '@/hooks/GlobalModal';
import { Edit2, Eye, MoreHorizontal, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { ServicesColumns } from './columns'
import { Alert } from '@/components/forms/Alert';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import SwitchComponent from './Switch';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { fetchData } from '@/axiosUtility/api';
// import { categories } from '@/lib/constants';


interface Props {
    data: ServicesColumns | any
}


export const ItemsSheet: React.FC<Props> = ({ data }) => {

    const [loading, setLoading] = useState(true) as any

    const laundryByKgItems = data?.laundry_items?.laundryByKG?.items
    const laundryPerPairItems = data.laundry_items.laundryPerPair?.items


    console.log(laundryByKgItems, 'laundryBy KgItems')



    const productsByCategoryKG = {} as any;
    laundryByKgItems.forEach((product: any) => {
        if (!productsByCategoryKG[product.item.category?.title]) {
            productsByCategoryKG[product.item.category?.title] = [];
        }
        productsByCategoryKG[product.item.category?.title].push(product.item);
    });

    const productsByCategoryPerPair = {} as any;
    laundryPerPairItems.forEach((product: any) => {
        if (!productsByCategoryPerPair[product.item.category?.title]) {
            productsByCategoryPerPair[product.item.category?.title] = [];
        }
        productsByCategoryPerPair[product.item.category?.title].push(product.item);
    });

    const laundryByKGFilteredItems = Object.entries(productsByCategoryKG).map(([key, value]) => {
        return {
            category: key,
            products: value,
        };
    });
    console.log(laundryByKGFilteredItems, 'laundryByKGFilteredItems')

    const laundryPerPairFilteredItems = Object.entries(productsByCategoryPerPair).map(([key, value]) => {
        return {
            category: key,
            products: value,
        };
    });

    console.log(laundryPerPairFilteredItems, 'laundryPerPairFilteredItems')



    return (
        <Sheet>
            <SheetTrigger>
                <div className='hover:bg-accent p-2 px-4 hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'>
                    View Items
                </div>
            </SheetTrigger>
            <SheetContent className='h-full'>
                <SheetHeader>
                    <SheetTitle>Laundry Items of <br /> {data.title} service</SheetTitle>
                    <Separator orientation='horizontal' />

                    <Tabs className='w-full'>
                        <TabsList className='flex w-full gap-2'>
                            {
                                laundryByKGFilteredItems.length > 0 && <TabsTrigger className='w-full' value='laundrybykg'  >Laundry By KG</TabsTrigger>}
                            {laundryPerPairFilteredItems.length > 0 && <TabsTrigger className='w-full' value='laundryperpair' >Laundry Per Pair</TabsTrigger>
                            }

                        </TabsList>
                        <TabsContent value='laundrybykg' className='w-full'>
                            <ScrollArea>
                                <div
                                    className='flex flex-col gap-4  h-[80vh] py-4 pr-4 '
                                >
                                    <>

                                        {laundryByKGFilteredItems.map((item: any, index: any) => {
                                            return (
                                                <Card key={index}
                                                    className='flex flex-col h-fit w-full px-4  py-4'>
                                                    <span className='text-lg font-bold mb-2'> {item.category} </span>
                                                    <Separator orientation='horizontal' />
                                                    <div key={index}
                                                        className='flex flex-col w-full p-3 justify-between '

                                                    >
                                                        {item.products.map((items: any, index: any) => {
                                                            return (
                                                                <div key={index} className='flex w-full py-2 justify-between '>
                                                                    <span className='text-md'>
                                                                        {items.product_name}
                                                                    </span>

                                                                    <SwitchComponent data={items.active} />
                                                                </div>

                                                            )
                                                        })}
                                                    </div>

                                                </Card>)
                                        })}
                                    </>
                                </div>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value='laundryperpair' className='w-full'>
                            <ScrollArea>
                                <div className='flex flex-col gap-4  h-[80vh] py-4 pr-4 '>
                                    <>
                                        {laundryPerPairFilteredItems.map((item: any, index: any) => {
                                            return (
                                                <Card key={index}
                                                    className='flex flex-col w-full px-4  py-4'>
                                                    <span className='text-lg font-bold mb-2'>
                                                        {item.category}
                                                    </span>
                                                    <Separator orientation='horizontal' />
                                                    <div key={index}
                                                        className='flex flex-col w-full p-3 justify-between '

                                                    >
                                                        {item.products.map((items: any, index: any) => {
                                                            return (
                                                                <div key={index} className='flex w-full py-2 justify-between '>
                                                                    <span className='text-md'>
                                                                        {items.product_name}
                                                                    </span>

                                                                    <SwitchComponent data={items.active} />
                                                                </div>

                                                            )
                                                        })}
                                                    </div>

                                                </Card>)
                                        })}
                                    </>
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>




                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default ItemsSheet
