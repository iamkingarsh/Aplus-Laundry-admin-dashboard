"use client"

import React from 'react'
import { ProductsColumns } from './columns'
import { Switch } from "@/components/ui/switch"
import { Button } from '@/components/ui/button'
import { useGlobalModal } from '@/hooks/GlobalModal'

interface Props {
    data: ProductsColumns
}

export const SwitchComponent: React.FC<Props> = ({ data }) => {
    const [checked, setChecked] = React.useState(data.active)
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
                className=" data-[state=checked]:bg-green-500" />

        </div>
    )
}

export default SwitchComponent
