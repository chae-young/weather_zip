import { auth } from 'firebase-admin'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get('session')
  console.log('미들웨어 작동중...')
  //세션 없으면 로그인으로 리다이렉트
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  //세션 유효 검증
  const responseAPI = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth`, {
    headers: {
      Cookie: `session=${session.value}`,
    },
  })
  const result = await responseAPI.json()

  if (result.status !== 200) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/user/:path*'],
}
