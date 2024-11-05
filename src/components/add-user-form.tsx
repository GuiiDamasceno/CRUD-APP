import { Input } from './ui/input'
import { Label } from './ui/label'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Button } from './ui/button'
import { z } from 'zod'
import { toast } from 'sonner'
import { api } from '@/lib/axios'

const addUserFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string(),
})

type AddUserFormSchema = z.infer<typeof addUserFormSchema>

export function AddUserForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<AddUserFormSchema>({
    resolver: zodResolver(addUserFormSchema),
  })

  async function handleSignUp(data: AddUserFormSchema) {
    try {
      await api.post('/users/register', data)

      toast.success('Usuário adicionado!')
    } catch (error) {
      toast.error('Erro ao realizar o cadastro')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Seu nome</Label>
        <Input
          id="name"
          type="name"
          placeholder="João Exemplo"
          className="text-black"
          {...register('name')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Seu e-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="exemplo@email.com"
          className="text-black"
          {...register('email')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Sua senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="***********"
          className="text-black"
          {...register('password')}
        />
      </div>

      <div className="space-y-2">
        <Label>Seu cargo</Label>
        <Controller
          control={control}
          name="role"
          render={({ field }) => {
            return (
              <Select
                onValueChange={field.onChange}
                {...field}
                defaultValue={field.value}
              >
                <SelectTrigger className="text-muted-foreground">
                  <SelectValue
                    placeholder="Selecione seu cargo"
                    defaultValue="user"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user" defaultChecked>
                    User
                  </SelectItem>
                  <SelectItem value="visitor">Visitante</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            )
          }}
        ></Controller>
      </div>
      <Button disabled={isSubmitting} className="w-full" type="submit">
        Adicionar
      </Button>
    </form>
  )
}
