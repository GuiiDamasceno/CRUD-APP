import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const query = searchParams.get('q')

    if (query) {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { email: { contains: query } },
          ],
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      })

      return Response.json(users, { status: 200 })
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    return Response.json(users, { status: 200 })
  } catch (error) {
    return Response.json(
      { message: 'Erro ao listar usuários' },
      { status: 400 },
    )
  }
}
