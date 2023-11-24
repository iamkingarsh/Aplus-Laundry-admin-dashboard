"use client";

import { Modal } from '@/components/ui/modal'
import { useGlobalModal } from '@/hooks/GlobalModal';
import { HeartIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { UserAuthForm } from '../forms/userAuthForm';
import { NewOrderForm } from '../forms/newOrderForm';

export const Modals = () => {
    const GlbalModal = useGlobalModal()

    return (
        <Modal
            title={GlbalModal.title}
            description={GlbalModal.description}
            isOpen={GlbalModal.isOpen}
            onClose={GlbalModal.onClose}
        >

            {GlbalModal.children}

        </Modal>
    )
} 