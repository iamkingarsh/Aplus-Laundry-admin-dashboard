
'use client'
import { fetchData } from '@/axiosUtility/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGlobalModal } from '@/hooks/GlobalModal';
import { DownloadIcon, Plus, PlusIcon, ServerIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
// import { columns } from './components/columns';


export default function Page() {


    const modal = useGlobalModal()
    const [availablePlans, setAvailablePlans] = useState([])

    const getAvailablePlans = async () => {
        try {
            const res = await fetchData('/razorpaySubscription/getallPlans')
            const plans = res.plans.items
            setAvailablePlans(plans)

        } catch (error) {

        }
    }

    useEffect(() => {
        getAvailablePlans()
    }

        , [])

    console.log(availablePlans)


    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col' >
            <div className="topbar w-full flex justify-between items-center">
                <div>
                    <Heading className='leading-tight' title='Your Subcription Plans' />
                    <p className='text-muted-foreground text-sm'>Manage Your Subscription Plans Here! </p>
                </div>

                <Button
                    onClick={() => {

                        modal.title = 'Select Service Type'
                        modal.description = 'Please select the type of service you would like to create'
                        modal.children = <div className='flex w-full  gap-2'>
                            <div className='w-1/2'>
                                <Link href='/subscription-plans/create-new/above12'>
                                    <Button
                                        onClick={() => {
                                            modal.onClose()
                                        }
                                        }
                                        variant="secondary" className="w-full flex flex-col gap-3 h-40" >
                                        <ServerIcon className='w-8 mr-2' />
                                        12+ Age Group Plan</Button>
                                </Link>

                            </div>
                            <div className='w-1/2'>
                                <Link href='/subscription-plans/create-new/below12'>
                                    <Button
                                        onClick={() => {
                                            modal.onClose()
                                        }
                                        }
                                        variant="secondary" className="w-full flex flex-col gap-3 h-40" >
                                        <ServerIcon className='w-8 mr-2' />
                                        12- Age Group Plan</Button>
                                </Link>
                            </div>
                        </div>
                        modal.onOpen()


                    }}
                    variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>

            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">

                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <Heading className='leading-tight' title='Available Plans' />
                            <div className="flex gap-2 items-center">
                                <Badge variant='default' className='text-sm'>Total Plans: {availablePlans.length}</Badge>
                            </div>
                        </div>
                    </CardHeader>

                </Card>
                <Separator className='my-6' orientation='horizontal' />
                <div className='grid grid-cols-2 gap-2'>
                    {availablePlans.map((plan: any, index: any) => (
                        <Card key={index}>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <Heading className='leading-tight text-xl' title={plan?.item?.name} />
                                    <div className="flex gap-2 items-center">
                                        <Badge variant='default' className='text-sm'>Plan Amount: {
                                            new Intl.NumberFormat('en-IN', {
                                                style: 'currency',
                                                currency: 'INR',
                                                maximumFractionDigits: 0
                                            }).format(plan?.item?.amount / 100)
                                        }</Badge>

                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>

                            </CardContent>
                        </Card>
                    ))}
                </div>


            </div>
        </div >
    )
}

