"use client"
import * as React from "react"
import { Button } from "./ui/button"
import { LucideUserPlus2, PlusIcon, User2 } from "lucide-react"
import { useGlobalModal } from "@/hooks/GlobalModal"
import Link from "next/link"

export function NewCustomerButton() {
    const GlobalModal = useGlobalModal()

    return (
        <Button
            onClick={() => {
                GlobalModal.title = "Select Customer Type"
                GlobalModal.description = "Please select the type of customer you would like to create"
                GlobalModal.children = <div className='flex w-full  gap-2'>
                    <div className='w-1/2'>
                        <Link href='/customers/create-new?subscription=true'>
                            <Button
                                onClick={() => {
                                    GlobalModal.onClose()
                                }
                                }
                                variant="secondary" className="w-full flex flex-col gap-3 h-40" >
                                <LucideUserPlus2 className='w-8 mr-2' />
                                Create Subscription User</Button>
                        </Link>

                    </div>
                    <div className='w-1/2'>
                        <Link href='/customers/create-new?subscription=false'>

                            <Button
                                onClick={() => {
                                    GlobalModal.onClose()
                                }
                                }
                                variant="secondary" className="w-full flex flex-col gap-3 h-40" >
                                <User2 className='w-8 mr-2' />
                                Create Non Subscription User</Button>
                        </Link>
                    </div>


                </div>
                GlobalModal.onOpen()
            }
            }
            variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>
    );
}
