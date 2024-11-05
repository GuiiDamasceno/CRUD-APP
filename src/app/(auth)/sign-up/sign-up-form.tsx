'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const signUpForm = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUpForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      const response = await api.post('/users/register', data)

      toast.success('Cadastro realizado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => {
            router.push('/login')
          },
        },
      })

      return response.data
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
                </SelectContent>
              </Select>
            )
          }}
        ></Controller>
      </div>
      <Button disabled={isSubmitting} className="w-full" type="submit">
        Criar conta
      </Button>
    </form>
  )
}
