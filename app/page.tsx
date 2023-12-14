"use client"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/forms/userAuthForm"
import { BrandName } from "@/lib/constants"
import { useRouter } from "next/navigation"
import React from "react"


export default function AuthenticationPage() {
  const signedIn = true
  const router = useRouter()
  React.useEffect(() => {
    if (signedIn) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }

  }, [router, signedIn])
  return (
    <>

    </>
  )
}

