"use client"
import * as React from "react"
import { Button } from "./ui/button"
import { LucideUserPlus2, PlusIcon, User2 } from "lucide-react"
import { useGlobalModal } from "@/hooks/GlobalModal"

export function NewCustomerButton() {
    const modal = useGlobalModal()

    return (
        <Button
            onClick={() => {
                modal.title = "Select Customer Type"
                modal.description = "Please select the type of customer you would like to create"
                modal.children = <div className='flex w-full  gap-2'>
                    <div className='w-1/2'>

                        <Button variant="secondary" className="w-full flex flex-col gap-3 h-40" >
                            <LucideUserPlus2 className='w-8 mr-2' />
                            Create Subscription User</Button>
                    </div>
                    <div className='w-1/2'>
                        <Button variant="secondary" className="w-full flex flex-col gap-3 h-40" >
                            <User2 className='w-8 mr-2' />
                            Create Non Subscription User</Button>
                    </div>


                </div>
                modal.onOpen()
            }
            }
            variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>
    );
}
