import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return Response.json(
        { message: 'Usuário não encontrado' },
        { status: 400 },
      )
    }

    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid) {
      return Response.json({ message: 'Senha inválida' }, { status: 400 })
    }

    const token = await new SignJWT({ id: user.id, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET))

    return Response.json({ token }, { status: 200 })
  } catch (error) {
    return Response.json(
      { message: 'Erro ao autenticar usuário' },
      { status: 400 },
    )
  }
}
