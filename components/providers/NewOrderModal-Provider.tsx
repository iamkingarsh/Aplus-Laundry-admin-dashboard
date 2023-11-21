"use client"

import { Modal } from '@/components/ui/modal'
import { useEffect, useState } from 'react'
import { Modals } from '../modals/CreateOrderModal'

export const NewOrderModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <Modals />
    )
}