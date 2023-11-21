import { useStoreModal } from '@/hooks/use-store-modal';
import { HomeIcon } from 'lucide-react';
import React from 'react'

function NewOrderModal() {
    const storeModal = useStoreModal();
    storeModal.onOpen = () => storeModal.onOpen
    storeModal.title = 'Create New Order'
    return (

        <>
            {storeModal.description = 'Create a new order'}
            {storeModal.children = <HomeIcon />}

        </>
    )
}

export default NewOrderModal