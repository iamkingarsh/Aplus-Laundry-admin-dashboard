"use client"
import { Alert } from '@/components/forms/Alert';
import { EditAppBannerForm } from '@/components/forms/editAppBannerForm';
import { EditCouponsForm } from '@/components/forms/editCouponForm';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useGlobalModal } from '@/hooks/GlobalModal';
import { Trash } from 'lucide-react';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';



interface Props {
    params: {
        bannerid: string;
    }
}

const bannerdata = [
    {
        title: "Flat 10% Off",
        desc: "Get 10% off use code 'Wel10' ",
        background: "/assets/bg.png"

    }
] as any


export default function EditAppBannerPage({ params }: Props) {
    const [checked, setChecked] = React.useState(bannerdata[0].status === 'Active' ? true : false)
    const useModal = useGlobalModal()
    const router = useRouter()

    const deleteCoupon = async (couponid: string) => {
        // delete logic here
        useModal.onClose()
        toast.success('Banner Deleted Successfully')
        router.push('/coupons')
    }

    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex items-center justify-between">
                <div>
                    <Heading className='leading-tight' title='Edit App Banner' />
                    <p className='text-muted-foreground text-sm'>Edit or update app banner</p>
                </div>
                <div className='flex items-center gap-3'>
                    <Switch checked={checked} className=" data-[state=checked]:bg-green-500" onCheckedChange={() => setChecked(!checked)} />
                    <Button
                        onClick={() => {

                            useModal.title = 'Are you sure you want to delete this  App Banner?'
                            useModal.description = 'This action cannot be undone'
                            useModal.children = <Alert onConfirm={() => deleteCoupon(params.bannerid)} />

                            useModal.onOpen()
                        }}
                        variant='destructive'>
                        <Trash className='w-4 ' />
                    </Button>
                </div>

            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto  py-10">
                <EditAppBannerForm gap={2} bannerdata={bannerdata} bannerid={params.bannerid} />

            </div>


        </div>

    )
}



