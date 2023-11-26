"use client"
import { AllData } from '@/app/(routes)/customers/page'
import { AllOrdersData } from '@/app/(routes)/orders/page'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { brandColors } from '@/lib/constants'



export default function RecentOrders() {
    //@mujahed bro get the actual data from the dashboard page and pass it here as props as this is a client side component

    const Data = AllOrdersData.slice(0, 6)
    const CustomersData = AllData.slice(0, 6)



    //append customers data in recent orders data
    const appendCustomersData = (Data: any, CustomersData: any) => {
        return Data.map((data: any, index: number) => {
            return {
                ...data,
                name: CustomersData[index].fullname,
                date: CustomersData[index].date,
                profilepic: CustomersData[index].profilepic,
            }
        })
    }

    const pending = Data.filter((data: any) => data.status === 'pending')
    const processing = Data.filter((data: any) => data.status === 'processing')
    const delivered = Data.filter((data: any) => data.status === 'delivered')
    const cancelled = Data.filter((data: any) => data.status === 'cancelled')
    const onway = Data.filter((data: any) => data.status === 'onway')






    const RecentOrders = appendCustomersData(Data, CustomersData)

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-lg font-semibold'>Overview</h1>
                <div className='flex gap-2'>
                    <div className='flex gap-2'>
                        <div className='flex gap-1'>
                            <p className='text-sm text-gray-500'>Pending</p>
                            <p className={`text-sm font-semibold rounded-full px-2 ${brandColors.pending}`}>{pending?.length}</p>
                        </div>
                        <div className='flex gap-1'>


                            <p className='text-sm text-gray-500'>Processing</p>
                            <p className={`text-sm font-semibold rounded-full px-2 ${brandColors.processing}`}>{processing?.length}</p>
                        </div>
                        <div className='flex gap-1'>

                            <p className='text-sm text-gray-500'>Delivered</p>
                            <p className={`text-sm font-semibold rounded-full px-2 ${brandColors.delivered}`}>{delivered?.length}</p>
                        </div>
                        <div className='flex gap-1'>
                            <p className='text-sm text-gray-500'>onway</p>
                            <p className={`text-sm font-semibold rounded-full px-2 ${brandColors.onway}`}>{onway?.length}</p>
                        </div>
                        <div className='flex gap-1'>
                            <p className='text-sm text-gray-500'>Cancelled</p>
                            <p className={`text-sm font-semibold rounded-full px-2 ${brandColors.cancelled}`}>{cancelled?.length}</p>
                        </div>
                        <div className='flex gap-1'>
                            <p className='text-sm text-gray-500'>Total</p>
                            <p className={`text-sm font-semibold rounded-full px-2 ${brandColors.default}`}>{Data?.length}</p>

                        </div>
                    </div>
                </div>
            </div>
            <div>


                {RecentOrders.map((data: any, index: number) => {
                    return (
                        <div key={index} className='w-full flex justify-between my-2 items-center'>
                            <div className='flex gap-2 items-center'>

                                <Avatar className='w-10 h-10 border-2'>
                                    <AvatarImage src={data.profilepic} alt="@shadcn" />
                                    <AvatarFallback> {data.fullname} </AvatarFallback>
                                </Avatar>

                                <div className='flex flex-col'>
                                    <p className='text-sm font-semibold'>{data.name}</p>
                                    <p className='text-xs text-gray-500'>{data.date}</p>
                                </div>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <p className={`text-sm px-2 rounded-full font-semibold ${data.status ===
                                    'pending' ? brandColors.pending : data.status ===
                                        'processing' ? brandColors.processing : data.status ===
                                            'delivered' ? brandColors.delivered : data.status ===
                                                'cancelled' ? brandColors.cancelled : data.status ===
                                                    'onway' ? brandColors.onway : brandColors.default}
                                }`}>{data.status}</p>
                                <p className='text-sm font-semibold'>{data.price}</p>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}
