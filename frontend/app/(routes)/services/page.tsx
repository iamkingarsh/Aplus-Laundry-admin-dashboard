"use client"
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { PlusIcon, ServerIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { columns } from './components/columns'
// import { Services } from '@/lib/constants'
import { fetchData } from '@/axiosUtility/api'

export default function Page() {
    const [Services, setServices] = useState([])

    const getData = async () => {
        // setLoading(true)
        try {
            const result = await fetchData('/service/allwithitems'); // Replace 'your-endpoint' with the actual API endpoint
            console.log(result.services, 'result')

            const transformedData = result?.services.map((service: any) => {
                return {
                    service_id: service._id, // Replace with your actual logic to generate service_id
                    title: service.serviceTitle,
                    servicestatus: 'Active', // You may need to determine the service status based on your business logic
                    laundry_items: {
                        laundryByKG: {
                            active: service.laundryByKG.active,
                            price: service.laundryByKG.price,
                            items: service.laundryByKG.items.map((item: any) => ({ item })),
                        },
                        laundryPerPair: {
                            active: service.laundryPerPair.active,
                            items: service.laundryPerPair.items.map((item: any) => ({ item })),
                        },
                    },
                    laundrybykg: service.laundryByKG.active ? 'Active' : 'Deactive',
                    laundrybykgprice: service.laundryByKG.price,
                    laundryperpair: service.laundryPerPair.active ? 'Active' : 'Deactive',
                    icon: <ServerIcon className="w-3 mr-2" />,
                };
            });

            console.log(transformedData, 'transformedData');
            setServices(transformedData)

            // if (result && result.products) {
            //     const products = result.products;
            //     // setLaundryProducts(products);
            //     // setLoading(false)
            //     console.log('products', products)

            //     // Now you can work with the 'categories' array
            // } else {
            //     console.error('Response format is not as expected');
            // }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col '>
            <div className="topbar w-full flex justify-between items-center">
                <div>
                    <Heading className='leading-tight' title='Services' />
                    <p className='text-muted-foreground text-sm'>Manage Your Services</p>
                </div>
                <Link href={'/services/create-new'}>
                    <Button variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>
                </Link>
            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">
                <DataTable
                    deleteRoute='/service/ids'
                    bulkDeleteIdName='service_id'
                    bulkDeleteTitle='Are you sure you want to delete the selected services?'
                    bulkDeleteDescription='This will delete the selected services, and they will not be recoverable.'
                    bulkDeleteToastMessage='Selected services deleted successfully'
                    searchKey='title' columns={columns} data={Services as any} />
            </div>
        </div>
    )
}
