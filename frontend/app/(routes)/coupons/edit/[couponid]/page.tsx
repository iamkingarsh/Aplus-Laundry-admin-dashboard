"use client"
import { Alert } from '@/components/forms/Alert';
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
        couponid: string;
    }
}

const CouponCodeData = [
    {
        // couponid: couponid,
        coupon_code: 'FIRSTORDER',
        discount_type: 'percentage',
        discount_value: '10',
        min_order_value: '100',
        status: 'Active',
        discount_expiry_date: new Date("2024-10-10"),
        discount_usage_limit: '1',

    }
] as any


export default function EditCouponsPage({ params }: Props) {
    const [checked, setChecked] = React.useState(CouponCodeData[0].status === 'Active' ? true : false)
    const useModal = useGlobalModal()
    const router = useRouter()

    const deleteCoupon = async (couponid: string) => {
        // delete logic here
        useModal.onClose()
        toast.success('Coupon Deleted Successfully')
        router.push('/coupons')
    }

    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex items-center justify-between">
                <div>
                    <Heading className='leading-tight' title='Edit Coupon Discounts' />
                    <p className='text-muted-foreground text-sm'>Edit your coupon discounts</p>
                </div>
                <div className='flex items-center gap-3'>
                    <Switch checked={checked} className=" data-[state=checked]:bg-green-500" onCheckedChange={() => setChecked(!checked)} />
                    <Button
                        onClick={() => {

                            useModal.title = 'Are you sure you want to delete this coupon?'
                            useModal.description = 'This action cannot be undone'
                            useModal.children = <Alert onConfirm={() => deleteCoupon(params.couponid)} />

                            useModal.onOpen()
                        }}
                        variant='destructive'>
                        <Trash className='w-4 ' />
                    </Button>
                </div>

            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto  py-10">
                <EditCouponsForm gap={2} CouponCodeData={CouponCodeData} couponid={params.couponid} />

            </div>


        </div>

    )
}



