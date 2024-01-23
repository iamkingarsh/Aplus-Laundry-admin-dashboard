"use client"
import React, { useEffect } from 'react'
import Heading from './ui/heading'
import { ComboboxDemo } from './ui/combobox'
import { ModeToggle } from './theme-toggler'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuSub, DropdownMenuPortal, DropdownMenuGroup, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Cloud, CreditCard, Github, Keyboard, LifeBuoy, LogOutIcon, Mail, MessageSquare, Plus, PlusCircle, Settings, User, UserPlus, Users } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useGlobalModal } from '@/hooks/GlobalModal'
import { NewTeamMemberForm } from './forms/newTeamMemberForm'
import toast from 'react-hot-toast'
import { postData } from '@/axiosUtility/api'




function TopBar() {
    const router = useRouter()
    const modal = useGlobalModal()
    const [currentUserData, setCurrentUserData] = React.useState(null as any)

    console.log('sdgsdhg', currentUserData)

    const getCurrentData = async () => {

        try {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)AplusToken\s*=\s*([^;]*).*$)|^.*$/, '$1') as string;

            const result = await postData('/auth/currentuser',
                {
                    token: token
                }
            ); // Replace 'your-endpoint' with the actual API endpoint
            console.log(result.user)
            setCurrentUserData(result.user)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        getCurrentData()
    }, [])

    return (
        <div className='py-3 bg-primary-foreground sticky z-40 top-0 overflow-hidden px-6 border-b-2 flex justify-between'>
            <div>
                <ComboboxDemo />
            </div>
            <div className='flex items-center gap-4'>
                <ModeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className='w-8 h-8'>
                            <AvatarImage src={currentUserData?.profileImg} alt="@shadcn" />
                            <AvatarFallback>{currentUserData?.FullName?.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>

                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>

                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onSelect={() => router.push('/team')
                                }
                            >
                                <Users className="mr-2 h-4 w-4" />
                                <span>Team</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={
                                    () => {

                                        modal.title = "Invite A New Team Member"
                                        modal.description = "Invite anyone to your team by sending them an email!"
                                        modal.children = <NewTeamMemberForm gap={2} />
                                        modal.onOpen()
                                    }
                                }>
                                <Plus className="mr-2 h-4 w-4" />
                                <span>New Team Member</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onSelect={() => { router.push('/login'); toast.success('Logged Out Successfully!') }}

                        >
                            <LogOutIcon className="mr-2 h-4 w-4" />
                            <span>Log out</span>

                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </div>
    )
}

export default TopBar