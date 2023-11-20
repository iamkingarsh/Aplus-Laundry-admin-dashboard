'use client';
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { ArrowLeftFromLine, ArrowRightFromLine, LucideLayoutDashboard } from "lucide-react"
import LogoComponent from "./logo"
import sidebarTabs from "@/lib/constants"
import { useEffect, useState } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";


interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    // playlists: Playlist[]
}
export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()
    const router = useRouter()
    const [collapsed, setCollapsed] = useState<boolean>(false)
    console.log(collapsed)
    return (
        <div className={cn(collapsed ? `sticky top-0 text-black dark:text-white w-[5dvw] h-[100dvh] overflow-hidden border-r-2` : ` sticky top-0 text-black dark:text-white w-[20dvw] h-[100dvh] overflow-hidden border-r-2`, className)}>
            <div className="space-y-4 h-full pb-4">
                <div className="px-3 flex flex-col h-full justify-between  py-2">
                    <div>
                        {collapsed ? <div className="flex py-2 border-b-2 px-3 mb-4 gap-2 items-center">

                            <LogoComponent width={10} height={10} className="w-9 h-9" />
                        </div> :
                            <div className="flex py-2 border-b-2 px-4 mb-4 gap-2 items-center">



                                <LogoComponent width={10} height={10} className="w-9 h-9" />
                                <h2 className=" text-xl font-bold tracking-tight">
                                    APlus Laundry
                                </h2>

                            </div>
                        }

                        <div className="space-y-2">
                            {sidebarTabs.map((tab: any, i: any) => (
                                <TooltipProvider key={i}>
                                    <Tooltip>
                                        <TooltipTrigger className=" w-full items-center justify-start ">
                                            <Button onClick={() => router.push(tab?.path)} key={i} variant={
                                                tab.path == pathname ? 'secondary' : 'ghost'

                                            } className="w-full justify-start flex items-center">
                                                {collapsed ? <div>
                                                    {tab.icon}
                                                </div> : <div className="flex items-center">
                                                    {tab.icon}
                                                    {tab.title}
                                                </div>}

                                            </Button></TooltipTrigger>
                                        <TooltipContent>
                                            <p>{tab.title}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                            ))}


                        </div>
                    </div>
                    <div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="w-full">
                                    <Button onClick={() => setCollapsed(!collapsed)} variant="secondary" className="w-full justify-start">
                                        {collapsed ? <div>

                                            <ArrowRightFromLine className="mr-2 h-4 w-4" />
                                        </div> :
                                            <div className="flex items-center">
                                                <ArrowLeftFromLine className="mr-2 h-4 w-4" />

                                                Collapse
                                            </div>}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>  {collapsed ? 'Expand' : 'Collapse'}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    </div>
                </div>
                {/* <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Create
                    </h2>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4"
                            >
                                <path d="M21 15V6" />
                                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                <path d="M12 12H3" />
                                <path d="M16 6H3" />
                                <path d="M12 18H3" />
                            </svg>
                            New Order
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4"
                            >
                                <circle cx="8" cy="18" r="4" />
                                <path d="M12 18V2l7 4" />
                            </svg>
                            New Category
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            Made for You
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4"
                            >
                                <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                                <circle cx="17" cy="7" r="5" />
                            </svg>
                            Artists
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4"
                            >
                                <path d="m16 6 4 14" />
                                <path d="M12 6v14" />
                                <path d="M8 8v12" />
                                <path d="M4 4v16" />
                            </svg>
                            Albums
                        </Button>
                    </div>
                </div> */}
                {/* <div className="py-2">
                    <h2 className="relative px-7 text-lg font-semibold tracking-tight">
                        Playlists
                    </h2>
                    <ScrollArea className="h-[300px] px-1">
                        <div className="space-y-1 p-2">
                          {playlists?.map((playlist, i) => (
                <Button
                  key={`${playlist}-${i}`}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M21 15V6" />
                    <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <path d="M12 12H3" />
                    <path d="M16 6H3" />
                    <path d="M12 18H3" />
                  </svg>
                  {playlist}
                </Button>
              ))}
                        </div>
                    </ScrollArea>
                </div> */}
            </div>
        </div>
    )
}