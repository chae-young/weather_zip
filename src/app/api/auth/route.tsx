import { NextRequest, NextResponse } from 'next/server'
import { adminInitApp } from '../../../../firebase/firebase-admin-config'
import { cookies } from 'next/headers'
import { auth } from 'firebase-admin'
import { FirebaseError } from 'firebase/app'
import { redirect } from 'next/navigation'

adminInitApp()

export async function GET(request: NextRequest) {
  const cookieStore = cookies()
  const session = cookieStore.get('session')?.value || ''

  //Firebase Admin SDK를 사용하여 세션 쿠키를 유효성 검사
  try {
    const decodedClaims = await auth().verifySessionCookie(session, true)
    return NextResponse.json({ status: 200 })
  } catch (error) {
    const firebaseError = error as FirebaseError
    if (firebaseError) {
      return NextResponse.json({ message: firebaseError.code, status: 500 })
    } else {
      // FirebaseError가 아닌 다른 에러 처리
      console.error('Non-Firebase Error:', error)
    }
  }
}
