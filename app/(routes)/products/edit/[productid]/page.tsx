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
import React from 'react';
import toast from 'react-hot-toast';
import { LaundrtProducts } from '../../page';
import { EditLaundryItemForm } from '@/components/forms/editLaundryItemForm';



interface Props {
    params: {
        productid: string;
    }
}





export default function EditLaundryItemPage({ params }: Props) {
    const laundryItemData = LaundrtProducts.filter((item: any) => item.product_id === params.productid)[0] as any



    const [checked, setChecked] = React.useState(laundryItemData.status === 'Active' ? true : false)
    const useModal = useGlobalModal()
    const router = useRouter()

    const deleteCoupon = async (couponid: string) => {
        // delete logic here
        useModal.onClose()
        toast.success('Item Deleted Successfully')
        router.push('/products')
    }

    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex items-center justify-between">
                <div>
                    <Heading className='leading-tight' title='Edit Laundry Item' />
                    <p className='text-muted-foreground text-sm'>Edit your  laundry item details</p>
                </div>
                <div className='flex items-center gap-3'>
                    <Switch checked={checked} className=" data-[state=checked]:bg-green-500" onCheckedChange={() => setChecked(!checked)} />
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



