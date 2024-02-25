"use client"
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { PlusIcon, } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { columns } from './components/columns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { categories } from '@/lib/constants'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { fetchData } from '@/axiosUtility/api'
import GetData from '../categories/Data'

// @mujahed demo data for laundry items
// const LaundrtProducts = [
//     {
//         product_id: 'lp12359asd',
//         product_name: 'Shirts',
//         value: 'shirts',
//         category: 'Women',
//         priceperpair: 50,
//         status: 'Active'
//     },
//     {
//         product_id: 'lp45678adb',
//         product_name: 'TShirts',
//         value: 'tshirts',
//         category: 'Household',
//         priceperpair: 50,
//         status: 'Active'
//     },
//     {
//         product_id: 'lp45378asv',
//         product_name: 'Trousers',
//         value: 'trousers',
//         category: 'Men',
//         priceperpair: 50,
//         status: 'Active'
//     },
//     {
//         product_id: 'lp45325sfe',
//         product_name: 'Jeans',
//         value: 'jeans',
//         category: 'Men',
//         priceperpair: 50,
//         status: 'Active'
//     },
//     {
//         product_id: 'lp41478adr',
//         product_name: 'Shorts',
//         value: 'shorts',
//         category: 'Men',
//         priceperpair: 50,
//         status: 'Active'
//     },
//     {
//         product_id: 'lp4238dar',
//         product_name: 'Kurtas',
//         value: 'kurtas',
//         priceperpair: 50,
//         category: 'Men',
//         status: 'Active'
//     },
//     {
//         product_id: 'lp4381ndr',
//         product_name: 'Kurtis',
//         value: 'kurtis',
//         priceperpair: 50,
//         category: 'Men',
//         status: 'Active'
//     },
//     {
//         product_id: 'lp2381nxr',
//         product_name: 'Sarees',
//         value: 'sarees',
//         priceperpair: 50,
//         category: 'Men',
//         status: 'Active'
//     },
//     {
//         product_id: 'lp2881xzr',
//         product_name: 'Bedsheets',
//         value: 'bedsheets',
//         priceperpair: 50,
//         category: 'Men',
//         status: 'Active'
//     },
//     {
//         product_id: 'lp2801xcr',
//         product_name: 'Blankets',
//         value: 'blankets',
//         priceperpair: 50,
//         category: 'Men',
//         status: 'Active'
//     },
//     {
//         product_id: 'lp2841xtr',
//         product_name: 'Curtains',
//         value: 'curtains',
//         priceperpair: 50,
//         category: 'Men',
//         status: 'Active'
//     },
//     {
//         product_id: 'lp2081xsr',
//         product_name: 'CushionCovers',
//         value: 'cushioncovers',
//         priceperpair: 50,
//         category: 'Men',
//         status: 'Active'
//     },
//     {
//         product_id: 'lp2981xzr',
//         product_name: 'PillowCovers',
//         value: 'pillowcovers',
//         priceperpair: 50,
//         category: 'Men',
//         status: 'Active'
//     },
//     {
//         product_id: 'lp2080srx',
//         product_name: 'Towels',
//         value: 'towels',
//         priceperpair: 50,
//         category: 'Men',
//         status: 'Active'
//     },
//     {
//         product_id: 'lp2880srq',
//         product_name: 'Masks',
//         value: 'masks',
//         priceperpair: 50,
//         category: 'Men',
//         status: 'Active'
//     },


// ] as any





export default function Page() {
    const [categories, setCategories] = useState([])
    const [LaundryProducts, setLaundryProducts] = useState([]) as any[]
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        setLoading(true)
        try {
            const result = await fetchData('/product/getall'); // Replace 'your-endpoint' with the actual API endpoint
            console.log(result)
            if (result && result.products) {
                const products = result.products;
                setLaundryProducts(products);
                setLoading(false)
                console.log('products', products)

                // Now you can work with the 'categories' array
            } else {
                console.error('Response format is not as expected');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const getCategoriesData = async () => {
        setLoading(true)
        try {
            const result = await fetchData('/category/all'); // Replace 'your-endpoint' with the actual API endpoint

            if (result && result.categories) {
                const categories = result.categories;
                setCategories(categories);
                setLoading(false)
                // Now you can work with the 'categories' array
            } else {
                console.error('Response format is not as expected');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getData()
        getCategoriesData()
        console.log('categories', categories)

        // const categories = GetData().then((res) => { return res }) as any
        // setCategories(categories)

    }, [])

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
                        <TabsTrigger className='gap-2' value="All">All <Badge className='text-bg-primary-foreground ' variant="outline">{LaundryProducts.length}</Badge> </TabsTrigger>
                        {categories?.map((category: any, index) => (
                            <TabsTrigger key={index} className='gap-2' value={category?.title}>{category?.title} <Badge className='text-bg-primary-foreground ' variant="outline">{LaundryProducts.filter((product: any) => product.category.title === category.title)
                                ?.length}</Badge> </TabsTrigger>
                        ))}

                    </TabsList>
                    <TabsContent value="All">

                        <DataTable
                            bulkDeleteIdName='_id'
                            bulkDeleteTitle='Are you sure you want to delete the selected items?'
                            bulkDeleteDescription='This will delete the selected items, and they will not be recoverable.'
                            deleteRoute="/product/ids"
                            bulkDeleteToastMessage='Selected items deleted successfully'
                            searchKey='product_name' columns={columns} data={LaundryProducts} />
                    </TabsContent>

                    {categories.map((category: any, index) => (
                        <TabsContent key={index} value={category.title}>
                            <DataTable
                                bulkDeleteIdName='_id'
                                bulkDeleteTitle='Are you sure you want to delete the selected items?'
                                bulkDeleteDescription='This will delete the selected items, and they will not be recoverable.'
                                // apiRouteForBulkDelete='/api/products/bulk-delete'
                                deleteRoute="/product/ids"
                                bulkDeleteToastMessage='Selected items deleted successfully'
                                searchKey='product_name' columns={columns} data={
                                    LaundryProducts.filter((product: any) => product.category._id === category._id)
                                } />
                        </TabsContent>
                    ))}


                </Tabs>

            </div>

        </div>
    )
}

// export { LaundryProducts }