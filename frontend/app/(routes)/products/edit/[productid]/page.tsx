"use client"
import { Alert } from '@/components/forms/Alert';
import { EditCouponsForm } from '@/components/forms/editCouponForm';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useGlobalModal } from '@/hooks/GlobalModal';
import { Trash } from 'lucide-react';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react';

import toast from 'react-hot-toast';
// import { LaundrtProducts } from '../../page';
import { EditLaundryItemForm } from '@/components/forms/editLaundryItemForm';
import { fetchData, deleteData } from '@/axiosUtility/api';
import SwitchComponent from '../../components/switch';



interface Props {
    params: {
        productid: string;
    }
}





export default function EditLaundryItemPage({ params }: Props) {


    console.log(params)

    // const laundryItemData = LaundrtProducts.filter((item: any) => item.product_id === params.productid)[0] as any
    const [laundryItemData, setLaundryItemData] = useState(null)
    console.log('hi', laundryItemData)

    const getData = async () => {
        try {
            const result = await fetchData(`/product/getid/${params.productid}`);
            console.log('result', result)

            if (result && result.products
            ) {
                const products = result.products;
                setLaundryItemData(products[0]);
                console.log('hi', products)

            } else {
                console.error('Response format is not as expected:', result.products.title);
                // You might want to set an error state or show a message to the user
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error state here, show a message to the user, etc.
        } finally {
        }
    };

    useEffect(() => {
        // Trigger the data fetching when the component mounts or when categoryId changes
        getData();
    }, [params.productid]); // Assuming categoryId is a prop or state variable



    // const [checked, setChecked] = React.useState(laundryItemData.status === 'Active' ? true : false)
    const [checked, setChecked] = React.useState(true)

    const useModal = useGlobalModal()
    const router = useRouter()

    const deleteCoupon = async (couponid: string) => {
        // delete logic here

        try {
            const result = await deleteData(`/product/id/${couponid}`); // Replace 'your-delete-endpoint' with the actual DELETE endpoint

            useModal.onClose()
            toast.success('Item Deleted Successfully')
            router.push('/products')
        } catch (error) {
            console.error('Error deleting data:', error);
        }


    }

    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex items-center justify-between">
                <div>
                    <Heading className='leading-tight' title='Edit Laundry Item' />
                    <p className='text-muted-foreground text-sm'>Edit your  laundry item details</p>
                </div>
                <div className='flex items-center gap-3'>
                    {/* <Switch checked={checked} className=" data-[state=checked]:bg-green-500" onCheckedChange={() => setChecked(!checked)} /> */}
                    <SwitchComponent data={laundryItemData as any} />
                    <Button
                        onClick={() => {

                            useModal.title = 'Are you sure you want to delete this item?'
                            useModal.description = 'This action cannot be undone'
                            useModal.children = <Alert onConfirm={() => deleteCoupon(params.productid)} />

                            useModal.onOpen()
                        }}
                        variant='destructive'>
                        <Trash className='w-4 ' />
                    </Button>
                </div>

            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto  py-10">
                {/* <EditCouponsForm gap={2} CouponCodeData={laundryItemData} couponid={params.productid} /> */}
                {<EditLaundryItemForm gap={3} laundryItemData={laundryItemData} />}

            </div>


        </div>

    )
}



