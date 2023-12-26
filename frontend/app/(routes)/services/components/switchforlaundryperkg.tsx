"use client"

import React from 'react'
import { ServicesColumns } from './columns'
import { Switch } from "@/components/ui/switch"

interface Props {
    data: ServicesColumns
}

export const SwitchComponentForLaundryPerKG: React.FC<Props> = ({ data }) => {
    const [checked, setChecked] = React.useState(data.laundrybykg === 'Active' ? true : false)

    return (
        <div>
            <Switch checked={checked} className=" data-[state=checked]:bg-green-500" onCheckedChange={() => setChecked(!checked)} />

        </div>
    )
}

export default SwitchComponentForLaundryPerKG
