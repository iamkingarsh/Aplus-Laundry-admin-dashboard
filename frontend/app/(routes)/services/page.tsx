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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { tr } from 'date-fns/locale'
import { useGlobalModal } from '@/hooks/GlobalModal'

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
                    isSubscriptionService: service?.isSubscriptionService
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
    const modal = useGlobalModal()

    const subscribed = Services?.filter((service: any) => service.isSubscriptionService === true)

    const nonsubscribed = Services?.filter((service: any) => service.isSubscriptionService === false || service.isSubscriptionService === undefined)

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

                <Button
                    onClick={() => {

                        modal.title = 'Select Service Type'
                        modal.description = 'Please select the type of service you would like to create'
                        modal.children = <div className='flex w-full  gap-2'>
                            <div className='w-1/2'>
                                <Link href='/services/create-new?subscription=true'>
                                    <Button
                                        onClick={() => {
                                            modal.onClose()
                                        }
                                        }
                                        variant="secondary" className="w-full flex flex-col gap-3 h-40" >
                                        <ServerIcon className='w-8 mr-2' />
                                        Create Subscription Service</Button>
                                </Link>

                            </div>
                            <div className='w-1/2'>
                                <Link href='/services/create-new?subscription=false'>

                                    <Button
                                        onClick={() => {
                                            modal.onClose()
                                        }
                                        }
                                        variant="secondary" className="w-full flex flex-col gap-3 h-40" >
                                        <ServerIcon className='w-8 mr-2' />
                                        Create Non Subscription Service</Button>
                                </Link>
                            </div>
                        </div>
                        modal.onOpen()


                    }}
                    variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>

            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className='gap-3'>
                        <TabsTrigger className='gap-2' value="all">All <Badge className='text-bg-primary-foreground ' variant="outline">{Services?.length}</Badge> </TabsTrigger>
                        <TabsTrigger className='gap-2' value="subscribed">Subscription Services <Badge className='text-bg-primary-foreground' variant="outline"> {subscribed?.length}</Badge></TabsTrigger>
                        <TabsTrigger className='gap-2' value="non-subscribed">Regular Services <Badge className='text-bg-primary-foreground' variant="outline">{nonsubscribed?.length}</Badge> </TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <DataTable
                            bulkDeleteIdName='id'
                            bulkDeleteTitle='Are you sure you want to delete these customers?'
                            bulkDeleteDescription='This will delete the selected customers, and they will not be recoverable.'

                            bulkDeleteToastMessage='Selected Customers Deleted Successfully'
                            searchKey='email' columns={columns} data={Services} />
                    </TabsContent>
                    <TabsContent value="subscribed">
                        <DataTable
                            deleteRoute='/service/ids'
                            bulkDeleteIdName='service_id'
                            bulkDeleteTitle='Are you sure you want to delete the selected services?'
                            bulkDeleteDescription='This will delete the selected services, and they will not be recoverable.'
                            bulkDeleteToastMessage='Selected services deleted successfully'
                            searchKey='title' columns={columns} data={subscribed as any} />
                    </TabsContent>
                    <TabsContent value="non-subscribed">
                        <DataTable
                            deleteRoute='/service/ids'
                            bulkDeleteIdName='service_id'
                            bulkDeleteTitle='Are you sure you want to delete the selected services?'
                            bulkDeleteDescription='This will delete the selected services, and they will not be recoverable.'
                            bulkDeleteToastMessage='Selected services deleted successfully'
                            searchKey='title' columns={columns} data={nonsubscribed as any} />
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    )
}
