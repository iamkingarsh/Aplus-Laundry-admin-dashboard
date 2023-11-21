import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import React from 'react'

export default function page() {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between">
                <div>
                    <Heading className='leading-tight' title='Your Delivery Agents' />
                    <p className='text-muted-foreground text-sm'>Manage Your Delivery Agents</p>
                </div>
            </div>
            <Separator orientation='horizontal' />

        </div>
    )
}
