
'use client'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGlobalModal } from '@/hooks/GlobalModal';
import { DownloadIcon, Plus, PlusIcon, ServerIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
// import { columns } from './components/columns';


export default function Page() {


    const modal = useGlobalModal()



    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col' >
            <div className="topbar w-full flex justify-between items-center">
                <div>
                    <Heading className='leading-tight' title='Your Subcription Plans' />
                    <p className='text-muted-foreground text-sm'>Manage Your Subscription Plans Here! </p>
                </div>

                <Button
                    onClick={() => {

                        modal.title = 'Select Service Type'
                        modal.description = 'Please select the type of service you would like to create'
                        modal.children = <div className='flex w-full  gap-2'>
                            <div className='w-1/2'>
                                <Link href='/services/create-new?subscription=true'>
                                    <Button
                                        onClick={() => {
                                            modal.onClose()
                                        }
                                        }
                                        variant="secondary" className="w-full flex flex-col gap-3 h-40" >
                                        <ServerIcon className='w-8 mr-2' />
                                        12+ Age Group Plan</Button>
                                </Link>

                            </div>
                            <div className='w-1/2'>
                                <Link href='/services/create-new?subscription=false'>

                                    <Button
                                        onClick={() => {
                                            modal.onClose()
                                        }
                                        }
                                        variant="secondary" className="w-full flex flex-col gap-3 h-40" >
                                        <ServerIcon className='w-8 mr-2' />
                                        12- Age Group Plan</Button>
                                </Link>
                            </div>
                        </div>
                        modal.onOpen()


                    }}
                    variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>

            </div>

            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">




            </div>
        </div >
    )
}

