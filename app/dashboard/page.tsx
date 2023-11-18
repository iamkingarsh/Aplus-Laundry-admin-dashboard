import { Sidebar } from '@/components/sidebar'
import Heading from '@/components/ui/heading'
import React from 'react'

export default function page() {

    return (
        <div className='w-full h-full flex p-6 flex-row'>
            <div>
                <Heading title='Dashboard' />
            </div>
        </div>
    )
}
