import { auth } from 'firebase-admin'
import { adminInitApp } from '../../../../firebase/firebase-admin-config'
import { cookies, headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { FirebaseError } from 'firebase-admin'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../firebase/firebasedb'

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

// export async function GET(request: NextRequest, response: NextResponse) {
//   const cookieStore = cookies()
//   const session = cookieStore.get('session')?.value || ''
//   //response.headers.set('Cache-Control', 'public, max-age=3600')

//   //Firebase Admin SDK를 사용하여 세션 쿠키를 유효성 검사
//   try {
//     const decodedClaims = await auth().verifySessionCookie(session, false)
//     //실시간 유저 업데이트시 정보 제공
//     const q = query(
//       collection(db, 'users'),
//       where('uid', '==', decodedClaims.uid),
//     )
//     const querySnapshot = await getDocs(q)
//     const userInfo = querySnapshot.docs.map((doc: any) => ({
//       ...doc.data(),
//       isLogged: true,
//       nickname: doc.data().nickname,
//     }))[0]

//     return NextResponse.json({
//       isLogged: true,
//       uid: userInfo.uid,
//       nickname: userInfo.nickname,
//       email: userInfo.email,
//     })
//   } catch (error) {
//     const firebaseError = error as FirebaseError
//     return NextResponse.json({ status: 500, message: firebaseError.message })
//   }
// }

export async function GET(request: NextRequest) {
  const session = cookies().get('session')?.value || ''

  // 쿠키 존재 확인
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 })
  }

  // 유효 한지
  const decodedClaims = await auth().verifySessionCookie(session, true)

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 })
  }

  return NextResponse.json({ isLogged: true }, { status: 200 })
}
