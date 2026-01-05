"use client"
import { useSession } from "next-auth/react"

export default function SessionDebug() {
  const { data: session, status } = useSession()
  
  return (
    <div className="mb-4 p-4 border border-blue-300 dark:border-blue-600 rounded-lg bg-blue-50 dark:bg-blue-900">
      <p className="font-mono text-xs text-blue-800 dark:text-blue-200">
        <span className="font-semibold">Client Session Status:</span> {status}
        <br />
        <span className="font-semibold">Has Session:</span> {session ? "Yes" : "No"}
        <br />
        {session?.user && (
          <>
            <span className="font-semibold">User Name:</span> {session.user.name || "N/A"}
            <br />
            <span className="font-semibold">User ID:</span> {session.user.id || "N/A"}
          </>
        )}
      </p>
    </div>
  )
}

