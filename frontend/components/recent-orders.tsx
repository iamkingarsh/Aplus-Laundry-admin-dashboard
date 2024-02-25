"use client"
// import { AllData } from '@/app/(routes)/customers/page'
// import { AllOrdersData } from '@/app/(routes)/orders/page'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from './ui/avatar'

interface RecentOrdersProps {
    data: any
}


export default function RecentOrders({ data }: RecentOrdersProps) {
    //@mujahed bro get the actual data from the dashboard page and pass it here as props as this is a client side component

    const Data = data?.slice(0, 6)






    const pending = Data?.filter((data: any) => data.status === 'pending')
    const processing = Data?.filter((data: any) => data.status === 'processing')
    const delivered = Data?.filter((data: any) => data.status === 'delivered')
    const cancelled = Data?.filter((data: any) => data.status === 'cancelled')
    const onway = Data?.filter((data: any) => data.status === 'onway')






    const RecentOrders = [...Data]

    return (
        <div className='flex flex-col gap-2'>
            <div>
                <Table>
                    <TableCaption>A list of your recent Orders.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-left">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            RecentOrders.map((data: any, index: any) => (
                                <TableRow key={index}>
                                    <TableCell> #{data?._id.toUpperCase().slice(0, 7)}</TableCell>
                                    <TableCell>
                                        <div className='flex flex-col  gap-0'>
                                            <span className='font-medium leading-tight'>{data.customer.fullName}</span>
                                            <span className='text-xs text-muted-foreground'>{data.customer.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className='text-sm text-muted-foreground'>
                                        {new Date(data.orderDate).toDateString()}
                                    </TableCell>
                                    <TableCell className="flex items-center justify-start gap-2">

                                        <div className="flex items-center">
                                            <div
                                                className={`w-2 h-2 rounded-full mr-2 ${data.status === "onhold" && "bg-yellow-500"
                                                    } ${data.status === "pending" && "bg-blue-500"
                                                    } ${data.status === "picked" && "bg-green-500"
                                                    } ${data.status === "onway" && "bg-purple-500"
                                                    } ${data.status === "delivered" && "bg-green-500"
                                                    } ${data.status === "cancelled" && "bg-red-500"
                                                    }`}
                                            />
                                            {data.status}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
