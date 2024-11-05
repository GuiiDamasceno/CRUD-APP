import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'

export async function DELETE(request: NextRequest) {
  const { userId } = await request.json()

  const path = request.nextUrl.pathname

  revalidatePath(path)

  try {
    await prisma.user.delete({
      where: { id: userId },
    })

    return Response.json(
      { message: 'Usuário deletado com sucesso' },
      { status: 200 },
    )
  } catch (error) {
    return Response.json(
      { message: 'Erro ao deletar usuário' },
      { status: 400 },
    )
  }
}
