import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
// import { settingsSideBarTabs } from "@/lib/constants"
import { SettingsSidebar } from "@/components/settingsSideBar"
import Heading from "@/components/ui/heading"
// import { SidebarNav } from "@/components/sidebar-nav"

export const metadata: Metadata = {
    title: "Forms",
    description: "Advanced form example using react-hook-form and Zod.",
}



interface SettingsLayoutProps {
    children: React.ReactNode
}

const settingsSideBarTabs = [
    {
        title: "Profile",
        href: "/settings",
    },
    {
        title: "Account",
        href: "/settings/account",
    },
    {
        title: "Appearance",
        href: "/settings/appearance",
    },
    {
        title: "Notifications",
        href: "/settings/notifications",
    },
    {
        title: "Display",
        href: "/settings/display",
    },
]

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <>

            <div className="w-full space-y-2 h-full flex p-6 flex-col">
                <div className="topbar w-full flex justify-between items-center">
                    <div>
                        <Heading className='leading-tight' title='Settings' />
                        <p className='text-muted-foreground text-sm'>Manage Your Account Settings and Preferences</p>
                    </div>
                </div>
                <Separator orientation='horizontal' />
                <div className="flex flex-col space-y-8 p-2 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className=" lg:w-1/5">
                        <SettingsSidebar items={settingsSideBarTabs} />
                    </aside>
                    <Separator orientation='vertical' />

                    <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
            </div>
        </>
    )
}