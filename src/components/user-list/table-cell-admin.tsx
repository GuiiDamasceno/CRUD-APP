'use client'

import { useUserProfile } from '@/contexts/user-profile-provider'
import { TableCell } from '../ui/table'
import { EditUserButton } from './edit-user-button'
import { DeleteUserButton } from './delete-user-button'
import type { UserProfileProps } from '@/app/(dashboard)/page'

interface TableCellAdminProps {
  userId: string
  user: UserProfileProps
}

export function TableCellAdmin({ user, userId }: TableCellAdminProps) {
  const { userProfile } = useUserProfile()

  return (
    <>
      {userProfile?.role === 'admin' && (
        <>
          <TableCell>
            <EditUserButton userId={userId} initialData={user} />
          </TableCell>
          <TableCell>
            <DeleteUserButton userId={userId} />
          </TableCell>
        </>
      )}
    </>
  )
}
