"use client"
import * as React from "react"
import { Button } from "./ui/button"
import { LucideUserPlus2, PlusIcon, User2 } from "lucide-react"
import { useGlobalModal } from "@/hooks/GlobalModal"
import Link from "next/link"

export function NewCustomerButton() {
    const GlobalModal = useGlobalModal()

    return (
        <Link href='/customers/create-new'>
            <Button variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>
        </Link>
    );
}
