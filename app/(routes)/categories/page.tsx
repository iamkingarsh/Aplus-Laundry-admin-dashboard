import { NewCustomerForm } from '@/components/forms/newCustomerForm';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { PlusIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { columns } from './components/columns';
import { categories } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'Coupon Codes | APLus Laundry',
    description: ' Manage your coupons here! ',
}





export default function CategoriesPage() {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between items-center">
                <div>
                    <Heading className='leading-tight ' title='Categories' />
                    <p className='text-muted-foreground text-sm'>Manage your laundry item categories here! </p>
                </div>
                <Link href={'/categories/create-new'}>
                    <Button variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>
                </Link>
            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">
                <DataTable searchKey='coupon_code' columns={columns} data={categories as any} />
            </div>


        </div>

    )
}



