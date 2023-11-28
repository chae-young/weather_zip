import { auth } from 'firebase-admin'
import { adminInitApp } from '../../../../firebase/firebase-admin-config'
import { cookies, headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

adminInitApp()

export async function POST(request: NextRequest, response: NextResponse) {
  const authorization = headers().get('Authorization')

  if (authorization?.startsWith('Bearer')) {
    const idToken = authorization.split('Bearer ')[1]
    const decodedToken = await auth().verifyIdToken(idToken)

    if (decodedToken) {
      //세션 쿠키 생성
      const expiresIn = 60 * 60 * 24 * 5 * 1000
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      })
      const options = {
        name: 'session',
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      }
      //브라우저에 쿠키 추가
      cookies().set(options)
    }
  }

  return NextResponse.json({}, { status: 200 })
}

export async function GET(request: NextRequest) {
  const cookieStore = cookies()
  const session = cookieStore.get('session')?.value || ''

  //세션 쿠키 유효성 검사
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 })
  }

  //Firebase Admin SDK를 사용하여 세션 쿠키를 유효성 검사
  const decodedClaims = await auth().verifySessionCookie(session, true)

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 })
  }
  return NextResponse.json(
    {
      isLogged: true,
      uid: decodedClaims.uid,
      nickname: decodedClaims.name,
      email: decodedClaims.email,
    },
    { status: 200 },
  )
}
