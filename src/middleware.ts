import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return Response.json({ message: 'Token não encontrado' }, { status: 401 })
  }

  const token = authHeader.split(' ')[1]

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)

    request.headers.set('user', JSON.stringify(payload))

    return NextResponse.next()
  } catch (error) {
    return Response.json({ message: 'Token inválido' }, { status: 401 })
  }
}

export const config = {
  matcher: ['/api/protected-route/:path*', '/api/users/me'],
}
