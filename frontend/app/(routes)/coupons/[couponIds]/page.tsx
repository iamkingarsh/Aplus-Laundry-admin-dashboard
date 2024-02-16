"use client" //@mujahed change it to "use server" to use server-side rendering when integrating backend

import { NewCustomerForm } from '@/components/forms/newCustomerForm';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import Heading from '@/components/ui/heading';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Clipboard, Pencil, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React,{ useEffect, useLayoutEffect, useState } from 'react';

import toast from 'react-hot-toast';
import { fetchData, postData ,activateCoupon} from '@/axiosUtility/api';


// interface Props {
//     params: {
//         couponid: string;
//     }
// }

// const CouponCodeData = [
//     {
//         // couponid: couponid,
//         coupon_code: 'FIRSTORDER',
//         discount_type: 'percentage',
//         discount_value: '10',
//         min_order_value: '100',
//         status: 'Active',
//         expiry_date: '2021-10-10',
//         couponid: 'sdggggesg'

//     }
// ] as any


// export default function CouponPage({ params }: Props) {
//     const [CouponCodeData, setCouponsData] = useState(null) 
//     const router = useRouter()

//     const getData = async () => {

//         try {
//             const result = await fetchData('/coupon/'+params?.couponid); // Replace 'your-endpoint' with the actual API endpoint
//             setCouponsData(result?.coupon ?? null);
//             setChecked(result?.coupon?.active)
 
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     }
//     console.log('result CouponsData CouponsData',CouponCodeData,params?.couponid)


//     // console.log('AllData', AllData)
//     useEffect(() => {
//         getData()
//     }, [])

    
//     const [checked, setChecked] = React.useState<boolean>(false);
    
//     const statusChange = async () => {
//         setChecked((prevChecked) => !prevChecked); // Update the state
//         try {
//             const data = {
//                 active: !checked // Use the updated state value
//             };
            
//             // console.log( !CouponCodeData.active,data ,checked,'checkedcheckedcheckedcheckedcheckedcheckedcheckedchecked')
//             const response = await activateCoupon(`/coupon/${params?.couponid}/activate`, data);
//             toast.success('Coupon status changed successfully');
//         } catch (error) {
//             console.error('Error changing coupon status:', error);
//             toast.error('Error changing coupon status');
//         }
//     };


    interface CouponData {
        _id: string;
        discount_code: string;
        discount_type: string;
        discount_value: string;
        discount_expiry_date: string;
        discount_minimum_purchase_amount: string;
        discount_usage_limit: string;
        active: boolean;
    }
    
    interface Props {
        params: {
            couponid: string;
        };
    }
    
    export default function CouponPage({ params }: Props) {
        const [CouponCodeData, setCouponCodeData] = useState<CouponData | null>(null);
        const [checked, setChecked] = useState<boolean>(false);
        const router = useRouter();
    
        const getData = async () => {
            try {
                const result = await fetchData('/coupon/' + params?.couponid);
                setCouponCodeData(result?.coupon ?? null);
                setChecked(result?.coupon?.active ?? false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        useEffect(() => {
            getData();
        }, []);
    
        const statusChange = async () => {
            setChecked((prevChecked) => !prevChecked);
            try {
                const data = {
                    active: !checked
                };
                const response = await activateCoupon(`/coupon/${params?.couponid}/activate`, data);
                toast.success('Coupon status changed successfully');
            } catch (error) {
                console.error('Error changing coupon status:', error);
                toast.error('Error changing coupon status');
            }
        };

    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between">
                <div>
                <Heading className='leading-tight' title={CouponCodeData?.discount_code ?? ''} />


                    {/* <p className='text-muted-foreground text-sm'>Fill in the form below to create a new customer</p> */}
                </div>
                <Link href={`/coupons/edit/${CouponCodeData?._id}`}>
                    <Button variant='default'>Edit Coupon <Pencil className='w-4 ml-2' /></Button>
                </Link>
            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">

                <Card className='p-4 w-fit'>

                    {CouponCodeData  ? <div className='flex flex-col gap-3'>
                        <div className='flex  items-center justify-between'>

                            <div className="flex gap-3 items-center w-fit border-2 rounded-md bg-slate-100 dark:bg-slate-950 p-2 border-dashed">

                                <p className='text-xl font-semibold'>{CouponCodeData?.discount_code?.toUpperCase()}</p>
                                <Clipboard className='h-4 w-4 cursor-pointer' onClick={() => { navigator.clipboard.writeText(CouponCodeData?.discount_code?.toUpperCase()); toast.success("Copied to Clipboard") }} />
                            </div>
                            <Switch checked={checked} className=" data-[state=checked]:bg-green-500" onCheckedChange={statusChange} />

                        </div>
                        <div>
                            <li className='text-sm opacity-70'>{CouponCodeData?.discount_type == 'percentage' ? 'Percentage' : 'Fixed'} discount</li>
                            {CouponCodeData?.discount_value > "0" && <li className='text-sm opacity-70 '>{CouponCodeData?.discount_type === 'fixed' && 'Rs. '}{CouponCodeData?.discount_value}{CouponCodeData?.discount_type === 'percentage' && '%'} will be off on the total cart</li>}
                            {CouponCodeData?.discount_expiry_date && <li className='text-sm opacity-70 '>Expires on {CouponCodeData?.discount_expiry_date}</li>}
                            <li className='text-sm opacity-70 '>{CouponCodeData?.discount_minimum_purchase_amount != "0" && 'Rs. '}{CouponCodeData?.discount_minimum_purchase_amount != "0" && CouponCodeData?.discount_minimum_purchase_amount} {CouponCodeData?.discount_minimum_purchase_amount == "0" && "No "} Min purchase amount is required to avail this discount</li>
                            <li className='text-sm opacity-70 '>{CouponCodeData?.discount_usage_limit != "0" && CouponCodeData?.discount_usage_limit} {CouponCodeData?.discount_usage_limit != "0" && "Time(s)"} {CouponCodeData?.discount_usage_limit == "0" && "Unlimited"} usage limit</li>


                        </div>
                    </div> : <p className='text-base font-semibold'>No Summary Availabale</p>}

                </Card>

            </div>


        </div>

    )
}



