'use client'

import type { UserProfileProps } from '@/app/(dashboard)/page'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { toast } from 'sonner'

export interface UserProfileContextProps {
  children: ReactNode
}

interface UserProfileContextValue {
  userProfile: UserProfileProps | null
}

const UserProfileContext = createContext({} as UserProfileContextValue)

export function UserProfile({ children }: UserProfileContextProps) {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<UserProfileProps | null>(null)

  async function getUserProfile() {
    try {
      api.interceptors.request.use((config) => {
        const token = localStorage.getItem('CRUD-APP:token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      })

      const response = await api.get('/users/me')
      setUserProfile(response.data)

      return response.data
    } catch (error) {
      toast.error('Ocorreu um erro ao carregar o perfil do usuário')
    }
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('CRUD-APP:token')
    if (savedToken) {
      getUserProfile()
    } else {
      router.push('/login')
    }
  }, [])

  return (
    <UserProfileContext.Provider value={{ userProfile }}>
      {children}
    </UserProfileContext.Provider>
  )
}

export const useUserProfile = () => useContext(UserProfileContext)
