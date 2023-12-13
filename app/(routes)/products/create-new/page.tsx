import { NewCustomerForm } from '@/components/forms/newCustomerForm';
import { NewOrderForm } from '@/components/forms/newOrderForm';
import Heading from '@/components/ui/heading';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Create New Customer | APLus Laundry',
    description: 'Create a New customer | APLus Laundry',
}

interface Props {
    params: {
        customerid: string;
    }
}


export default function CustomerPage({ params }: Props) {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between">
                <div>
                    <Heading className='leading-tight' title='Create New Order' />
                    <p className='text-muted-foreground text-sm'>Fill in the form below to create a new order for a customer</p>
                </div>

            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">
                <NewOrderForm gap={3} />
            </div>


        </div>

    )
}



