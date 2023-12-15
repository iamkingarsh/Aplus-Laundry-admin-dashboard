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

import { EditLaundryItemForm } from '@/components/forms/editLaundryItemForm';
import { LaundrtProducts } from '@/app/(routes)/products/page';
import { Services } from '@/lib/constants';
import { EditServiceForm } from '@/components/forms/editServiceDetailsForm';



interface Props {
    params: {
        serviceid: string;
    }
}





export default function EditServiceDetailsPage({ params }: Props) {

    const ServiceData = Services.filter((item: any) => item.service_id === params.serviceid)[0] as any
    console.log(ServiceData)
    console.log(params)


    const [checked, setChecked] = React.useState(ServiceData.laundryperpair === 'Active' || ServiceData?.laundrybykg === 'Active' ? true : false)
    const useModal = useGlobalModal()
    const router = useRouter()

    const deleteCoupon = async (couponid: string) => {
        // delete logic here
        useModal.onClose()
        toast.success('Item Deleted Successfully')
        router.push('/services')
    }

    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex items-center justify-between">
                <div>
                    <Heading className='leading-tight' title='Edit Service Details' />
                    <p className='text-muted-foreground text-sm'>Edit your  service details</p>
                </div>
                <div className='flex items-center gap-3'>
                    <Switch checked={checked} className=" data-[state=checked]:bg-green-500" onCheckedChange={() => setChecked(!checked)} />
                    <Button
                        onClick={() => {

                            useModal.title = 'Are you sure you want to delete this service?'
                            useModal.description = 'This action cannot be undone'
                            useModal.children = <Alert onConfirm={() => deleteCoupon(params.serviceid)} />

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
                {/* {<EditLaundryItemForm gap={3} laundryItemData={laundryItemData} />} */}
                {<EditServiceForm gap={3} data={ServiceData} />}

            </div>


        </div>

    )
}



