import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { AllData } from '../page';
import { Mail, Phone, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface Props {
    params: {
        customerid: string;
    }

}

const customerData = AllData[0];


export default function CustomerPage({ params }: Props) {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between">
                <div>
                    <Heading className='leading-tight' title={`Customer Details - ${customerData.fullname}`} />
                    <p className='text-muted-foreground text-sm'>Customer ID: {params.customerid}</p>
                </div>

            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto grid  grid-cols-2 py-10">
                <Card >
                    <CardHeader>
                        <Heading className='text-lg' title='Personal Information' />
                    </CardHeader>
                    <Separator className='mb-2' orientation='horizontal' />
                    <CardContent>


                        <div className="flex flex-col gap-3">
                            <div className='flex items-center'>
                                <User className='w-6 h-6 mr-2' />
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground  text-sm">Name</span>
                                    <span className="text-md">{customerData.fullname}</span>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <Mail className='w-6 h-6 mr-2' />
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground  text-sm">Email</span>
                                    <span className="text-md">{customerData.email}</span>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <Phone className='w-6 h-6 mr-2' />
                                <div className="flex flex-col">
                                    <span className=" text-muted-foreground  text-sm">Mobile</span>
                                    <span className="text-md">{customerData.mobile}</span>
                                </div>
                            </div>
                        </div>


                    </CardContent>

                </Card>
            </div>


        </div>

    )
}



