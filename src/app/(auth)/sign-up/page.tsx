import { Toaster } from 'sonner'
import { SignUpForm } from './sign-up-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SignUp() {
  return (
    <>
      <div className="p-8 flex items-center justify-center w-full h-screen mt-[-100px]">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Realizar cadastro
            </h1>
            <p className="text-sm text-muted-foreground">
              Crie sua conta para realizar o login
            </p>
          </div>

          <main className="space-y-2">
            <SignUpForm />
            <Button variant={'ghost'} asChild className="w-full">
              <Link href="/login">Voltar</Link>
            </Button>
          </main>

          <Toaster richColors />
        </div>
      </div>
    </>
  )
}
