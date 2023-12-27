import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/forms/userAuthForm"
import { BrandName } from "@/lib/constants"

export const metadata: Metadata = {
  title: 'Login to Admin Dashboard | APLus Laundry',
  description: 'Login to Admin Dashboard | APLus Laundry',
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
          src="/assets/logos/PrimarySVG.svg"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/reset-password"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Reset Password
        </Link>
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

            <UserAuthForm />

          </div>
        </div>
      </div>
    </>
  )
}

