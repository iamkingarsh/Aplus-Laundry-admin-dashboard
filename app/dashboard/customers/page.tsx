import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { columns } from './components/columns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function page() {
    const data = [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "489e1d42",
            amount: 125,
            status: "processing",
            email: "example@gmail.com",
        },
        // ...
    ];
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between">
                <div>
                    <Heading className='leading-tight' title='Customers' />
                    <p className='text-muted-foreground text-sm'>Manage Your Customers</p>
                </div>
            </div>
            <Separator orientation='horizontal' />
            <div>

            </div>
            <div className="container mx-auto py-10">
                <Tabs defaultValue="account" className="w-full">
                    <TabsList className='gap-3'>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="account">Subscribed</TabsTrigger>
                        <TabsTrigger value="password">Non-subscribed </TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <DataTable columns={columns} data={data} />
                    </TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent>
                </Tabs>

            </div>

        </div>
    )
}
