'use client'

import { LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  function handleLogout() {
    localStorage.removeItem('CRUD-APP:token')
    router.push('/login')
  }

  return (
    <>
      <Button variant={'destructive'} onClick={handleLogout}>
        <span>Sair</span>
        <LogOut size={24} />
      </Button>
    </>
  )
}
