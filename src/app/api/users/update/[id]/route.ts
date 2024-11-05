import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const path = request.nextUrl.pathname

  revalidatePath(path)

  const { id } = await params
  const { name, email, role } = await request.json()

  try {
    const updateUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role,
      },
    })

    return Response.json(updateUser, { status: 200 })
  } catch (error) {
    return Response.json(
      { message: 'Erro ao atualizar usuário' },
      { status: 400 },
    )
  }
}
