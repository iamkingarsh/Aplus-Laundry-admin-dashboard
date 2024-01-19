'use client'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { columns } from './components/columns'
import { fetchData } from '@/axiosUtility/api'

// const BannersData = [
//     {
//         id: 'sdgsr95',
//         title: "Flat 10% Off",
//         desc: "Get 10% off use code 'Wel10' ",
//         background: "/assets/bg.png"
//     },
//     {
//         id: 'sdgeh59',
//         title: "Flat 20% Off",
//         desc: "Get 20% off use code 'Wel20' ",
//         background: "/assets/bg.png "
//     }
// ] as any;

export default function Page() {
  const [bannersData, setBannersData] = useState([])
  const getData = async () => {
    // setLoading(true)
    try {
      const result = await fetchData('/appBanner/getall'); // Replace 'your-endpoint' with the actual API endpoint
      setBannersData(result?.appBanners)
      console.log(result?.appBanners)
      //   if (result && result.categories) {
      //     const categories = result.categories;
      //     setCategories(categories);
      //     setLoading(false)
      //     // Now you can work with the 'categories' array
      //   } else {
      //     console.error('Response format is not as expected');
      //   }
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
          <Heading className='leading-tight' title='App Banners' />
          <p className='text-muted-foreground text-sm'>Manage Your App Banners Here</p>
        </div>
        <Link href={'/app-banners/create-new'}>
          <Button variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>
        </Link>
      </div>
      <Separator orientation='horizontal' />
      <div className="container mx-auto py-10">
        <DataTable
          bulkDeleteIdName='_id'
          bulkDeleteTitle='Are you sure you want to delete these App Banners?'
          bulkDeleteDescription='This will delete the selected App Banners, and they will not be recoverable.'
          deleteRoute="/appBanner/ids" //@mujahed need to create a route for deleting multiple banners at once in backend
          bulkDeleteToastMessage='Selected App Banners Deleted Successfully'
          searchKey='banner_title' columns={columns} data={bannersData} />

      </div>

    </div>
  )
}
