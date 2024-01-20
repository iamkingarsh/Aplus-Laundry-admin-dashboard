"use client"

import React from 'react'
import { CouponsColumns } from './columns'
import { Switch } from "@/components/ui/switch"
import { Button } from '@/components/ui/button'
import { useGlobalModal } from '@/hooks/GlobalModal'
import { activateCoupon } from '@/axiosUtility/api'

interface Props {
    data: CouponsColumns
}

export const SwitchComponent: React.FC<Props> = ({ data }) => {
    const [checked, setChecked] = React.useState(data.active)
    const modal = useGlobalModal()
console.log('datadatadatadata',checked)
    const statusChange = async () => {
        setChecked((prevChecked) => !prevChecked); // Update the state
        try {
            const Statusdata = {
                active: !checked // Use the updated state value
            };
            
            // console.log( !CouponCodeData.active,data ,checked,'checkedcheckedcheckedcheckedcheckedcheckedcheckedchecked')
            const response = await activateCoupon(`/coupon/${data?._id}/activate`, Statusdata);
            // toast.success('Coupon status changed successfully');
        } catch (error) {
            console.error('Error changing coupon status:', error);
            // toast.error('Error changing coupon status');
        }
    };

    return (
        <div>
            <Switch checked={checked} onCheckedChange={
                (value) => {
                    modal.title = 'Are you sure you want to change the status?'
                    modal.description = 'you can undo this action later'
                    modal.children = <>
                        <div className='flex flex-row justify-end gap-2'>
                            <Button onClick={() => { setChecked(value); modal.onClose();console.log(value);statusChange() }}>Yes</Button>
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
