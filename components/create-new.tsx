import React from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { HomeIcon, LucidePlusCircle, PlusIcon } from 'lucide-react'
import { useNewOrderModal } from '@/hooks/useNewOrderModal';

function CreateNew() {

    const NewOrderModal = useNewOrderModal();
    return (
        <DropdownMenu  >
            <DropdownMenuTrigger asChild>
                <Button variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-48'>
                <DropdownMenuLabel>Create</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => {
                    NewOrderModal.onOpen()
                }}>
                    <LucidePlusCircle className='w-4 mr-2' />

                    New Order

                </DropdownMenuItem>

                <DropdownMenuItem>
                    <LucidePlusCircle className='w-4 mr-2' />
                    New Product
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <LucidePlusCircle className='w-4 mr-2' />
                    New Category
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <LucidePlusCircle className='w-4 mr-2' />
                    New Coupon

                </DropdownMenuItem>


            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CreateNew