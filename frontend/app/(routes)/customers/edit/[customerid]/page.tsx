"use client"
import { Alert } from '@/components/forms/Alert';
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
// import { customerData } from '../../[customerid]/page';
import { EditCustomerForm } from '@/components/forms/editCustomerForm';



interface Props {
    params: {
        customerid: string;
    }
}



// const customerdata = customerData;


export default function EditCustomerPage({ params }: Props) {
    const [customerdata, setCustomerData] = React.useState<any>(null);

    const [checked, setChecked] = React.useState(customerdata.status === 'Active' ? true : false)
    const useModal = useGlobalModal()
    const router = useRouter()

    const deleteCustomer = async (customerid: string) => {
        // delete logic here
        useModal.onClose()
        toast.success('Customer Deleted Successfully')
        router.push('/customers')
    }

    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex items-center justify-between">
                <div>
                    <Heading className='leading-tight' title='Edit Customer Details' />
                    <p className='text-muted-foreground text-sm'> edit or update customer details</p>
                </div>
                <div className='flex items-center gap-3'>
                    <Switch checked={checked} className=" data-[state=checked]:bg-green-500" onCheckedChange={() => setChecked(!checked)} />
                    <Button
                        onClick={() => {

                            useModal.title = 'Are you sure you want to delete this customer?'
                            useModal.description = 'This action cannot be undone'
                            useModal.children = <Alert onConfirm={() => deleteCustomer(params.customerid)} />

                            useModal.onOpen()
                        }}
                        variant='destructive'>
                        <Trash className='w-4 ' />
                    </Button>
                </div>

            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto  py-10">
                <EditCustomerForm gap={3} customerData={customerdata} customerid={params.customerid} />

            </div>


        </div>

    )
}



