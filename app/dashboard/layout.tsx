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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={` ${inter.className}  `}>
                <div className='flex flex-row'>
                    <Sidebar />
                    <div className='flex w-full flex-col'>
                        <div className='sticky top-0 z-50'>
                            <TopBar />
                        </div>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    )
}
