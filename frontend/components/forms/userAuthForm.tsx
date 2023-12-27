"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "../ui/icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { tr } from "date-fns/locale"
import { set } from "date-fns"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }


export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState<string>("")
    const [error, setError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<string>("")
    const [otpSent, setOtpSent] = React.useState<boolean>(false)

    const [otpValue, setOtpValue] = React.useState<string>("")
    const [otpError, setOtpError] = React.useState<boolean>(false)
    const [otpErrorMessage, setOtpErrorMessage] = React.useState<string>("")
    const [validOtp, setValidOtp] = React.useState<boolean>(false)

    const [countDown, setCountDown] = React.useState<number>(60)

    const validEmail = "mohammedarshad.arsh@gmail.com"
    const otp = "123456"

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()

        if (email === "") {
            setError(true)
            setErrorMessage("Email cannot be empty")
            return
        }
        else if (!email.includes("@")) {
            setError(true)
            setErrorMessage("Invalid Email")
            return
        }
        else if (email !== validEmail) {
            setError(true)
            setErrorMessage("Email not registered")
            return
        }
        else {
            setError(false)
            setErrorMessage("")
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
                setOtpSent(true)
            }, 3000)
        }

    }

    async function onOtpSubmit(event: React.SyntheticEvent) {
        event.preventDefault()

        if (otpValue === "") {
            setOtpError(true)
            setOtpErrorMessage("OTP cannot be empty")
            return
        }
        else if (otpValue !== otp) {
            setOtpError(true)
            setOtpErrorMessage("Invalid OTP")
            return
        }
        else {
            setOtpError(false)
            setOtpErrorMessage("")
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
                setValidOtp(true)
            }, 3000)
        }

    }



    const handleRedirect = () => {
        setTimeout(() => {
            window.location.href = "/dashboard"
        }, 3000)
    }

    React.useEffect(() => {
        const handleCountDown = () => {
            if (otpSent && countDown > 0) {

                setTimeout(() => {
                    setCountDown(countDown - 1)
                }, 1000)
            }
        }
        if (validOtp) {
            handleRedirect()
        }

        if (otpSent) {
            handleCountDown()
        }
    }, [validOtp, otpSent, countDown])

    const handleResend = () => {
        setCountDown(60)
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            {otpSent && validOtp ? <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    OTP Verified
                </h1>
                <p className="text-sm text-muted-foreground">
                    Redirecting to Dashboard in 3 seconds...
                </p>
            </div> :


                !otpSent ? <div className="flex flex-col space-y-2 text-center">
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

            {otpSent && validOtp ? <div className="flex flex-col space-y-2 text-center">

            </div> :

                !otpSent ?
                    <form onSubmit={onSubmit}>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                    disabled={isLoading}
                                />
                                {error && <span className="text-red-500 text-xs leading-tight">{errorMessage}</span>}
                            </div>
                            <Button
                                type="submit"
                                disabled={isLoading}>
                                {isLoading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Get OTP
                            </Button>
                        </div>
                    </form>
                    :
                    <form onSubmit={onOtpSubmit}>


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
                                    value={otpValue}
                                    onChange={(e) => setOtpValue(e.target.value)}
                                    autoCapitalize="none"
                                    autoComplete="otp"
                                    autoCorrect="off"
                                />
                                {otpError && <span className="text-red-500 text-xs leading-tight">{otpErrorMessage}</span>}
                            </div>

                            <Button disabled={isLoading}>
                                {isLoading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Verify
                            </Button>

                            <div className="flex flex-col space-y-2 text-center">
                                <p className="text-sm text-muted-foreground">
                                    Didn&apos;t receive OTP?{otpSent && countDown == 0 ? <a onClick={handleResend} >Resend</a> : <span className="text-primary opacity-50"> Resend OTP In {countDown}</span>}
                                </p>

                            </div>
                        </div>
                    </form>

            }


        </div>
    )
}