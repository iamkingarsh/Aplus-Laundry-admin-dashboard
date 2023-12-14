
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { columns } from './components/columns'
import { Services } from '@/lib/constants'

export default function page() {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col '>
            <div className="topbar w-full flex justify-between items-center">
                <div>
                    <Heading className='leading-tight' title='Services' />
                    <p className='text-muted-foreground text-sm'>Manage Your Services</p>
                </div>
                <Link href={'/services/create-new'}>
                    <Button variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>
                </Link>
            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">
                <DataTable searchKey='coupon_code' columns={columns} data={Services as any} />
            </div>
        </div>
    )
}
