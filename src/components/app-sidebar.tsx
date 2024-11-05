'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from './ui/separator'
import { LogoutButton } from './logout-button'
import { useUserProfile } from '@/contexts/user-profile-provider'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function AppSidebar() {
  const { userProfile } = useUserProfile()

  const router = useRouter()

  useEffect(() => {
    const savedToken = localStorage.getItem('CRUD-APP:token')
    if (!savedToken) {
      router.push('/login')
    }
  }, [])

  return (
    <>
      <Sidebar>
        <SidebarHeader className="font-bold">
          <div className="flex items-center justify-between">
            <h1 className="font-bold">Dashboard</h1>
            <SidebarTrigger className="md:hidden" />
          </div>
        </SidebarHeader>
        <Separator />
        {userProfile && (
          <>
            <SidebarContent className="mt-10">
              <SidebarGroup className="flex items-center justify-center gap-5">
                <h1 className="mt-6 font-bold text-center">
                  {userProfile.name}
                </h1>
                <span>{userProfile.role}</span>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="h-16">
              <LogoutButton />
            </SidebarFooter>
          </>
        )}
      </Sidebar>
    </>
  )
}
