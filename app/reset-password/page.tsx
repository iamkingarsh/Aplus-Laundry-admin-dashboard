import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/user-auth-form"
import { PasswordResetRequestForm } from "@/components/pass-reset-req-form"

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
    return (
        <>
            <div className="md:hidden">
                <Image
                    src="/assets/logos/PrimarySVG.svg"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="block dark:hidden"
                />
                <Image
                    src="/examples/authentication-dark.png"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="hidden dark:block"
                />
            </div>
            <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Log in
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-primary" />
                    <div className="relative font-bold z-20 flex items-center text-lg ">
                        <Image
                            src={"/assets/logos/SymbolWhite.svg"}
                            width={35}
                            height={35}
                            alt="Logo"
                            className="mr-2"
                        />
                        APLus Laundry
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;Oops! Looks like you forgot your Password, Don't worry we got you!&rdquo;
                            </p>

                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Reset Password
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email address and we will send you a link to reset your password.
                            </p>
                        </div>
                        <PasswordResetRequestForm />
                        <p className="px-8 text-center text-sm text-muted-foreground">

                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                I don't remember my email
                            </Link>{" "}


                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

