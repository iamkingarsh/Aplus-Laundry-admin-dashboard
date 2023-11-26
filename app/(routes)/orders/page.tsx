import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import { columns } from './components/columns';

const AllOrdersData = [
    { "order_id": "fa7253d5-8cdd-481e-a224-883813da0e31", "customer_name": "Worden Croneen", "customer_id": "561a3f0e-66cb-4f5d-b2e5-a19ef30a31b4", "mobile": "266-774-3618", "status": "pending", "order_date": "3/12/2023", "payment_method": "payment gateway", "channel": "manual" },
    { "order_id": "a2855388-4025-4f0e-aa0b-2e23d016678e", "customer_name": "Sheffy Keyte", "customer_id": "fdedb94a-1f8c-4acc-8dbf-7ea6b0d7ac5f", "mobile": "228-539-4347", "status": "onway", "order_date": "8/5/2023", "payment_method": "cod", "channel": "manual" },
    { "order_id": "ee055ac4-7c89-4e64-b337-da695ac5c311", "customer_name": "Kayle Swede", "customer_id": "64851f40-f19d-47e8-9e28-6f613c6a12f5", "mobile": "270-224-8716", "status": "pending", "order_date": "8/9/2023", "payment_method": "payment gateway", "channel": "manual" },
    { "order_id": "0a133bd2-c5e3-4a69-bb6c-2f48b3f6f288", "customer_name": "Amber Smidmore", "customer_id": "2fb6c473-2b7c-424e-b041-923b0bc8ee33", "mobile": "253-736-0343", "status": "cancelled", "order_date": "5/22/2023", "payment_method": "cod", "channel": "Mobile App" },
    { "order_id": "95ca08ce-5db3-4a3d-b30a-11c5b053ae96", "customer_name": "Rubie Bault", "customer_id": "7ad6bf12-5470-4743-8788-ffbeccb79551", "mobile": "166-309-1074", "status": "delivered", "order_date": "2/25/2023", "payment_method": "payment gateway", "channel": "Mobile App" },
    { "order_id": "1095f0fb-c124-43e0-83e7-b9d35666867a", "customer_name": "Clevie Lordon", "customer_id": "8b24421a-a06f-44d6-86b2-0b696796e38e", "mobile": "345-446-0639", "status": "cancelled", "order_date": "1/14/2023", "payment_method": "payment gateway", "channel": "manual" },
    { "order_id": "b414dc52-0dd2-46ab-a17f-e1b817935bda", "customer_name": "Karyl Ahern", "customer_id": "d2bd4fa9-0ac3-4cf8-b128-fbc3841d800e", "mobile": "161-736-5163", "status": "delivered", "order_date": "1/16/2023", "payment_method": "payment gateway", "channel": "Mobile App" },
    { "order_id": "fb883fae-1460-44fe-b733-a46103d04f66", "customer_name": "Spense Stuchbery", "customer_id": "8acf1e52-68de-4b3b-a350-223ed32eecd2", "mobile": "813-821-7409", "status": "onway", "order_date": "3/11/2023", "payment_method": "cod", "channel": "manual" },
    { "order_id": "3e41e899-e878-420b-a869-b99324f97e76", "customer_name": "Marjie Bleakley", "customer_id": "6c7b7cbb-c0f5-4909-8eec-542dc9ada94f", "mobile": "708-383-9099", "status": "delivered", "order_date": "6/8/2023", "payment_method": "payment gateway", "channel": "manual" },
    { "order_id": "9372b513-7b6f-48a1-b923-2e7995de6c55", "customer_name": "Dulciana Guard", "customer_id": "21d41915-ae2e-435b-be5e-c35c7e68d401", "mobile": "953-895-2692", "status": "onhold", "order_date": "8/25/2023", "payment_method": "cod", "channel": "manual" },
    { "order_id": "83f6724e-2531-48d2-9a4f-eedc3b5e13ae", "customer_name": "Verna Kintish", "customer_id": "0b7c4606-3bba-4d53-959c-8481fab2fae2", "mobile": "303-934-6471", "status": "delivered", "order_date": "6/29/2023", "payment_method": "payment gateway", "channel": "manual" },
    { "order_id": "a55ab4ed-1117-456f-8ee3-f8c7a10520e4", "customer_name": "Kristofor Harkness", "customer_id": "f4880bb0-c52d-4d09-ba81-908c46d17062", "mobile": "415-668-7833", "status": "cancelled", "order_date": "1/7/2023", "payment_method": "cod", "channel": "manual" },
    { "order_id": "baa15884-4931-44db-9def-ae92f442909c", "customer_name": "Nickola Jewers", "customer_id": "6fcc7ac3-bed7-4e91-a225-4c18ec249d83", "mobile": "924-885-3430", "status": "onway", "order_date": "9/20/2023", "payment_method": "payment gateway", "channel": "manual" },
    { "order_id": "ebeb63dd-014d-4a50-992a-9c720d0b6d68", "customer_name": "Cristine Eustis", "customer_id": "108b7c62-0069-456d-9033-fd3752ad05a8", "mobile": "896-649-5541", "status": "onhold", "order_date": "2/7/2023", "payment_method": "payment gateway", "channel": "Mobile App" },
    { "order_id": "5fee857a-01df-4123-b310-15dc0d90f63d", "customer_name": "Larine Rosle", "customer_id": "bbc1dda5-9e2a-4370-a190-b4326fce8ac1", "mobile": "257-982-5003", "status": "delivered", "order_date": "3/24/2023", "payment_method": "cod", "channel": "Mobile App" },
    { "order_id": "4d12b108-de86-4dc6-85a9-84f6760d4e88", "customer_name": "Barrie Siebert", "customer_id": "5b00db60-ba5c-45bd-87f5-fcd11530dba9", "mobile": "660-838-1255", "status": "cancelled", "order_date": "11/17/2023", "payment_method": "cod", "channel": "manual" },
    { "order_id": "f8f70bb0-0169-43ae-958d-3cfdab34e043", "customer_name": "Mariel Bugdale", "customer_id": "5b241859-3508-47aa-834a-dfbea9111321", "mobile": "120-983-2481", "status": "cancelled", "order_date": "1/22/2023", "payment_method": "cod", "channel": "manual" },
    { "order_id": "71cde450-d68b-495f-b769-d91b83a7b12e", "customer_name": "Cathe Verni", "customer_id": "d01e50fd-b56e-4a12-9ac9-c6009f6cfb0f", "mobile": "932-585-4735", "status": "picked", "order_date": "8/24/2023", "payment_method": "cod", "channel": "manual" },
    { "order_id": "3d731d90-90de-43f7-934e-67f7c7215369", "customer_name": "Glenn Goforth", "customer_id": "0fd87f7e-ad55-4135-855e-185957293883", "mobile": "707-170-6469", "status": "picked", "order_date": "5/22/2023", "payment_method": "payment gateway", "channel": "manual" },
    { "order_id": "4b7c455b-9fec-4f69-9ef3-aebdacf49a98", "customer_name": "Retha Coom", "customer_id": "0ffddd67-a283-4e50-bb13-0b49d112f7ff", "mobile": "800-845-6692", "status": "onhold", "order_date": "9/23/2023", "payment_method": "cod", "channel": "Mobile App" },
    { "order_id": "708c0d53-f9eb-4327-abd3-fe3d57587e41", "customer_name": "Alasteir Glisane", "customer_id": "f92a7955-07df-418d-86ef-b3093793c3c7", "mobile": "386-162-9861", "status": "onhold", "order_date": "3/28/2023", "payment_method": "payment gateway", "channel": "Mobile App" },
    { "order_id": "e569741a-6c24-4140-a522-299a32df797b", "customer_name": "Gaultiero Tomankowski", "customer_id": "0b157aea-868c-45d1-b7fb-39992329a9dc", "mobile": "138-757-5924", "status": "delivered", "order_date": "12/10/2022", "payment_method": "payment gateway", "channel": "manual" },
    { "order_id": "8de65e86-cf4a-47b1-b9f6-44b5d1ac8657", "customer_name": "Nappy Luckin", "customer_id": "bdbc106d-c396-4b71-be0d-c9fe9d9e6737", "mobile": "311-956-4654", "status": "pending", "order_date": "5/4/2023", "payment_method": "cod", "channel": "Mobile App" },
    { "order_id": "4ce826f2-5ee8-4da9-af88-79bc1b76eba6", "customer_name": "Betti Hillen", "customer_id": "4f5ef225-a99c-4407-819d-5b6dff4b378e", "mobile": "208-137-3405", "status": "onhold", "order_date": "10/26/2023", "payment_method": "cod", "channel": "manual" },
    { "order_id": "02b7783c-f168-43a4-abcd-c9bd06729ad0", "customer_name": "Elnora Feifer", "customer_id": "89822552-ebca-47d5-bd5f-4859706db3e8", "mobile": "415-732-9124", "status": "delivered", "order_date": "7/15/2023", "payment_method": "payment gateway", "channel": "Mobile App" },
    { "order_id": "75a71663-2a1e-4bb7-8256-73e38e542c80", "customer_name": "Christalle Massei", "customer_id": "8935b028-0036-486d-90ee-ae387cbd084d", "mobile": "653-161-9431", "status": "onway", "order_date": "11/16/2023", "payment_method": "payment gateway", "channel": "manual" },
    { "order_id": "d4a40b61-f8b2-4643-a129-65b2493b3827", "customer_name": "Gustave Lortz", "customer_id": "d861d8c5-b4cd-4f5b-8803-6c693e132187", "mobile": "124-763-3523", "status": "picked", "order_date": "1/16/2023", "payment_method": "payment gateway", "channel": "Mobile App" },
    { "order_id": "be5a1929-27f5-42cf-9993-ed385892c184", "customer_name": "Marthena Stiven", "customer_id": "35971987-c967-476e-b7ae-aa45ef56467d", "mobile": "899-899-1171", "status": "pending", "order_date": "1/7/2023", "payment_method": "payment gateway", "channel": "Mobile App" },
    { "order_id": "845beace-5647-44a5-ad9c-e635c658760e", "customer_name": "Orton Capitano", "customer_id": "d5bb4742-a9e7-4aaa-a20b-4850b273b922", "mobile": "915-740-0859", "status": "delivered", "order_date": "12/10/2022", "payment_method": "payment gateway", "channel": "Mobile App" },
    { "order_id": "c611f252-1289-4dd9-a94b-762ee07fb86e", "customer_name": "Pamelina Deny", "customer_id": "65602640-ca46-42fa-8d52-473cf42f736d", "mobile": "400-996-3916", "status": "delivered", "order_date": "1/2/2023", "payment_method": "payment gateway", "channel": "manual" },
    { "order_id": "ac5a1b81-c130-4844-882b-7a1281e72206", "customer_name": "Kalle Mangion", "customer_id": "e8cdbd8f-ed10-46a9-818a-407b48a8340f", "mobile": "557-550-4165", "status": "cancelled", "order_date": "5/19/2023", "payment_method": "payment gateway", "channel": "Mobile App" },
    { "order_id": "c423050b-71e3-495b-96ad-e38e43c0979f", "customer_name": "Cathrine Kilborn", "customer_id": "93b2941e-3136-44df-9e0b-706c96e2fcf6", "mobile": "704-529-2930", "status": "cancelled", "order_date": "10/7/2023", "payment_method": "cod", "channel": "Mobile App" },
    { "order_id": "e51746ea-9a4b-428e-b41a-46fad61c7c63", "customer_name": "Roy Itzkovsky", "customer_id": "45df87b3-6575-41af-bb09-b82e6b318860", "mobile": "760-591-4795", "status": "picked", "order_date": "2/18/2023", "payment_method": "payment gateway", "channel": "manual" },
    { "order_id": "22586b00-dbca-47cf-b70f-439343aa492e", "customer_name": "Sylvia Coggeshall", "customer_id": "52100042-f12e-4c23-9df9-197ad2005bcb", "mobile": "409-931-0968", "status": "onhold", "order_date": "6/6/2023", "payment_method": "cod", "channel": "Mobile App" },
    { "order_id": "41ff9021-dccd-4d39-921b-70cf5e34580f", "customer_name": "Sheffy Fuchs", "customer_id": "75d2fd76-2cdf-487e-9847-21238592b6bc", "mobile": "970-954-5191", "status": "onhold", "order_date": "11/19/2023", "payment_method": "cod", "channel": "Mobile App" },
    { "order_id": "c117437c-25cd-4f3d-b181-fbc0eef23a75", "customer_name": "Clement Duigan", "customer_id": "aece64dc-7c4f-4f23-9156-d121973ebf27", "mobile": "988-656-9472", "status": "pending", "order_date": "7/1/2023", "payment_method": "payment gateway", "channel": "manual" },
    { "order_id": "8b344820-e9e6-41bb-8cba-be93884fc58e", "customer_name": "Elena Kield", "customer_id": "b54209fe-4540-46bb-bb04-4af49bc03fc9", "mobile": "204-501-5706", "status": "delivered", "order_date": "1/8/2023", "payment_method": "cod", "channel": "manual" },
    { "order_id": "cec0f43a-7ac1-4668-a1c0-cd89e48e08dc", "customer_name": "Pet Course", "customer_id": "698b7283-2a9b-4c7e-a4a2-a73e2d0d44d3", "mobile": "213-391-1068", "status": "picked", "order_date": "11/12/2023", "payment_method": "payment gateway", "channel": "manual" },
    { "order_id": "3913b664-da97-4ee8-9f64-10cb91dc2a93", "customer_name": "Tamera Vassbender", "customer_id": "a5544370-6a9f-407b-bfea-7a2e16ab44ba", "mobile": "713-155-4496", "status": "picked", "order_date": "10/15/2023", "payment_method": "payment gateway", "channel": "Mobile App" },
    { "order_id": "cdd60d61-8584-426c-b62a-92627ff1aa2e", "customer_name": "Susette Maybery", "customer_id": "82de2bab-1b63-4653-bb96-7445a6ae76ca", "mobile": "336-101-8286", "status": "pending", "order_date": "1/2/2023", "payment_method": "cod", "channel": "Mobile App" },
] as any[];
export default function page() {


    const OnHoldOrderData = [
        ...AllOrdersData.filter((item) => item.status === 'onhold')
    ] as any[]
    const PendingOrderData = [
        ...AllOrdersData.filter((item) => item.status === 'pending')
    ] as any[]
    const PickedOrderData = [
        ...AllOrdersData.filter((item) => item.status === 'picked')
    ] as any[]
    const DeliveredOrderData = [
        ...AllOrdersData.filter((item) => item.status === 'delivered')
    ] as any[]
    const CancelledOrderData = [
        ...AllOrdersData.filter((item) => item.status === 'cancelled')
    ] as any[]
    const OnWayOrderData = [
        ...AllOrdersData.filter((item) => item.status === 'onway')
    ] as any[]



    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between">
                <div>
                    <Heading className='leading-tight' title='All Orders' />
                    <p className='text-muted-foreground text-sm'>Manage Your Orders</p>
                </div>
                <Link href={'/orders/create-new'}>
                    <Button variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>
                </Link>
            </div>

            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className='gap-3'>
                        <TabsTrigger className='gap-2' value="all">All <Badge className='text-bg-primary-foreground ' variant="outline">{AllOrdersData?.length}</Badge> </TabsTrigger>
                        <TabsTrigger className='gap-2' value="on-hold">On Hold <Badge className='text-bg-primary-foreground' variant="outline">{OnHoldOrderData?.length}</Badge> </TabsTrigger>
                        <TabsTrigger className='gap-2' value="pending">Pending <Badge className='text-bg-primary-foreground' variant="outline">{PendingOrderData?.length}</Badge> </TabsTrigger>
                        <TabsTrigger className='gap-2' value="picked">Picked <Badge className='text-bg-primary-foreground' variant="outline"> {PickedOrderData?.length}</Badge></TabsTrigger>
                        <TabsTrigger className='gap-2' value="onway">On Way <Badge className='text-bg-primary-foreground' variant="outline"> {OnWayOrderData?.length}</Badge></TabsTrigger>
                        <TabsTrigger className='gap-2' value="cancelled">Cancelled <Badge className='text-bg-primary-foreground' variant="outline">{CancelledOrderData?.length}</Badge> </TabsTrigger>
                        <TabsTrigger className='gap-2' value="delivered">Delivered <Badge className='text-bg-primary-foreground' variant="outline">{DeliveredOrderData?.length}</Badge> </TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <DataTable searchKey='customer_name' columns={columns} data={AllOrdersData} />
                    </TabsContent>
                    <TabsContent value="on-hold">
                        <DataTable searchKey='customer_name' columns={columns} data={OnHoldOrderData} />
                    </TabsContent>
                    <TabsContent value="pending">
                        <DataTable searchKey='customer_name' columns={columns} data={PendingOrderData} />
                    </TabsContent>
                    <TabsContent value="picked">
                        <DataTable searchKey='customer_name' columns={columns} data={PickedOrderData} />
                    </TabsContent>
                    <TabsContent value="onway">
                        <DataTable searchKey='customer_name' columns={columns} data={OnWayOrderData} />
                    </TabsContent>
                    <TabsContent value="delivered">
                        <DataTable searchKey='customer_name' columns={columns} data={DeliveredOrderData} />
                    </TabsContent>
                    <TabsContent value="cancelled">
                        <DataTable searchKey='customer_name' columns={columns} data={CancelledOrderData} />
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    )
}

export { AllOrdersData }