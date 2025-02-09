'use client'

import { useSession } from 'next-auth/react'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'

export default function ClientLayoutWrapper ({ 
  children, 
  session: initialSession 
}: { 
  children: React.ReactNode, 
  session: any 
}) {
  const { data: clientSession } = useSession()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Determine the actual session (prefer client-side session)
  const activeSession = clientSession || initialSession

  if (!isClient) {
    return null
  }

  return activeSession ? (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  ) : (
    <main className="flex-grow">
      {children}
    </main>
  )
}
