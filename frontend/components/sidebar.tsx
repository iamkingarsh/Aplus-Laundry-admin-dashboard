'use client';
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { ArrowLeftFromLine, ArrowRightFromLine, LucideLayoutDashboard } from "lucide-react"
import LogoComponent from "./logo"
import sidebarTabs, { BrandName } from "@/lib/constants"
import { useState } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import checkIfOwner from "@/utils/checkIfOwner";
import { ta } from "date-fns/locale";


interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    // playlists: Playlist[]
}
export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()
    const router = useRouter()
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const owner = checkIfOwner()

    return (
        <div className={cn(collapsed ? `sticky top-0 text-black dark:text-white w-[5dvw] transition-all transit h-[100dvh] duration-500 overflow-hidden border-r-2` : ` sticky top-0 transition-all duration-500 text-black dark:text-white w-[20dvw] h-[100dvh] overflow-hidden border-r-2`, className)}>
            <div className="space-y-4 h-full pb-4">
                <div className="px-3 flex flex-col h-full justify-between  py-2">
                    <div>
                        {collapsed ? <div className="flex py-2 border-b-2 px-3 mb-4 gap-2 items-center">

                            <LogoComponent width={10} height={10} className="w-9 h-9" />
                        </div> :
                            <div className="flex py-2 border-b-2 px-4 mb-4 gap-2 items-center">
                                <LogoComponent width={10} height={10} className="w-9 h-9" />
                                <h2 className="text-xl font-bold tracking-tight leading-tight">
                                    {BrandName}
                                </h2>

                            </div>
                        }

                        <div className="space-y-2">
                            {owner && sidebarTabs.map((tab: any, i: any) => (
                                <Button onClick={() => router.push(tab?.path)} key={i}
                                    variant={
                                        pathname.includes(tab.path) ? 'secondary' : 'ghost'
                                    }
                                    className="w-full justify-start flex items-center">
                                    {collapsed ?
                                        <TooltipProvider delayDuration={500}>
                                            <Tooltip>
                                                <TooltipTrigger className="w-full">
                                                    <div>
                                                        {tab.icon}
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    {tab.title}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        : <div className="flex items-center">
                                            {tab.icon}
                                            {tab.title}
                                        </div>}

                                </Button>

                            ))}
                            {
                                !owner && sidebarTabs.filter((tab: any) => {
                                    return tab.title !== 'App Banners' && tab.title !== 'Services' && tab.title !== 'Categories' && tab.title !== 'Laundry Items' && tab.title !== 'Revenue' && tab.title !== 'Coupons' && tab.title !== 'Team'
                                }).map((tab: any, i: any) => (
                                    <Button onClick={() => router.push(tab?.path)} key={i}
                                        variant={
                                            pathname.includes(tab.path) ? 'secondary' : 'ghost'
                                        }
                                        className="w-full justify-start flex items-center">
                                        {collapsed ?
                                            <TooltipProvider delayDuration={500}>
                                                <Tooltip>
                                                    <TooltipTrigger className="w-full">
                                                        <div>
                                                            {tab.icon}
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        {tab.title}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            : <div className="flex items-center">
                                                {tab.icon}
                                                {tab.title}
                                            </div>}

                                    </Button>

                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <Button onClick={() => setCollapsed(!collapsed)} variant="secondary" className="w-full justify-start">
                            {collapsed ?
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="w-full"> <div>

                                            <ArrowRightFromLine className="mr-2 h-4 w-4" />

                                        </div> </TooltipTrigger>
                                        <TooltipContent>
                                            <p>  Expand</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                :
                                <div className="flex items-center">
                                    <ArrowLeftFromLine className="mr-2 h-4 w-4" />
                                    Collapse
                                </div>}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}