"use client" // @mujahed change it to "'use server'" when implementing backend if required
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { ServerIcon } from 'lucide-react'
import React from 'react'
import { columns } from './components/columns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { categories } from '@/lib/constants'

const LaundrtProducts = [
    {
        product_id: '1',
        product_name: 'Shirts',
        value: 'shirts',
        icon: <ServerIcon className="w-3 mr-2" />,
        priceperpair: 50,
        category: 'Women',

        status: 'Active'
    },
    {
        product_id: '2',
        product_name: 'TShirts',
        value: 'tshirts',
        icon: <ServerIcon className="w-3 mr-2" />,
        priceperpair: 50,
        category: 'Men',

        status: 'Active'
    },
    {
        product_id: '3',
        product_name: 'Trousers',
        value: 'trousers',
        icon: <ServerIcon className="w-3 mr-2" />,
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: '4',
        product_name: 'Jeans',
        value: 'jeans',
        category: 'Men',

        icon: <ServerIcon className="w-3 mr-2" />,
        priceperpair: 50,
        status: 'Active'
    },
    {
        product_id: '5',
        product_name: 'Shorts',
        value: 'shorts',
        category: 'Men',

        icon: <ServerIcon className="w-3 mr-2" />,
        priceperpair: 50,
        status: 'Active'
    },
    {
        product_id: '6',
        product_name: 'Kurtas',
        value: 'kurtas',
        icon: <ServerIcon className="w-3 mr-2" />,
        priceperpair: 50,
        category: 'Men',

        status: 'Active'
    },
    {
        product_id: '7',
        product_name: 'Kurtis',
        value: 'kurtis',
        icon: <ServerIcon className="w-3 mr-2" />,
        priceperpair: 50,
        category: 'Men',

        status: 'Active'
    },
    {
        product_id: '8',
        product_name: 'Sarees',
        value: 'sarees',
        icon: <ServerIcon className="w-3 mr-2" />,
        priceperpair: 50,
        category: 'Men',

        status: 'Active'
    },
    {
        product_id: '9',
        product_name: 'Bedsheets',
        value: 'bedsheets',
        icon: <ServerIcon className="w-3 mr-2" />,
        priceperpair: 50,
        category: 'Men',

        status: 'Active'
    },
    {
        product_id: '9',

        product_name: 'Blankets',
        value: 'blankets',
        icon: <ServerIcon className="w-3 mr-2" />,
        priceperpair: 50,
        category: 'Men',

        status: 'Active'
    },
    {
        product_id: '10',
        product_name: 'Curtains',
        value: 'curtains',
        icon: <ServerIcon className="w-3 mr-2" />,
        priceperpair: 50,
        category: 'Men',

        status: 'Active'
    },
    {
        product_id: '11',
        product_name: 'CushionCovers',
        value: 'cushioncovers',
        icon: <ServerIcon className="w-3 mr-2" />,
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: '12',
        product_name: 'PillowCovers',
        value: 'pillowcovers',
        icon: <ServerIcon className="w-3 mr-2" />,
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: '13',
        product_name: 'Towels',
        value: 'towels',
        icon: <ServerIcon className="w-3 mr-2" />,
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: '14',
        product_name: 'Masks',
        value: 'masks',
        icon: <ServerIcon className="w-3 mr-2" />,
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },


] as any



export default function page() {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between items-center">
                <div>
                    <Heading className='leading-tight' title='Laundry Items' />
                    <p className='text-muted-foreground text-sm'>Manage Laundry Items</p>
                </div>
            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className='gap-3'>
                        {categories.map((category, index) => (
                            <TabsTrigger key={index} className='gap-2' value={category.title}>{category.title} <Badge className='text-bg-primary-foreground ' variant="outline">{LaundrtProducts.filter((product: any) => product.category === category.title)
                                ?.length}</Badge> </TabsTrigger>
                        ))}

                    </TabsList>
                    {categories.map((category, index) => (
                        <TabsContent key={index} value={category.title}>
                            <DataTable searchKey='product_name' columns={columns} data={
                                LaundrtProducts.filter((product: any) => product.category === category.title)
                            } />
                        </TabsContent>
                    ))}


                </Tabs>

            </div>

        </div>
    )
}
