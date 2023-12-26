"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "../ui/icons"
import { Button } from "../ui/button"
import { useGlobalModal } from "@/hooks/GlobalModal"


interface AlertProps {
    onConfirm: () => void;
}

export const Alert: React.FC<AlertProps> = ({ onConfirm }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const GlobalModal = useGlobalModal()
    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <div className={cn("flex gap-2 justify-end")} >
            <Button onClick={
                () => {
                    GlobalModal.onClose()
                }
            } variant="outline">
                Cancel
            </Button>
            <Button onClick={onConfirm} variant="destructive">
                {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Yes, Delete
            </Button>
        </div>
    )
}