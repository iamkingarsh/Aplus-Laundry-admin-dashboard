'use client'
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { columns } from './components/columns';
import { fetchData } from '../../../axiosUtility/api'
import { useEffect, useState } from 'react';



export default function CategoriesPage() {

  const [loading, setLoading] = useState(true)

  const [categories, setCategories] = useState([])
  const getData = async () => {
    setLoading(true)
    try {
      const result = await fetchData('/category/all'); // Replace 'your-endpoint' with the actual API endpoint

      if (result && result.categories) {
        const categories = result.categories;
        setCategories(categories);
        setLoading(false)
        // Now you can work with the 'categories' array
      } else {
        console.error('Response format is not as expected');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    getData()
  }, [])



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
        {!loading && <DataTable
          bulkDeleteIdName='_id'
          bulkDeleteTitle='Are you sure you want to delete the selected categories?'
          bulkDeleteDescription='This will delete all the selected categories, and they will not be recoverable.'
          bulkDeleteToastMessage='Selected categories deleted successfully'
          deleteRoute="/category/ids"
          searchKey='title' columns={columns} data={categories as any} />}
      </div>


    </div>

  )
}



