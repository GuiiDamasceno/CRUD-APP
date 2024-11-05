import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Toaster } from 'sonner'
import { LoginForm } from './login-form'

export default function SignIn() {
  return (
    <>
      <div className="p-8 flex items-center justify-center w-full h-screen mt-[-100px]">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe o login pelo dashboard
            </p>
          </div>

          <main className="space-y-4">
            <LoginForm />
            <Button variant={'ghost'} asChild className="w-full">
              <Link href="/sign-up">Criar conta</Link>
            </Button>
          </main>

          <Toaster richColors />
        </div>
      </div>
    </>
  )
}
