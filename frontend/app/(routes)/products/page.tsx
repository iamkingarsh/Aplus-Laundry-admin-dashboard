"use client" // @mujahed change it to "'use server'" when implementing backend if required
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { PlusIcon, } from 'lucide-react'
import React from 'react'
import { columns } from './components/columns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { categories } from '@/lib/constants'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const LaundrtProducts = [
    {
        product_id: 'lp12359asd',
        product_name: 'Shirts',
        value: 'shirts',
        category: 'Women',
        priceperpair: 50,
        status: 'Active'
    },
    {
        product_id: 'lp45678adb',
        product_name: 'TShirts',
        value: 'tshirts',
        category: 'Household',
        priceperpair: 50,
        status: 'Active'
    },
    {
        product_id: 'lp45378asv',
        product_name: 'Trousers',
        value: 'trousers',
        category: 'Men',
        priceperpair: 50,
        status: 'Active'
    },
    {
        product_id: 'lp45325sfe',
        product_name: 'Jeans',
        value: 'jeans',
        category: 'Men',
        priceperpair: 50,
        status: 'Active'
    },
    {
        product_id: 'lp41478adr',
        product_name: 'Shorts',
        value: 'shorts',
        category: 'Men',
        priceperpair: 50,
        status: 'Active'
    },
    {
        product_id: 'lp4238dar',
        product_name: 'Kurtas',
        value: 'kurtas',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp4381ndr',
        product_name: 'Kurtis',
        value: 'kurtis',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp2381nxr',
        product_name: 'Sarees',
        value: 'sarees',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp2881xzr',
        product_name: 'Bedsheets',
        value: 'bedsheets',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp2801xcr',
        product_name: 'Blankets',
        value: 'blankets',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp2841xtr',
        product_name: 'Curtains',
        value: 'curtains',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp2081xsr',
        product_name: 'CushionCovers',
        value: 'cushioncovers',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp2981xzr',
        product_name: 'PillowCovers',
        value: 'pillowcovers',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp2080srx',
        product_name: 'Towels',
        value: 'towels',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp2880srq',
        product_name: 'Masks',
        value: 'masks',
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
                <Link href={'/products/create-new'}>
                    <Button variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>
                </Link>
            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">
                <Tabs defaultValue="All" className="w-full">
                    <TabsList className='gap-3'>
                        <TabsTrigger className='gap-2' value="All">All <Badge className='text-bg-primary-foreground ' variant="outline">{LaundrtProducts.length}</Badge> </TabsTrigger>
                        {categories.map((category, index) => (
                            <TabsTrigger key={index} className='gap-2' value={category.title}>{category.title} <Badge className='text-bg-primary-foreground ' variant="outline">{LaundrtProducts.filter((product: any) => product.category === category.title)
                                ?.length}</Badge> </TabsTrigger>
                        ))}

                    </TabsList>
                    <TabsContent value="All">

                        <DataTable searchKey='product_name' columns={columns} data={LaundrtProducts} />
                    </TabsContent>

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

export { LaundrtProducts }