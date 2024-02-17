"use client"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { columns } from './components/columns';
import { fetchData } from '@/axiosUtility/api';
import { get } from 'http';
import { OrdersStatuses } from '@/lib/constants';


export default function Page() {
    const [allOrdersData, setAllOrdersData] = useState([]) as any

    const [subscriberOrders, setSubscriberOrders] = useState([]) as any
    const [loading, setLoading] = useState(false)



    const getAllOrdersData = async () => {
        setLoading(true)
        const response = await fetchData('/order/getall')
        console.log('ytseyshdhs', response)
        setAllOrdersData(response.orders)
        setLoading(false)
    }

    // const getSubscriberOrders = async () => {
    //     setLoading(true)
    //     const response = await fetchData('/order/getall')
    //     console.log('ytseyshdhs', response)
    //     setSubscriberOrders(response.orders)
    //     setLoading(false)
    // }

    const getSubscriberOrders = async () => {
        setLoading(true)
        const response = await fetchData('/subscription/orders')
        const orders = response.orders
        setSubscriberOrders(orders)
        setLoading(false)
    }

    useEffect(() => {
        getAllOrdersData()
        getSubscriberOrders()
    }, [])

    const OnHoldOrderData = [
        ...allOrdersData?.filter((item: any) => item.status === 'onhold')
    ] as any[]
    const PendingOrderData = [
        ...allOrdersData?.filter((item: any) => item.status === 'pending')
    ] as any[]
    const PickedOrderData = [
        ...allOrdersData?.filter((item: any) => item.status === 'picked')
    ] as any[]
    const DeliveredOrderData = [
        ...allOrdersData?.filter((item: any) => item.status === 'delivered')
    ] as any[]
    const CancelledOrderData = [
        ...allOrdersData?.filter((item: any) => item.status === 'cancelled')
    ] as any[]
    const OnWayOrderData = [
        ...allOrdersData?.filter((item: any) => item.status === 'onway')
    ] as any[]



    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col' >
            <div className="topbar w-full flex justify-between items-center">
                <div>
                    <Heading className='leading-tight' title='All Orders' />
                    <p className='text-muted-foreground text-sm'>Manage Your Orders</p>
                </div>
                <Link href={'/orders/create-new'}>
                    <Button variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>
                </Link>
            </div>

            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className='gap-3'>
                        <TabsTrigger className='gap-2' value="all">All <Badge className='text-bg-primary-foreground ' variant="outline">{allOrdersData?.length}</Badge> </TabsTrigger>
                        <TabsTrigger className='gap-2' value="subscribed">Subscribed <Badge className='text-bg-primary-foreground' variant="outline">{subscriberOrders?.length}</Badge> </TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className='gap-3'>
                                <TabsTrigger className='gap-2' value="all">All <Badge className='text-bg-primary-foreground ' variant="outline">{allOrdersData?.length}</Badge> </TabsTrigger>
                                {OrdersStatuses.map((status, index) => {
                                    return (
                                        <TabsTrigger key={index} className='gap-2' value={status.title}>{status.title} <Badge className='text-bg-primary-foreground ' variant="outline">{allOrdersData?.filter((item: any) => item.status === status.title).length}</Badge> </TabsTrigger>
                                    )
                                })}
                            </TabsList>
                            <TabsContent value="all">
                                <DataTable
                                    bulkDeleteIdName='order_id'
                                    bulkDeleteTitle='Are you sure you want to delete the selected orders?'
                                    bulkDeleteDescription='This will delete the selected orders, and they will not be recoverable.'

                                    bulkDeleteToastMessage='Selected orders deleted successfully'
                                    searchKey='customer_name' columns={columns} data={allOrdersData} />
                            </TabsContent>
                            {OrdersStatuses.map((status, index) => {
                                return (
                                    <TabsContent key={index} value={status.title}>
                                        <DataTable
                                            bulkDeleteIdName='order_id'
                                            bulkDeleteTitle='Are you sure you want to delete the selected orders?'
                                            bulkDeleteDescription='This will delete the selected orders, and they will not be recoverable.'

                                            bulkDeleteToastMessage='Selected orders deleted successfully'
                                            searchKey='customer_name' columns={columns} data={allOrdersData?.filter((item: any) => item.status === status.title)} />
                                    </TabsContent>
                                )
                            })
                            }
                        </Tabs>
                    </TabsContent>
                    <TabsContent value="subscribed">
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className='gap-3'>
                                <TabsTrigger className='gap-2' value="all">All <Badge className='text-bg-primary-foreground ' variant="outline">{allOrdersData?.length}</Badge> </TabsTrigger>
                                {OrdersStatuses.map((status, index) => {
                                    return (
                                        <TabsTrigger key={index} className='gap-2' value={status.title}>{status.title} <Badge className='text-bg-primary-foreground ' variant="outline">{subscriberOrders?.filter((item: any) => item.status === status.title).length}</Badge> </TabsTrigger>
                                    )
                                })}
                            </TabsList>
                            <TabsContent value="all">
                                <DataTable
                                    bulkDeleteIdName='order_id'
                                    bulkDeleteTitle='Are you sure you want to delete the selected orders?'
                                    bulkDeleteDescription='This will delete the selected orders, and they will not be recoverable.'

                                    bulkDeleteToastMessage='Selected orders deleted successfully'
                                    searchKey='customer_name' columns={columns} data={allOrdersData} />
                            </TabsContent>
                            <TabsContent value="on-hold">
                                <DataTable
                                    bulkDeleteIdName='order_id'
                                    bulkDeleteTitle='Are you sure you want to delete the selected orders?'
                                    bulkDeleteDescription='This will delete the selected orders, and they will not be recoverable.'

                                    bulkDeleteToastMessage='Selected orders deleted successfully'
                                    searchKey='customer_name' columns={columns} data={OnHoldOrderData} />
                            </TabsContent>
                            <TabsContent value="pending">
                                <DataTable
                                    bulkDeleteIdName='order_id'
                                    bulkDeleteTitle='Are you sure you want to delete the selected orders?'
                                    bulkDeleteDescription='This will delete the selected orders, and they will not be recoverable.'

                                    bulkDeleteToastMessage='Selected orders deleted successfully'
                                    searchKey='customer_name' columns={columns} data={PendingOrderData} />
                            </TabsContent>
                            <TabsContent value="picked">
                                <DataTable
                                    bulkDeleteIdName='order_id'
                                    bulkDeleteTitle='Are you sure you want to delete the selected orders?'
                                    bulkDeleteDescription='This will delete the selected orders, and they will not be recoverable.'

                                    bulkDeleteToastMessage='Selected orders deleted successfully'
                                    searchKey='customer_name' columns={columns} data={PickedOrderData} />
                            </TabsContent>
                            <TabsContent value="onway">
                                <DataTable
                                    bulkDeleteIdName='order_id'
                                    bulkDeleteTitle='Are you sure you want to delete the selected orders?'
                                    bulkDeleteDescription='This will delete the selected orders, and they will not be recoverable.'

                                    bulkDeleteToastMessage='Selected orders deleted successfully'
                                    searchKey='customer_name' columns={columns} data={OnWayOrderData} />
                            </TabsContent>
                            <TabsContent value="delivered">
                                <DataTable
                                    bulkDeleteIdName='order_id'
                                    bulkDeleteTitle='Are you sure you want to delete the selected orders?'
                                    bulkDeleteDescription='This will delete the selected orders, and they will not be recoverable.'

                                    bulkDeleteToastMessage='Selected orders deleted successfully'
                                    searchKey='customer_name' columns={columns} data={DeliveredOrderData} />
                            </TabsContent>
                            <TabsContent value="cancelled">
                                <DataTable
                                    bulkDeleteIdName='order_id'
                                    bulkDeleteTitle='Are you sure you want to delete the selected orders?'
                                    bulkDeleteDescription='This will delete the selected orders, and they will not be recoverable.'

                                    bulkDeleteToastMessage='Selected orders deleted successfully'
                                    searchKey='customer_name' columns={columns} data={CancelledOrderData} />
                            </TabsContent>
                        </Tabs>
                    </TabsContent>
                </Tabs>



            </div>
        </div >
    )
}

