"use client"
import CreateNew from '@/components/create-new'
import { Modal } from '@/components/ui/modal'
import { Modals } from '@/components/modals/CreateOrderModal'
import { RevenueGraph } from '@/components/revenue-graph'
import StatsCard from '@/components/statscard'
import { Card, CardHeader } from '@/components/ui/card'
import Heading from '@/components/ui/heading'
import { IndianRupeeIcon, LucidePlusCircle, PlusIcon, ShoppingBagIcon, Users } from 'lucide-react'


export default function page() {

    const StatsData = [
        {
            title: 'Total Revenue',
            stat: 2300,
            statPrefix: '$',
            icon: <IndianRupeeIcon />,
            desc: '+180.1% from last month'
        },
        {
            title: 'Total Orders',
            stat: 30,
            statPrefix: '+',
            icon: <ShoppingBagIcon />,
            desc: '+180.1% from last month'
        },
        {
            title: 'Total Subscribers',
            stat: 350,
            statPrefix: '+',
            icon: <Users />,
            desc: '+180.1% from last month'
        },
        {
            title: 'Total Subscriber Orders',
            stat: 230,
            statPrefix: '+',
            icon: <ShoppingBagIcon />,
            desc: '+180.1% from last month'
        },
    ]

    return (
        <>
            <div className='w-full space-y-4 h-full flex p-6 flex-col'>
                <div className="topbar w-full flex justify-between">
                    <Heading className='leading-tight' title='Dashboard' />
                    <CreateNew />
                </div>
                <div className='w-full flex gap-2'>
                    {StatsData.map((data, index) => {
                        return (
                            <StatsCard key={index} title={data.title} statPrefix={data.statPrefix} stat={data.stat} icon={data.icon} desc={data.desc} />
                        )
                    })}
                </div>
                <div className='space-y-4'>
                    <Card>
                        <CardHeader>
                            <Heading title='Revenue Graph' />
                        </CardHeader>
                        <RevenueGraph />
                    </Card>
                </div>
            </div>
        </>
    )
}