'use client'

import { useUserProfile } from '@/contexts/user-profile-provider'
import { TableHead } from '../ui/table'

export function TableHeadAdmin() {
  const { userProfile } = useUserProfile()

  return (
    <>
      {userProfile?.role === 'admin' && (
        <>
          <TableHead>Editar</TableHead>
          <TableHead>Excluir</TableHead>
        </>
      )}
    </>
  )
}
