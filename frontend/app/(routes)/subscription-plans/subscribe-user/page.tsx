import { NewSubscriptionForm } from '@/components/forms/newSubscriptionForm';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

export default function Page() {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between">
                <div>
                    <Heading className='leading-tight' title='Subscribe User' />
                    <p className='text-muted-foreground text-sm'>Fill in the form below to create a Subscription for a user</p>
                </div>

            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">
                <NewSubscriptionForm gap={3} />
            </div>


        </div>

    )
}



