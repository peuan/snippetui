"use client"

import { UserAuthForm } from "@/components/user-auth-form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  if (session) {
    router.push("/")
  }
  return (
    <div className="container flex h-[60vh] w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to SnippetUI
          </h1>
        </div>
        <UserAuthForm />
      </div>
    </div>
  )
}
