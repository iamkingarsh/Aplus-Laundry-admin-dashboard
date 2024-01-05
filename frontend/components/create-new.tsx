"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { HomeIcon, LucidePlusCircle, LucideUserPlus2, PlusIcon, User2 } from 'lucide-react'
import { useGlobalModal } from '@/hooks/GlobalModal';
import { NewOrderForm } from './forms/newOrderForm';
import { NewCustomerForm } from './forms/newCustomerForm';
import { NewCouponsForm } from './forms/newCouponForm'
import checkIfOwner from '@/utils/checkIfOwner'
import Link from 'next/link'

function CreateNew() {
    const isOwner = checkIfOwner()
    const GlobalModal = useGlobalModal();

    return (
        <DropdownMenu  >
            <DropdownMenuTrigger asChild>
                <Button variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-48'>
                <DropdownMenuLabel>Create</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => {
                    GlobalModal.title = "Create New Order"
                    GlobalModal.description = "Create a new order for a customer"
                    GlobalModal.children = <NewOrderForm gap={2} />
                    GlobalModal.onOpen()
                }}>
                    <LucidePlusCircle className='w-4 mr-2' />

                    New Order

                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => {
                    GlobalModal.title = "Select Customer Type"
                    GlobalModal.description = "Please select the type of customer you would like to create"
                    GlobalModal.children = <div className='flex w-full  gap-2'>
                        <div className='w-1/2'>
                            <Link href='/customers/create-new?subscription=true'>
                                <Button
                                    onClick={() => {
                                        GlobalModal.onClose()
                                    }
                                    }
                                    variant="secondary" className="w-full flex flex-col gap-3 h-40" >
                                    <LucideUserPlus2 className='w-8 mr-2' />
                                    Create Subscription User</Button>
                            </Link>

                        </div>
                        <div className='w-1/2'>
                            <Link href='/customers/create-new?subscription=false'>

                                <Button
                                    onClick={() => {
                                        GlobalModal.onClose()
                                    }
                                    }
                                    variant="secondary" className="w-full flex flex-col gap-3 h-40" >
                                    <User2 className='w-8 mr-2' />
                                    Create Non Subscription User</Button>
                            </Link>
                        </div>


                    </div>
                    GlobalModal.onOpen()

                }}>
                    <LucidePlusCircle className='w-4 mr-2' />
                    New Customer
                </DropdownMenuItem>

                {isOwner &&
                    <DropdownMenuItem onSelect={() => {
                        GlobalModal.title = "Create New Coupon"
                        GlobalModal.description = "Create a new Coupon Code "
                        GlobalModal.children = <NewCouponsForm gap={1} />
                        GlobalModal.onOpen()
                    }}>
                        <LucidePlusCircle className='w-4 mr-2' />
                        New Coupon

                    </DropdownMenuItem>}


            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CreateNew