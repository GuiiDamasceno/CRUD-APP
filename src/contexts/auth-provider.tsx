'use client'

import { useRouter } from 'next/navigation'
import { createContext, useEffect, useState, type ReactNode } from 'react'

export interface AuthProviderProps {
  children: ReactNode
}

const SessionContext = createContext({})

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const savedToken = localStorage.getItem('CRUD-APP:token')
    if (savedToken) {
      setToken(savedToken)
    } else {
      router.push('/login')
    }
  }, [router, token])

  return (
    <SessionContext.Provider value={{}}>{children}</SessionContext.Provider>
  )
}
