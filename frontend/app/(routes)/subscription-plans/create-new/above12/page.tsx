import { NewCustomerForm } from '@/components/forms/newCustomerForm';
import { NewLaundryItemForm } from '@/components/forms/newLaundryItemForm';
import { NewOrderForm } from '@/components/forms/newOrderForm';
import { NewSubscriptionPlanForm } from '@/components/forms/newSubscriptionPlanForm';
import Heading from '@/components/ui/heading';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';






export default function Page() {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between">
                <div>
                    <Heading className='leading-tight' title='Create New Subscription' />
                    <p className='text-muted-foreground text-sm'>Fill in the form below to create a new subscription plan for the 12+ age group</p>
                </div>

            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">
                <NewSubscriptionPlanForm gap={3} />
            </div>


        </div>

    )
}



