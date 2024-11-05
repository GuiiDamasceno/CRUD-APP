'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { api } from '@/lib/axios'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

const loginForm = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginForm = z.infer<typeof loginForm>

export function LoginForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginForm),
  })

  async function handleSignIn(data: LoginForm) {
    try {
      const res = await api.post('/auth/login', data)
      localStorage.setItem('CRUD-APP:token', res.data.token)
      router.push('/')
    } catch (error) {
      toast.error('Erro ao realizar o login')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
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
      <Button disabled={isSubmitting} className="w-full" type="submit">
        Acessar painel
      </Button>
    </form>
  )
}
