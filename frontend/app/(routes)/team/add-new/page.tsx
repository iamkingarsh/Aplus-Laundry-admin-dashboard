import { NewCustomerForm } from '@/components/forms/newCustomerForm';
import { NewOrderForm } from '@/components/forms/newOrderForm';
import { NewServiceForm } from '@/components/forms/newServiceForm';
import { NewTeamMemberForm } from '@/components/forms/newTeamMemberForm';
import Heading from '@/components/ui/heading';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Create New Service | APLus Laundry',
    description: 'Create a New Service | APLus Laundry',
}



export default function page() {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between">
                <div>
                    <Heading className='leading-tight' title='Add New Member' />
                    <p className='text-muted-foreground text-sm'>Fill in the form below to add a new member to your team by sending them an invite!</p>
                </div>

            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">
                <NewTeamMemberForm gap={3} />
            </div>


        </div>

    )
}



