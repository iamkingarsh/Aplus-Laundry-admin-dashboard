import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { AllData } from '../page';
import { Mail, MapPin, Pencil, Phone, Pin, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AllOrdersData } from '../../orders/page';

interface Props {
    params: {
        customerid: string;
    }

}


const customerDetails = [

    AllData[0].status = 'Active',
    AllData[0].emailVerified = true,
    AllData[0].mobileVerified = true,
    AllData[0].city = 'Hyderabad',
    AllData[0].pincode = '500050',
    AllData[0].state = 'Telangana',
    AllData[0].orders = [
        {
            order_id: '#a2855',

        },
        {

            order_id: '#fa725',


        },
        {
            order_id: '#ee055',

        },
        {
            order_id: '#0a133',


        }
    ]
]
const customerData = { ...AllData[0], ...customerDetails };


const orderIDs = customerData.orders.map((order: any) => order.order_id)





export default function CustomerPage({ params }: Props) {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between">
                <div>
                    <Heading className='leading-tight' title={`Customer Details - ${customerData.fullname}`} />
                    <p className='text-muted-foreground text-sm'>Customer ID: {params.customerid}</p>
                </div>
                <Link href={`/customers/edit/${params.customerid}`}>
                    <Button variant='default'>Edit Customer Details <Pencil className='w-4 ml-2' /></Button>
                </Link>
            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto grid  grid-cols-2 gap-4 py-10">
                <Card >
                    <CardHeader>
                        <Heading className='text-lg' title='Personal Information' />
                    </CardHeader>
                    <Separator className='mb-2' orientation='horizontal' />
                    <CardContent>


                        <div className="flex flex-col gap-3">
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center'>
                                    <User className='w-6 h-6 mr-3' />
                                    <div className="flex flex-col">
                                        <span className="text-muted-foreground  text-sm">Name</span>
                                        <span className="text-md">{customerData.fullname}</span>
                                    </div>
                                </div>
                                <Avatar className='w-8  border-muted border-2 h-8 mr-2'>
                                    <AvatarImage src={customerData.profilepic} alt="@shadcn" />
                                    <AvatarFallback>{customerData.fullname[0]}</AvatarFallback>
                                </Avatar>
                            </div>
                            <Separator orientation='horizontal' />

                            <div className='flex items-center'>
                                <Mail className='w-6 h-6 mr-3' />
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground  text-sm">Email</span>
                                    <div className='flex gap-2'>

                                        <Link href={`mailto:${customerData.email}`} className="text-md">{customerData.email}</Link> {customerData.emailVerified === true ? <Badge className='ml-2' variant="default" >Verified</Badge> : <Badge className='ml-2' variant="secondary" >Unverified</Badge>}
                                    </div>
                                </div>
                            </div>
                            <Separator orientation='horizontal' />

                            <div className='flex items-center'>
                                <Phone className='w-6 h-6 mr-3' />
                                <div className="flex flex-col">
                                    <span className=" text-muted-foreground  text-sm">Mobile</span>
                                    <div className='flex gap-2'>

                                        <Link href={`tel:${customerData.mobile}`} className="text-md">{customerData.mobile}</Link>
                                        {customerData.mobile === true ? <Badge className='ml-2' variant="default" >Verified</Badge> : <Badge className='ml-2' variant="secondary"  >Unverified</Badge>}
                                    </div>
                                </div>
                            </div>
                            <Separator orientation='horizontal' />

                            <div className='flex items-start'>
                                <MapPin className='w-6 h-6 mr-3' />
                                <div className='flex flex-col gap-2'>
                                    <div className="flex flex-col">
                                        <span className=" text-muted-foreground  text-sm">Address</span>
                                        <Link href={``} className="text-md">{customerData.address}</Link>

                                    </div>
                                    <div className='flex gap-6'>

                                        <div className="flex flex-col">
                                            <span className=" text-muted-foreground  text-sm">City</span>
                                            <Link href={``} className="text-md">{customerData.city}</Link>

                                        </div>
                                        <div className="flex flex-col">
                                            <span className=" text-muted-foreground  text-sm">State</span>
                                            <Link href={``} className="text-md">{customerData.state}</Link>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className=" text-muted-foreground  text-sm">Pincode</span>
                                            <Link href={``} className="text-md">{customerData.pincode}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </CardContent>

                </Card>
                <div className='gap-4 flex flex-col'>

                    <Card >
                        <CardHeader>
                            <div className='flex items-center justify-between'>
                                <Heading className='text-lg' title='Recent Orders' />
                                <Button variant='link'>View All Orders</Button>
                            </div>
                        </CardHeader>
                        <Separator className='mb-4' orientation='horizontal' />
                        <CardContent>

                            {
                                AllOrdersData.filter((order: any) => orderIDs.includes(order.order_id)
                                ).slice(0, 5).map((order: any, index: number) => (
                                    <Card key={index} className='flex justify-between p-2 px-4 my-2 items-center'>


                                        <div className='flex items-center'>
                                            <Pin className='w-6 h-6 mr-3' />
                                            <div className="flex flex-col">
                                                <span className="text-muted-foreground  text-sm">Order ID</span>
                                                <span className="text-sm">{order.order_id}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-muted-foreground  text-sm">Order Date</span>
                                            <span className="text-sm">{order.order_date}</span>
                                        </div>
                                        <div className="flex flex-col ml-4">
                                            <span className="text-muted-foreground  text-sm">Order Status</span>
                                            <div className='flex items-center gap-1'>
                                                <div
                                                    className={`w-2 h-2 rounded-full mr-2 ${order.status === "onhold" && "bg-yellow-500"
                                                        } ${order.status === "pending" && "bg-blue-500"
                                                        } ${order.status === "picked" && "bg-green-500"
                                                        } ${order.status === "onway" && "bg-purple-500"
                                                        } ${order.status === "delivered" && "bg-green-500"
                                                        } ${order.status === "cancelled" && "bg-red-500"
                                                        }`} />
                                                <span className="text-sm">

                                                    {order.status}
                                                </span>

                                            </div>
                                        </div>
                                        <Button variant='link' size='sm' className='ml-4 text-sm'>View Order</Button>



                                    </Card>
                                ))

                            }
                            <CardFooter className='flex justify-center items-center gap-2'>
                                <span className='text-sm text-center'>Showing recent {AllOrdersData.filter((order: any) => orderIDs.includes(order.order_id)).length > 5 ? '5 ' : AllOrdersData.filter((order: any) => orderIDs.includes(order.order_id)).length} orders of {customerData.fullname}</span>
                            </CardFooter>
                        </CardContent>

                    </Card>
                </div>
            </div>


        </div>

    )
}

export { customerData }


