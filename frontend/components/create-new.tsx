"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { HomeIcon, LucidePlusCircle, PlusIcon } from 'lucide-react'
import { useGlobalModal } from '@/hooks/GlobalModal';
import { NewOrderForm } from './forms/newOrderForm';
import { NewCustomerForm } from './forms/newCustomerForm';
import { NewCouponsForm } from './forms/newCouponForm'
import checkIfOwner from '@/utils/checkIfOwner'

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
                    GlobalModal.title = "Create New Customer"
                    GlobalModal.description = "Create a new Customer"
                    GlobalModal.children = <NewCustomerForm gap={2} />
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