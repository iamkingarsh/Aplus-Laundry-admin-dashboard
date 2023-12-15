import { NewCustomerForm } from '@/components/forms/newCustomerForm';
import { NewOrderForm } from '@/components/forms/newOrderForm';
import { NewServiceForm } from '@/components/forms/newServiceForm';
import Heading from '@/components/ui/heading';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Create New Service | APLus Laundry',
    description: 'Create a New Service | APLus Laundry',
}



export default function ServicePage() {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between">
                <div>
                    <Heading className='leading-tight' title='Create New Service' />
                    <p className='text-muted-foreground text-sm'>Fill in the form below to create a new service</p>
                </div>

            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">
                <NewServiceForm gap={3} />
            </div>


        </div>

    )
}



