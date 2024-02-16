"use client"
import CreateNew from '@/components/create-new'
import { RevenueGraph } from '@/components/revenue-graph'
import StatsCard from '@/components/statscard'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Heading from '@/components/ui/heading'
import { IndianRupeeIcon, ShoppingBagIcon, Users } from 'lucide-react'
import RecentOrders from '@/components/recent-orders'
// import { DatePickerWithRange } from '@/components/date-range.d'
import checkIfOwner from '@/utils/checkIfOwner'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchData } from '@/axiosUtility/api'
import { DatePickerWithRange } from '@/components/date-range'



export default function Page() {


    const isOwner = checkIfOwner()

    const [ordersData, setOrdersData] = useState([]) as any[]
    const [totalRevenue, setTotalRevenue] = useState(0) as any[]
    const [totalSubscriptionRevenue, setTotalSubscriptionRevenue] = useState(0) as any[]
    const [totalSubscribers, setTotalSubscribers] = useState(0) as any[]
    const [totalSubscriberOrders, setTotalSubscriberOrders] = useState(0) as any[]
    const getOrdersData = async () => {
        const response = await fetchData('/order/getall')

        setOrdersData(response.orders)
    }

    const getTotalRevenue = async () => {
        const response = await fetchData('/transaction/getall')
        const transactions = response.transactions
        const totalRevenue = transactions.reduce((acc: any, transaction: any) => {
            return acc + transaction.amount
        }, 0)
        setTotalRevenue(totalRevenue)

        // setOrdersData(response.orders)
    }

    const getTotalSubscriptionRevenue = async () => {
        const response = await fetchData('/subscription/transactions')
        const transactions = response.transactions
        const totalRevenue = transactions.reduce((acc: any, transaction: any) => {
            return acc + transaction.amount
        }, 0)
        setTotalSubscriptionRevenue(totalRevenue)

        // setOrdersData(response.orders)
    }

    const getTotalSubscribers = async () => {
        const response = await fetchData('/auth/getallcustomers')

        const customers = response
        const totalSubscribedCustomers = customers?.filter((customer: any) => customer.customerType === 'subscriber').length

        setTotalSubscribers(totalSubscribedCustomers)
    }

    const getTotalSubscriberOrders = async () => {
        const response = await fetchData('/subscription/orders')
        const orders = response.data
        console.log('orders', orders)
        const totalSubscriberOrders = orders.length
        setTotalSubscriberOrders(totalSubscriberOrders)
    }

    useEffect(() => {
        getOrdersData()
        getTotalRevenue()
        getTotalSubscriptionRevenue()
        getTotalSubscribers()
        getTotalSubscriberOrders()
    }, [])

    const StatsData = [
        {
            title: 'Total Revenue',
            stat: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalRevenue / 100 + totalSubscriptionRevenue / 100),
            // statPrefix: '₹',
            icon: <IndianRupeeIcon />,
            desc: '+180.1% from last month',
            href: '/revenue'
        },
        {
            title: 'Total Orders',
            stat: ordersData?.length,
            statPrefix: '+',
            icon: <ShoppingBagIcon />,
            desc: '+180.1% from last month',
            href: '/orders'
        },
        {
            title: 'Total Subscribers',
            stat: totalSubscribers,
            statPrefix: '+',
            icon: <Users />,
            desc: '+180.1% from last month',
            href: '/customers'
        },
        {
            title: 'Total Subscriber Orders',
            stat: totalSubscriberOrders,
            statPrefix: '+',
            icon: <ShoppingBagIcon />,
            desc: '+180.1% from last month',
            href: '/customers'
        },
    ]


    const StatsDataForManger = [
        //remove revenue 
        ...StatsData.filter((data) => data.title !== 'Total Revenue')
    ]

    return (
        <>
            <div className='w-full space-y-4 h-full flex p-6 flex-col'>
                <div className="topbar w-full flex justify-between">
                    <Heading className='leading-tight' title='Dashboard' />
                    <div className='flex gap-2'>
                        <DatePickerWithRange />
                        <CreateNew />
                    </div>
                </div>
                <div className='w-full flex gap-2'>
                    {
                        isOwner &&

                        StatsData.map((data, index) => {
                            return (
                                <StatsCard key={index} title={data.title} statPrefix={data.statPrefix} stat={data.stat} icon={data.icon} href={data.href} desc={data.desc} />
                            )
                        })}
                    {
                        !isOwner &&
                        StatsDataForManger.map((data, index) => {
                            return (
                                <StatsCard key={index} title={data.title} statPrefix={data.statPrefix} stat={data.stat} icon={data.icon} href={data.href} desc={data.desc} />
                            )
                        })
                    }
                </div>
                <div className='space-x-2 flex'>
                    {
                        isOwner &&
                        <Card className='w-full'>
                            <CardHeader>
                                <div className='flex flex-col gap-0'>
                                    <Heading className='text-xl' title='Overview' />
                                    <p className='text-muted-foreground text-sm'>You Made ₹ 2300 in the last 30 days</p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <RevenueGraph />

                            </CardContent>
                        </Card>
                    }
                    <Card className='w-full'>
                        <CardHeader >
                            <div className='flex gap-0 justify-between items-center'>
                                <div className='flex flex-col gap-0'>
                                    <Heading className='text-xl' title='Recent Orders' />
                                    <p className='text-muted-foreground text-sm'>You Made 30 Orders in the last 30 days</p>
                                </div>
                                <Link href="/orders">
                                    <Button variant='link'>View All</Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <RecentOrders data={ordersData} />

                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
