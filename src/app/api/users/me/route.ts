import { prisma } from '@/lib/prisma'
import { jwtVerify } from 'jose'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')

  if (!authHeader) {
    return Response.json(
      { message: 'Usuário não autenticado' },
      { status: 401 },
    )
  }

  const token = authHeader.split(' ')[1]

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)

    const userInfo = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return Response.json(userInfo, { status: 200 })
  } catch (error) {
    return Response.json({ message: 'Erro ao buscar usuário' }, { status: 500 })
  }
}
