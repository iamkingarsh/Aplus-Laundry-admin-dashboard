import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Sidebar } from '@/components/sidebar'
import TopBar from '@/components/topbar'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Admin Dashboard| APLus Laundry',
    description: 'Admin dashboard for APlus Laundry',
}

interface DashboardLayoutProps {
    children: React.ReactNode
}


export default function DashboardLayout({
    children
}: DashboardLayoutProps) {
    return (
        <>
            <div className='flex flex-row'>
                <Sidebar />
                <div className='flex w-full flex-col'>
                    <TopBar />
                    {children}
                </div>
            </div>
        </>
    )
}
