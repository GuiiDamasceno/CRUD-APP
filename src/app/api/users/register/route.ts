import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { name, email, password, role } = await request.json()

  const hashedPassword = await bcrypt.hash(password, 10)

  const path = request.nextUrl.pathname

  revalidatePath(path)

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

    return Response.json(user, { status: 201 })
  } catch (error) {
    return Response.json({ message: 'Erro ao criar usuário' }, { status: 400 })
  }
}
