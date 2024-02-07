import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get('session')

  // 세션 없으면 로그인으로 리다이렉트
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // const res = await fetch('http://localhost:3000/api/login', {
  //   method: 'GET',
  //   headers: {
  //     Cookie: `session=${session?.value}`,
  //   },
  // })

  // if (res.status !== 200) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/user/:path*'],
}
