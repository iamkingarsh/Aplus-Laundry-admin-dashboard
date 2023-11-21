"use client";

import { Modal } from '@/components/modal'
import { useStoreModal } from '@/hooks/use-store-modal';

export const CreateNewOrderModal = () => {
    const storeModal = useStoreModal()

    return (
        <Modal
            title='Test'
            description='test'
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}>
            New Order
        </Modal>
    )
} 