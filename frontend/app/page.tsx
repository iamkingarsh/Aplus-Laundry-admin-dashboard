"use client"
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

