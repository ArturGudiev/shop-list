"use client"
import { useSession, signOut } from "next-auth/react"

export default function UserMenu() {
    const { data: session } = useSession()

    if (!session?.user) return null
    console.log(session.user);
    return (

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
                src={session.user.image || ''}
                alt="Profile"
                style={{ width: 32, height: 32, borderRadius: '50%' }}
            />
            <span>{session.user.name}</span>
            <button onClick={() => signOut()}>Sign out</button>
            <div>{session.user.name}</div>
        </div>
    )
}
