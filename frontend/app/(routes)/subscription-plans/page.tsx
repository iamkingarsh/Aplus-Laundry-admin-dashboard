
'use client'
import { deleteData, fetchData, postData } from '@/axiosUtility/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGlobalModal } from '@/hooks/GlobalModal';
import { BrandName } from '@/lib/constants';
import { DownloadIcon, Plus, PlusIcon, ServerIcon, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import useRazorpay from 'react-razorpay';
// import { columns } from './components/columns';


export default function Page() {
    const [Razorpay] = useRazorpay();


    const modal = useGlobalModal()
    const [availablePlans, setAvailablePlans] = useState([])

    const getAvailablePlans = async () => {
        try {
            const res = await fetchData('/planPricing/getall')
            const plans = res.data
            setAvailablePlans(plans)
        } catch (error) {

        }
    }

    useEffect(() => {
        getAvailablePlans()
    }, [])

    console.log(availablePlans)

    const handlePayment = async (id: any) => {
        // const data = {
        //     plan_id: id,
        //     quantity: 2,
        //     total_count: 12,

        // }
        // const response = await postData('/razorpaySubscription/createSubscriptionCheckout', data) as any

        // console.log(response, 'teesr')
        // const options = {
        //     key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        //     amount: response?.amount_due, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        //     currency: "INR",
        //     name: BrandName,
        //     description: "Test Transaction",
        //     image: "https://example.com/your_logo",
        //     subscription_id: response?.data?.id,
        //     redirect: true,
        //     recurring: true,
        //     handler: function (response: any) {
        //         // console.log('rajooor pay', response);
        //         // const reply = postData('/order/save', response)
        //         // console.log(reply)
        //         alert(response.razorpay_payment_id);
        //         alert(response.razorpay_order_id);
        //         alert(response.razorpay_signature);
        //         // instance.payments.fetch(paymentId)
        //     },
        //     // prefill: {
        //     //     name: CustomerData?.fullName,
        //     //     email: CustomerData?.email,
        //     //     contact: CustomerData?.mobileNumber,
        //     // },
        //     notes: {
        //         address: "Razorpay Corporate Office",
        //     },
        //     theme: {
        //         color: "#2E3190",
        //         // backdrop_color: "#2E3190"
        //     },
        //     modal: {
        //         ondismiss: function () {
        //             alert("dismissed");
        //         },
        //         animation: "slide",
        //     },
        //     // callback_url: 'https://example.com/your_redirect_url',


        // } as any;

        // const rzp1 = typeof window !== 'undefined' ? new Razorpay(options) : null as any;
        // rzp1?.open()

    }

    const handleDelete = async (id: any) => {
        try {
            const res = await deleteData(`/planPricing/${id}`)
            console.log(res)
            getAvailablePlans()
        } catch (error) {

        }
    }
    const router = useRouter()

    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col' >
            <div className="topbar w-full flex justify-between items-center">
                <div>
                    <Heading className='leading-tight' title='Your Subcription Plans' />
                    <p className='text-muted-foreground text-sm'>Manage your subscription plan here! </p>
                </div>
                <div className='flex gap-2 items-center' >

                    <Button
                        onClick={() => router.push('/subscription-plans/subscribe-user/')}
                        variant='default'>Create Subscription <PlusIcon className='w-4 ml-2' /></Button>
                    <Button
                        onClick={() => router.push('/subscription-plans/create-new/')}
                        variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>
                </div>

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
                        <Card onClick={() => handlePayment(plan.id)} key={index}>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div className='flex flex-col gap-2 w-full'>

                                        <div className='flex flex-col gap-1'>

                                            <Heading className='leading-tight text-xl' title={plan?.name} />
                                            <p className='text-sm'>{plan?.service?.serviceTitle}</p>
                                            <p className='text-sm'>Plan Period: {plan?.periodPlan}</p>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <p className='text-md font-semibold'>Plan Pricing: </p>

                                            <div className="flex gap-2 items-center">
                                                <Badge variant='default' className='text-sm'>Above 12: {
                                                    new Intl.NumberFormat('en-IN', {
                                                        style: 'currency',
                                                        currency: 'INR',
                                                        maximumFractionDigits: 2,
                                                        minimumFractionDigits: 2,
                                                    }).format(plan?.above12?.amount)
                                                }</Badge>
                                                <Badge variant='default' className='text-sm'>Below 12: {
                                                    new Intl.NumberFormat('en-IN', {
                                                        style: 'currency',
                                                        currency: 'INR',
                                                        maximumFractionDigits: 2,
                                                        minimumFractionDigits: 2,
                                                    }).format(plan?.below12?.amount)
                                                }</Badge>

                                            </div>
                                        </div>

                                    </div>

                                    {/* <Trash onClick={() => handleDelete(plan._id)} className='w-4' /> */}
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

