import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TableHeadAdmin } from './table-head-admin'
import { TableCellAdmin } from './table-cell-admin'
import type { UserProfileProps } from '@/app/(dashboard)/page'

interface UserListProps {
  users: UserProfileProps[]
}

export async function UserList({ users }: UserListProps) {
  return (
    <>
      <Table className="w-full">
        <TableCaption>Lista de usuários</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px] md:w-[300px] 2xl:w-[400px]">
              Nome
            </TableHead>
            <TableHead className="w-[40px] md:w-[500px] 2xl:w-[700px]">
              E-mail
            </TableHead>
            <TableHead>Cargo</TableHead>
            <TableHeadAdmin />
          </TableRow>
        </TableHeader>

        <TableBody>
          {users?.map((user) => {
            return (
              <TableRow key={user.email}>
                <TableCell className="font-medium w-[70px] md:w-[150px] break-words line-clamp-2 md:line-clamp-none">{user.name}</TableCell>
                <TableCell className="w-[70px] md:w-[100px]">{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>

                <TableCellAdmin userId={user.id} user={user} />
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
