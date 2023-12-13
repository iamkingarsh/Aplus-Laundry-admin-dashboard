import { NewCategoryForm } from '@/components/forms/newCategoryForm';
import { NewCouponsForm } from '@/components/forms/newCouponForm';
import { NewCustomerForm } from '@/components/forms/newCustomerForm';
import Heading from '@/components/ui/heading';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Create New Category | APLus Laundry',
    description: 'Create a New Category | APLus Laundry',
}


export default function NewCateogryPage() {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between">
                <div>
                    <Heading className='leading-tight' title='Create New Category' />
                    <p className='text-muted-foreground text-sm'>Fill in the form below to create a new category</p>
                </div>

            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto  py-10">
                <NewCategoryForm gap={3} />

            </div>


        </div>

    )
}



