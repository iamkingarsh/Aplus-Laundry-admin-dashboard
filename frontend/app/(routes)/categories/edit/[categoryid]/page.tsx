"use client"
import { Alert } from '@/components/forms/Alert';
import { EditCategoryForm } from '@/components/forms/editCategoryForm';
import { EditCouponsForm } from '@/components/forms/editCouponForm';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useGlobalModal } from '@/hooks/GlobalModal';
import { categories } from '@/lib/constants';
import { Group, Trash } from 'lucide-react';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import React , { useEffect, useLayoutEffect, useState } from 'react';
import api, { fetchData , deleteData } from '../../../../../axiosUtility/api'


import toast from 'react-hot-toast';
import Data from '../../Data';



interface Props {
    params: {
        categoryid: string;
    }
}




export default function EditCategoryPage({ params }: Props) {
    const categoryId = params.categoryid
    const [categoryData, setCategoryData] = useState(null)

console.log('categoryId ',categoryId)
   
  const getData = async () => {
    setLoading(true);
    try {
      const result = await fetchData(`/category/id/${categoryId}`);

      if (result && result.category) {
        const categories = result.category;
        setCategoryData(categories);
        console.log('hi')
      } else {
        console.error('Response format is not as expected:', result.category.title);
        // You might want to set an error state or show a message to the user
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error state here, show a message to the user, etc.
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Trigger the data fetching when the component mounts or when categoryId changes
    getData();
  }, [categoryId]); // Assuming categoryId is a prop or state variable


    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    const useModal = useGlobalModal()
    const router = useRouter()



    const deleteCoupon = async (couponid: string) => {
      


        try {
            const result = await deleteData(`/category/id/${categoryId}`); // Replace 'your-delete-endpoint' with the actual DELETE endpoint

            useModal.onClose()
            toast.success('Category Deleted Successfully')
            router.push('/categories') 
        } catch (error) {
            console.error('Error deleting data:', error);
        }


  


      
    }

    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex items-center justify-between">
                <div>
                    <Heading className='leading-tight' title='Edit Category' />
                    <p className='text-muted-foreground text-sm'>Edit your category details</p>
                </div>
                {categoryData &&
                    <div className='flex items-center gap-3'>
                        <Button
                            onClick={() => {
                                useModal.title = 'Are you sure you want to delete this category?'
                                useModal.description = 'This action cannot be undone'
                                useModal.children = <Alert onConfirm={() => deleteCoupon(params.categoryid)} />
                                useModal.onOpen()
                            }}
                            variant='destructive'>
                            <Trash className='w-4 ' />
                        </Button>
                    </div>}

            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto  py-10">

                {categoryData ?
                    <EditCategoryForm gap={3} categoryData={categoryData} />
                    :
                    <div className="flex flex-col gap-2 items-center justify-center h-full">

                        <p className="text-muted-foreground text-lg">No Category Found</p>
                        <Button onClick={() => router.push('/categories')} variant='default'>Go Back</Button>
                    </div>
                }
            </div>


        </div>

    )
}



