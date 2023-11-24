"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "../ui/icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface newOrderFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function NewOrderForm({ className, ...props }: newOrderFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>

        </div>
    )
}