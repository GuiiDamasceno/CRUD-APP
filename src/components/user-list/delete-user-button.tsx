import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { api } from '@/lib/axios'
import { toast, Toaster } from 'sonner'
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '../ui/dialog'

interface DeleteUserButtonProps {
  userId: string
}

export function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  async function deleteUser(userId: string) {
    try {
      await api.delete(`/users/delete`, {
        data: { userId },
      })

      toast.success('Usuário deletado com sucesso')
    } catch (error) {
      toast.error('Erro ao deletar usuário')
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" variant={'ghost'} className="text-destructive">
            <X />
          </Button>
        </DialogTrigger>
        <DialogContent className="text-foreground">
          <DialogTitle>
            Tem certeza de que deseja deletar este usuário?
          </DialogTitle>
          <Button
            type="button"
            onClick={() => deleteUser(userId)}
            className="w-full"
          >
            Excluir
          </Button>
          <DialogClose asChild>
            <Button type="button" variant={'destructive'} className="w-full">
              Cancelar
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Toaster richColors />
    </>
  )
}
