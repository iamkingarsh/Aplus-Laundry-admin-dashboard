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

export const metadata: Metadata = {
    title: 'Coupon Codes | APLus Laundry',
    description: ' Manage your coupons here! ',
}

interface Props {
    params: {
        customerid: string;
    }
}

const CouponsData = [

    {
        coupon_code: 'FIRSTORDER',
        discount_type: 'percentage',
        discount_value: '10',
        min_order_value: '100',
        status: 'Active',
        expiry_date: '2021-10-10',
        couponid: 'sdggggesg'
    },
    {
        coupon_code: 'WELCOME10',
        discount_type: 'fixed',
        discount_value: '10',
        min_order_value: '199',
        status: 'Deactive',
        expiry_date: '2022-10-10',
        couponid: 'hsdhhhsdh'
    },

] as any


export default function CustomerPage({ params }: Props) {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between items-center">
                <div>
                    <Heading className='leading-tight ' title='Coupons' />
                    <p className='text-muted-foreground text-sm'>Manage your coupons here! </p>
                </div>
                <Link href={'/coupons/create-new'}>
                    <Button variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>
                </Link>
            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">
                <DataTable
                    bulkDeleteIdName='couponid'
                    bulkDeleteTitle='Are you sure you want to delete these Coupons?'
                    bulkDeleteDescription='This will delete the selected Coupons, and they will not be recoverable.'
                    apiRouteForBulkDelete='/api/coupons/bulk-delete'
                    bulkDeleteToastMessage='Selected Coupons Deleted Successfully'
                    searchKey='coupon_code' columns={columns} data={CouponsData} />
            </div>


        </div>

    )
}



