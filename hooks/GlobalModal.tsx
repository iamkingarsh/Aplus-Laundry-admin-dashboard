import { create } from 'zustand'

interface useGlobalModalProps {

    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    title: string
    description: string
    children: React.ReactNode

}

export const useGlobalModal = create<useGlobalModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    title: "",
    description: "",
    children: <></>

}))  