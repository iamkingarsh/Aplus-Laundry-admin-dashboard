
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { ServerIcon } from 'lucide-react'
import React from 'react'

const LaundrtProducts = [
    {
        title: 'Shirts',
        value: 'shirts',
        icon: <ServerIcon className="w-3 mr-2" />,
        price: 50,
        status: 'Active'
    },
    {
        title: 'TShirts',
        value: 'tshirts',
        icon: <ServerIcon className="w-3 mr-2" />,
        price: 50,
        status: 'Active'
    },
    {
        title: 'Trousers',
        value: 'trousers',
        icon: <ServerIcon className="w-3 mr-2" />,
        price: 50,
        status: 'Active'
    },
    {
        title: 'Jeans',
        value: 'jeans',
        icon: <ServerIcon className="w-3 mr-2" />,
        price: 50,
        status: 'Active'
    },
    {
        title: 'Shorts',
        value: 'shorts',
        icon: <ServerIcon className="w-3 mr-2" />,
        price: 50,
        status: 'Active'
    },
    {
        title: 'Kurtas',
        value: 'kurtas',
        icon: <ServerIcon className="w-3 mr-2" />,
        price: 50,
        status: 'Active'
    },
    {
        title: 'Kurtis',
        value: 'kurtis',
        icon: <ServerIcon className="w-3 mr-2" />,
        price: 50,
        status: 'Active'
    },
    {
        title: 'Sarees',
        value: 'sarees',
        icon: <ServerIcon className="w-3 mr-2" />,
        price: 50,
        status: 'Active'
    },
    {
        title: 'Bedsheets',
        value: 'bedsheets',
        icon: <ServerIcon className="w-3 mr-2" />,
        price: 50,
        status: 'Active'
    },
    {
        title: 'Blankets',
        value: 'blankets',
        icon: <ServerIcon className="w-3 mr-2" />,
        price: 50,
        status: 'Active'
    },
    {
        title: 'Curtains',
        value: 'curtains',
        icon: <ServerIcon className="w-3 mr-2" />,
        price: 50,
        status: 'Active'
    },
    {
        title: 'CushionCovers',
        value: 'cushioncovers',

        icon: <ServerIcon className="w-3 mr-2" />,
        price: 50,
        status: 'Active'
    },
    {
        title: 'PillowCovers',
        value: 'pillowcovers',

        icon: <ServerIcon className="w-3 mr-2" />,
        price: 50,
        status: 'Active'
    },
    {
        title: 'Towels',
        value: 'towels',

        icon: <ServerIcon className="w-3 mr-2" />,
        price: 50,
        status: 'Active'
    },
    {
        title: 'Masks',
        value: 'masks',

        icon: <ServerIcon className="w-3 mr-2" />,
        price: 50,
        status: 'Active'
    },
    {
        title: 'Others',
        value: 'others',

        icon: <ServerIcon className="w-3 mr-2" />,
        price: 50,
        status: 'Active'
    },
]

export default function page() {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between items-center">
                <div>
                    <Heading className='leading-tight' title='Products' />
                    <p className='text-muted-foreground text-sm'>Manage Laundry Products</p>
                </div>
            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">

            </div>

        </div>
    )
}
