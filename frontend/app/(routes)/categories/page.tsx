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
import { fetchData } from './Data';
// import { useEffect } from 'react';
// import api from '../../../axiosUtility/api'

// import { useEffect, useLayoutEffect } from 'react';
// import { fetchDataWithToken } from '@/axiosUtility/data.api';
// export const metadata: Metadata = {
//   title: 'Categories | APLus Laundry',
//   description: ' Manage your categories here! ',
// }





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
        <DataTable
          bulkDeleteIdName='category_id'
          bulkDeleteTitle='Are you sure you want to delete the selected categories?'
          bulkDeleteDescription='This will delete the selected categories, and they will not be recoverable.'
          apiRouteForBulkDelete='/api/categories/bulk-delete'
          bulkDeleteToastMessage='Selected categories deleted successfully'
          searchKey='title' columns={columns} data={categories as any} />
      </div>


    </div>

  )
}



