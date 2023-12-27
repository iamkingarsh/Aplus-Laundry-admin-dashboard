"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "../ui/icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }


export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [otpSent, setOtpSent] = React.useState<boolean>(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            setOtpSent(true)
        }, 3000)
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            {!otpSent ? <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Login to Your Admin Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                    Only Admins can access this page.
                </p>
            </div> :
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Verify OTP
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter the OTP sent to your registered email!
                    </p>
                </div>

            }
            <form onSubmit={onSubmit}>
                {!otpSent ?
                    <div className="grid gap-2">

                        <div className="grid gap-1">
                            <Label htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"

                                disabled={isLoading}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Get OTP
                        </Button>
                    </div> :
                    <div className="grid gap-2">

                        <div className="grid gap-1">
                            <Label htmlFor="email">
                                Enter OTP
                            </Label>
                            <Input
                                id="email"
                                placeholder="
                                Enter OTP"
                                type="number"
                                autoCapitalize="none"
                                autoComplete="otp"
                                autoCorrect="off"
                            />
                        </div>

                        <Button disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Verify
                        </Button>
                    </div>
                }
            </form>


        </div>
    )
}