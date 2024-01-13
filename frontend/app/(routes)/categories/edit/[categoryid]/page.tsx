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
import React from 'react';
import toast from 'react-hot-toast';



interface Props {
    params: {
        categoryid: string;
    }
}




export default function EditCategoryPage({ params }: Props) {
    const categoryData = params.categoryid

    const useModal = useGlobalModal()
    const router = useRouter()

    const deleteCoupon = async (couponid: string) => {

        // delete logic here
        useModal.onClose()
        toast.success('Category Deleted Successfully')
        router.push('/categories')
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



