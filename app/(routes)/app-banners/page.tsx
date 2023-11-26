import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between">
                <div>
                    <Heading className='leading-tight' title='App Banners' />
                    <p className='text-muted-foreground text-sm'>Manage Your App Banners Here</p>
                </div>
                <Link href={'/app-banners/create-new'}>
                    <Button variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>
                </Link>
            </div>
            <Separator orientation='horizontal' />


        </div>
    )
}
