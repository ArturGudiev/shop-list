"use client"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()
  
  const handleSignOut = async () => {
    try {
      // Sign out without redirect first
      await signOut({ 
        redirect: false,
        callbackUrl: window.location.href // Use full URL with port
      })
      // Then manually redirect to the same page
      router.refresh()
      window.location.href = window.location.origin + window.location.pathname
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }
  
  return (
    <button
      onClick={handleSignOut}
      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
    >
      Log out
    </button>
  )
}

