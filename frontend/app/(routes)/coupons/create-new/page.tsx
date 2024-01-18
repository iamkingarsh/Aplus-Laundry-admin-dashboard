 
import { NewCouponsForm } from '@/components/forms/newCouponForm';
import { NewCustomerForm } from '@/components/forms/newCustomerForm';
import Heading from '@/components/ui/heading';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation'; 


export const metadata: Metadata = {
    title: 'Create New Coupon | APLus Laundry',
    description: 'Create a New Coupon | APLus Laundry',
}

interface Props {
    params: {
        couponid: string;
    }
}


export default function CouponsPage({ params }: Props) {

 
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between">
                <div>
                    <Heading className='leading-tight' title='Create New Coupon' />
                    <p className='text-muted-foreground text-sm'>Fill in the form below to create a new coupon code</p>
                </div>

            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto  py-10">
                <NewCouponsForm gap={2} />

            </div>


        </div>

    )
}



