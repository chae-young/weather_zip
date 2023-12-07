import { auth } from 'firebase-admin'
import { adminInitApp } from '../../../../firebase/firebase-admin-config'
import { cookies, headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { FirebaseError } from 'firebase-admin'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../firebase/firebasedb'
import { redirect } from 'next/navigation'

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

  //Firebase Admin SDK를 사용하여 세션 쿠키를 유효성 검사
  try {
    const decodedClaims = await auth().verifySessionCookie(session, true)
    //실시간 유저 업데이트시 정보 제공
    const q = query(
      collection(db, 'users'),
      where('uid', '==', decodedClaims.uid),
    )
    const querySnapshot = await getDocs(q)
    const userInfo = querySnapshot.docs.map((doc: any) => ({
      ...doc.data(),
      isLogged: true,
      nickname: doc.data().nickname,
    }))[0]

    return NextResponse.json(
      {
        isLogged: true,
        uid: userInfo.uid,
        nickname: userInfo.nickname,
        email: userInfo.email,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ status: 500 })
  }
}
