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
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

import { EditLaundryItemForm } from '@/components/forms/editLaundryItemForm';
// import { LaundrtProducts } from '@/app/(routes)/products/page';
import { Services } from '@/lib/constants';
import { EditServiceForm } from '@/components/forms/editServiceDetailsForm';
import { deleteData, fetchData } from '@/axiosUtility/api';



interface Props {
    params: {
        serviceid: string;
    }
}





export default function EditServiceDetailsPage({ params }: Props) {
    const [serviceData, setServiceData] = React.useState<any>(null)
    // const ServiceData = Services.filter((item: any) => item.service_id === params.serviceid)[0] as any

    console.log(params)




    const [checked, setChecked] = React.useState()
    const useModal = useGlobalModal()
    const router = useRouter()


    const deleteService = async (id:any) => {
const Id = id
        try {
            const result = await deleteData(`/service/id/${serviceData._id}`); // Replace 'your-delete-endpoint' with the actual DELETE endpoint
            console.log('Success:', result);
            toast.success('Service Deleted Successfully')
            useModal.onClose()
            router.push('/services')

        } catch (error) {
            console.error('Error deleting data:', error);
        }

        // GlobalModal.onClose()
    }
    const getData = async () => {
        try {
            const result = await fetchData(`/service/id/${params.serviceid}/withitems`);
            console.log('result', result)

            if (result && result.service
            ) {
                const services = result.service;
                setServiceData(services)
                console.log('hi', services)

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

    console.log('serviceData', serviceData)

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex items-center justify-between">
                <div>
                    <Heading className='leading-tight' title='Edit Service Details' />
                    <p className='text-muted-foreground text-sm'>Edit your  service details</p>
                </div>
                <div className='flex items-center gap-3'>
                    <Button
                        onClick={() => {

                            useModal.title = 'Are you sure you want to delete this service?'
                            useModal.description = 'This action cannot be undone'
                            useModal.children = <Alert onConfirm={() => deleteService(params.serviceid)} />

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
                <EditServiceForm gap={3} data={serviceData} />

            </div>


        </div>

    )
}



