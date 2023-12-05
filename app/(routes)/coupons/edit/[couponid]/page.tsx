import { NewCouponsForm } from '@/components/forms/newCouponForm';
import { NewCustomerForm } from '@/components/forms/newCustomerForm';
import Heading from '@/components/ui/heading';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Edit Coupon Discounts | APLus Laundry',
    description: 'Edit your coupon discounts | APLus Laundry',
}

interface Props {
    params: {
        couponid: string;
    }
}


export default function EditCouponsPage({ params }: Props) {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between">
                <div>
                    <Heading className='leading-tight' title='Edit Coupon Discounts' />
                    <p className='text-muted-foreground text-sm'>Edit your coupon discounts</p>
                </div>

            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto  py-10">
                <NewCouponsForm gap={2} />

            </div>


        </div>

    )
}



