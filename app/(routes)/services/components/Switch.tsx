"use client"

import React from 'react'

import { Switch } from "@/components/ui/switch"

interface Props {
    data: string
}

export const SwitchComponent: React.FC<Props> = ({ data }) => {
    const [checked, setChecked] = React.useState(data === 'Active' ? true : false)

    return (
        <div>
            <Switch checked={checked} className=" data-[state=checked]:bg-green-500" disabled />

        </div>
    )
}

export default SwitchComponent
