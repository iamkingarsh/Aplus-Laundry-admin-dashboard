"use client"

import React from 'react'

import { Switch } from "@/components/ui/switch"
import { useGlobalModal } from '@/hooks/GlobalModal'
import { Alert } from '@/components/forms/Alert'
import { Button } from '@/components/ui/button'

interface Props {
    data: string
}

export const SwitchComponent: React.FC<Props> = ({ data }) => {
    const [checked, setChecked] = React.useState(data)
    const modal = useGlobalModal()

    return (
        <div>
            <Switch checked={checked} onCheckedChange={
                (value) => {
                    modal.title = 'Are you sure you want to change the status?'
                    modal.description = 'you can undo this action later'
                    modal.children = <>
                        <div className='flex flex-row justify-end gap-2'>
                            <Button onClick={() => { setChecked(value); modal.onClose() }}>Yes</Button>
                            <Button onClick={() => modal.onClose()}>No</Button>
                        </div>
                    </>
                    modal.onOpen()
                }
            }
                className=" data-[state=checked]:bg-green-500" disabled />

        </div>
    )
}

export default SwitchComponent
