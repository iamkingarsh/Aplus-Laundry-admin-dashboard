import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DownloadIcon, Plus, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
// import { columns } from './components/columns';


export default function page() {






    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col' >
            <div className="topbar w-full flex justify-between items-center">
                <div>
                    <Heading className='leading-tight' title='Your Subcription Plans' />
                    <p className='text-muted-foreground text-sm'>Manage Your Subscription Plans Here! </p>
                </div>

                <Button variant='default'>Create New <Plus className='w-4 ml-2' /></Button>

            </div>

            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">




            </div>
        </div >
    )
}

