"use client";

import { Modal } from '@/components/ui/modal'
import { useNewOrderModal } from '@/hooks/useNewOrderModal';
import { HeartIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { UserAuthForm } from '../forms/user-auth-form';
import { NewOrderForm } from '../forms/newOrderForm';

export const Modals = () => {
    const newOrderModal = useNewOrderModal()

    return (
        <Modal
            title="Create New Order"
            description="Create a new order for a customer"
            isOpen={newOrderModal.isOpen}
            onClose={newOrderModal.onClose}
        >

            <NewOrderForm />

        </Modal>
    )
} 