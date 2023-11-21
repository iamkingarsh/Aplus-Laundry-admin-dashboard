"use client"

import { Modal } from '@/components/modal'
import { useEffect, useState } from 'react'
import { CreateNewOrderModal } from '../modals/create-new-orderModal'

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <CreateNewOrderModal />
    )
}