"use client"

import React, { useEffect, useState } from 'react';
import { ProductsColumns } from './columns'
import { Switch } from "@/components/ui/switch"
import { Button } from '@/components/ui/button'
import { useGlobalModal } from '@/hooks/GlobalModal'
import api, { fetchData } from "@/axiosUtility/api"

interface Props {
    data: ProductsColumns
}

export const SwitchComponent: React.FC<Props> = ({ data }) => {
 const [checked, setChecked] = useState(data?.active);

 useEffect(() => {
   setChecked(data?.active);
 }, [data?.active]);  
 
    const modal = useGlobalModal()
    const changeStatus = async (value: any) => {
        try {
            console.log('id', data.active)
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)AplusToken\s*=\s*([^;]*).*$)|^.*$/, '$1');


            const response = await api.put(`/product/id/${data._id}/active`, {
                active: data.active
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data)
            setChecked(value);
            modal.onClose()
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div>
            <Switch checked={checked} onCheckedChange={
                (value) => {
                    modal.title = 'Are you sure you want to change the status?'
                    modal.description = 'you can undo this action later'
                    modal.children = <>
                        <div className='flex flex-row justify-end gap-2'>
                            <Button onClick={() => changeStatus(value)}>Yes</Button>
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
