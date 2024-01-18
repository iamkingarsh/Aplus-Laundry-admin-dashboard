import { NewAppBannerForm } from '@/components/forms/newAppBanner';
import { NewCustomerForm } from '@/components/forms/newCustomerForm';
import { NewDeliveryAgentForm } from '@/components/forms/newDeliveryAgentForm';
import Heading from '@/components/ui/heading';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import App from 'next/app';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Create New Delivery Agent | APLus Laundry',
    description: 'Create a New Delivery Agent | APLus Laundry',
}

interface Props {
    params: {
        customerid: string;
    }
}


export default function DeliveryPage({ params }: Props) {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between">
                <div>
                    <Heading className='leading-tight' title='Create New Delivey Agent' />
                    <p className='text-muted-foreground text-sm'>Fill in the form below to create a new delivery agent</p>
                </div>

            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">
                <NewDeliveryAgentForm gap={3} />
            </div>


        </div>

    )
}



