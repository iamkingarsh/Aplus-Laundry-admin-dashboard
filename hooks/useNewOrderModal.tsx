import { create } from 'zustand'

interface createNewOrderModalProps {

    isOpen: boolean
    onOpen: () => void
    onClose: () => void

}

export const useNewOrderModal = create<createNewOrderModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),

}))  