import { Pencil } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogTitle, DialogTrigger, DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { api } from '@/lib/axios'
import { DialogClose } from '@radix-ui/react-dialog'
import { toast, Toaster } from 'sonner'

interface UserEditFormProps {
  userId: string
  initialData: { name: string; email: string; role: string }
}

export function EditUserButton({ initialData, userId }: UserEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: initialData,
  })

  async function editUser(
    userId: string,
    userData: { name?: string; email?: string; role?: string },
  ) {
    try {
      await api.put(`/users/update/${userId}`, userData)

    } catch (error) {
      console.log('Ocorreu um erro ao atualizar o usuário', error)
    }
  }

  async function handleUpdateUser(data: {
    name?: string
    email?: string
    role?: string
  }) {
    try {
      await editUser(userId, data)

      toast.success('Usuário atualizado com sucesso')
    } catch (error) {
      toast.error('Ocorreu um erro ao atualizar o usuário')
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'ghost'} className="text-primary">
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent className="text-foreground bg-destructive-foreground">
          <DialogTitle>Editar usuário</DialogTitle>
          <form onSubmit={handleSubmit(handleUpdateUser)} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="name"
                defaultValue={initialData.name}
                className="text-black"
                {...register('name', { required: true })}
              />
              {errors.name && <p>Nome obrigatório</p>}
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                defaultValue={initialData.email}
                className="text-black"
                {...register('email', { required: true })}
              />
              {errors.email && <p>E-mail obrigatório</p>}
            </div>
            <div>
              <Label htmlFor="role">Cargo</Label>
              <Input
                id="role"
                type="role"
                defaultValue={initialData.role}
                className="text-black"
                {...register('role', { required: true })}
              />
              {errors.role && <p>Cargo obrigatório</p>}
            </div>

            <div className="flex gap-2 flex-1 justify-end">
              <Button type="submit" disabled={isSubmitting}>
                Salvar
              </Button>
              <DialogClose asChild>
                <Button type="button" variant={'destructive'}>
                  Cancelar
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Toaster richColors />
    </>
  )
}
