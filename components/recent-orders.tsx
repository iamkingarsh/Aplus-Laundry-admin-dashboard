import { AllData } from '@/app/(routes)/customers/page'
import { AllOrdersData } from '@/app/(routes)/orders/page'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'



export default function RecentOrders() {
    const Data = AllOrdersData.slice(0, 10)
    const CustomersData = AllData.slice(0, 10)



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
    const completed = Data.filter((data: any) => data.status === 'completed')






    const RecentOrders = appendCustomersData(Data, CustomersData)

    return (
        <div>
            <div className='flex justify-between'>
                <h1 className='text-lg font-semibold'>Overview</h1>
                <div className='flex gap-2'>
                    <div className='flex gap-2'>
                        <div className='flex gap-1'>
                            <p className='text-sm text-gray-500'>Pending</p>
                            <p className='text-sm font-semibold'>{pending?.length}</p>
                        </div>
                        <div className='flex gap-1'>


                            <p className='text-sm text-gray-500'>Processing</p>
                            <p className='text-sm font-semibold'>{processing?.length}</p>
                        </div>
                        <div className='flex gap-1'>

                            <p className='text-sm text-gray-500'>Completed</p>
                            <p className='text-sm font-semibold'>{completed?.length}</p>
                        </div>
                        <div className='flex gap-1'>
                            <p className='text-sm text-gray-500'>Total</p>
                            <p className='text-sm font-semibold'>{Data?.length}</p>

                        </div>
                    </div>
                </div>
            </div>
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
                            <p className='text-sm font-semibold'>{data.status}</p>
                            <p className='text-sm font-semibold'>{data.price}</p>
                        </div>
                    </div>
                )
            })
            }
        </div>
    )
}
