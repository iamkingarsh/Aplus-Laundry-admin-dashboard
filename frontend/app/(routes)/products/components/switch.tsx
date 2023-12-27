"use client"

import React from 'react'
import { ProductsColumns } from './columns'
import { Switch } from "@/components/ui/switch"

interface Props {
    data: ProductsColumns
}

export const SwitchComponent: React.FC<Props> = ({ data }) => {
    const [checked, setChecked] = React.useState(data.status === 'Active' ? true : false)

    return (
        <div>
            <Switch checked={checked} className=" data-[state=checked]:bg-green-500" onCheckedChange={() => setChecked(!checked)} />

        </div>
    )
}

export default SwitchComponent