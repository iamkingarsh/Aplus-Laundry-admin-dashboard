"use client";
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Icons } from '@/components/ui/icons';
import { BrandName } from '@/lib/constants'
import { error } from 'console';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
    params: {
        invitecode: string
    }
}
const validInviteCode = "adsgawhwhw2325dfb27dsgdo"

export default function AcceptInvitePage({ params }: Props) {

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const handleInvite = () => {
        // api call to check if invite code is valid

        // if valid, create user and redirect to login page

        //dummy code verification
        setLoading(true)
        if (params.invitecode === validInviteCode) {
            setTimeout(() => {
                setLoading(false)
                console.log('valid invite code')
                toast.success('Invite Accepted')
            }, 2000);
        } else {
            setTimeout(() => {
                setLoading(false)
                setError('Invalid Invite Code / invite code expired')
                console.log('invalid invite code / invite code expired')
            }, 2000);

        }
    }


    return (

        <>
            {params.invitecode === validInviteCode ?
                <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

                    <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:text-black dark:border-r lg:flex">
                        <div className="absolute inset-0 bg-primary" />
                        <div className="relative z-20 flex items-center text-lg font-bold">
                            <Image
                                src={"/assets/logos/SymbolWhite.svg"}
                                width={35}
                                height={35}
                                alt="Logo"
                                className="mr-2 dark:invert"
                            />
                            {BrandName}
                        </div>
                        <div className="relative z-20 mt-auto">
                            <blockquote className="space-y-2">
                                <p className="text-lg">
                                    &ldquo;A Great way to Manage Your Orders.&rdquo;
                                </p>
                                <footer className="text-sm">Created By Team DesignerDudes</footer>
                            </blockquote>
                        </div>
                    </div>
                    <div className="lg:p-8">
                        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                            <div>

                                <Heading title='Accept Invitation' />
                                <p className=' text-gray-500 text-sm dark:text-gray-400'>You have been invited to join {BrandName}, please accept the invitation to continue.</p>
                            </div>
                            {/* <AcceptInviteForm invitecode={params.invitecode} /> */}
                            <Button disabled={loading} onClick={handleInvite} variant='default'>
                                {loading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Accept Invite

                            </Button>
                            {error && <p className='text-red-500 text-sm dark:text-red-400'>{error}</p>}


                        </div>
                    </div>
                </div>
                :
                <div className="h-screen flex flex-col justify-center items-center">

                    <Heading className='text-red-500 text-center' title='Invalid Invitation' />
                    <p className=' text-gray-500 text-sm text-center dark:text-gray-400'>The invitation you are trying to accept is invalid or has been expired.</p>
                    <Link href='/'>
                        <Button variant="secondary" className='mt-4'>Go Back</Button>
                    </Link>


                </div>
            }

        </>
    )
}


