"use client";

import { Modal } from '@/components/modal'
import { useStoreModal } from '@/hooks/use-store-modal';

export const CreateNewOrderModal = () => {
    const storeModal = useStoreModal()

    return (
        <Modal
            title='Create New Order'
            description='Create a new order for a customer.'
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}>
            Future Create New Order Form
        </Modal>
    )
} 