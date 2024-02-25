"use client"
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { columns } from './components/columns'
import { fetchData } from '@/axiosUtility/api'

export default function Page() {
    const [TeamData, setTeamData] = React.useState([])
    // const TeamData = [

    //     {
    //         id: 'lp12359asd',
    //         profilepic: 'https://images.unsplash.com/photo-1627307930011-0e4f9d7d9d2f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
    //         fullname: 'Mujahed',
    //         email: 'test2@apluslaundry.com',
    //         address: 'Ongole, India',
    //         role: 'Manager',
    //         allowedAccess: ['Dashboard', 'Orders', 'Customers', 'delivery-partners'],
    //         mobile: '9876543210',
    //     },
    //     {
    //         id: 'lp12359asd',
    //         profilepic: 'https://images.unsplash.com/photo-1627307930011-0e4f9d7d9d2f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
    //         fullname: 'Fareed',
    //         email: 'test@apluslaundry.com',
    //         address: 'Ongole, India',
    //         role: 'Manager',
    //         allowedAccess: ['Dashboard', 'Orders', 'Customers', 'delivery-partners'],
    //         mobile: '9876543210',
    //     },

    // ]
    const getData = async () => {
        try {
            const result = await fetchData('/auth/getallTeamMembers'); // Replace 'your-endpoint' with the actual API endpoint
            console.log(result)
            setTeamData(result)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between items-center">
                <div>
                    <Heading className='leading-tight' title='Team' />
                    <p className='text-muted-foreground text-sm'>Manage Your Team Here!</p>
                </div>
                <Link href={'/team/add-new'}>
                    <Button variant='default'>New Team Member <PlusIcon className='w-4 ml-2' /></Button>
                </Link>
            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">

                <DataTable data={TeamData} searchKey='email' columns={columns} />


            </div>
        </div>
    )
}
