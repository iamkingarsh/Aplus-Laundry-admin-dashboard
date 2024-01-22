"use client"

import React from 'react'
import { ServicesColumns } from './columns'
import { Switch } from "@/components/ui/switch"
import { Button } from '@/components/ui/button'
import { useGlobalModal } from '@/hooks/GlobalModal'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface Props {
    data: ServicesColumns
}

export const SwitchComponentForLaundryPerPair: React.FC<Props> = ({ data }) => {
    const [checked, setChecked] = React.useState(data.laundryperpair === 'Active' ? true : false)
    const modal = useGlobalModal()

    return (
        <div>
            <TooltipProvider delayDuration={500}>
                <Tooltip>

                    <TooltipTrigger className="w-full">


                        <Switch disabled checked={checked} className=" data-[state=checked]:bg-green-500" onCheckedChange={(value) => {
                            modal.title = 'Are you sure you want to change the status?'
                            modal.description = ' you can undo this action later'
                            modal.children = <>
                                <div className='flex flex-row justify-end gap-2'>
                                    <Button onClick={() => { setChecked(value); modal.onClose() }}>Yes</Button>
                                    <Button onClick={() => modal.onClose()}>No</Button>
                                </div>
                            </>
                            modal.onOpen()
                        }} />
                    </TooltipTrigger>
                    <TooltipContent>You can&apos;t change the status of this service here, <br /> you can change it from the edit service page</TooltipContent>
                </Tooltip>

            </TooltipProvider>


        </div>
    )
}

export default SwitchComponentForLaundryPerPair
