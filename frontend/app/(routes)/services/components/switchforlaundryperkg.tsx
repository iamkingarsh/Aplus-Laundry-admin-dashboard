"use client"

import React from 'react'
import { ServicesColumns } from './columns'
import { Switch } from "@/components/ui/switch"
import { useGlobalModal } from '@/hooks/GlobalModal'
import { Alert } from '@/components/forms/Alert'
import { Button } from '@/components/ui/button'

interface Props {
    data: ServicesColumns
}

export const SwitchComponentForLaundryPerKG: React.FC<Props> = ({ data }) => {
    const [checked, setChecked] = React.useState(data.laundrybykg === 'Active' ? true : false)
    const modal = useGlobalModal()
    return (
        <div>
            <Switch checked={checked} className=" data-[state=checked]:bg-green-500" onCheckedChange={(value) => {
                modal.title = 'Are you sure you want to change the status?'
                modal.description = 'you can undo this action later'
                modal.children = <>
                    <div className='flex flex-row justify-end gap-2'>


                        <Button onClick={() => { setChecked(value); modal.onClose() }}>Yes</Button>
                        <Button onClick={() => modal.onClose()}>No</Button>
                    </div>

                </>
                modal.onOpen()
            }} />

        </div>
    )
}

export default SwitchComponentForLaundryPerKG
