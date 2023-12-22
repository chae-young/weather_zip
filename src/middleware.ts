import { auth } from 'firebase-admin'
import { FirebaseError } from 'firebase/app'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get('session')

  // 세션 없으면 로그인으로 리다이렉트
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  //세션 유효 검증
  // try {
  //   const decodedClaims = await auth().verifySessionCookie(session.value, true)
  //   return NextResponse.json({ status: 200 })
  // } catch (error) {
  //   const firebaseError = error as FirebaseError
  //   if (firebaseError) {
  //     return NextResponse.json({ message: firebaseError.code, status: 500 })
  //   } else {
  //     // FirebaseError가 아닌 다른 에러 처리
  //     console.error('Non-Firebase Error:', error)
  //   }
  // }
  return NextResponse.next()
}

export const config = {
  matcher: ['/user/:path*'],
}
