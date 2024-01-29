import { collection, getDocs, query, where } from 'firebase/firestore'
import { cookies, headers } from 'next/headers'
import { db } from '../../../firebase/firebasedb'
import { redirect } from 'next/navigation'
import { FirebaseError } from 'firebase/app'
import { auth } from 'firebase-admin'
import { getAuth } from '@firebase/auth'

export type Tuser = {
  isLogged: boolean
  uid: string
  nickname: string
  email: string
}

const fetchUser = async (): Promise<Tuser | null> => {
  const cookieStore = cookies()
  const idToken = cookieStore.get('session')?.value
  const decodedClaims = await auth().verifySessionCookie(idToken!, false)
  console.log(decodedClaims)

  return {
    uid: decodedClaims.uid,
    email: decodedClaims.email!,
    nickname: decodedClaims.name,
    isLogged: true,
  }
  // const cookieStore = cookies()
  // const idToken = cookieStore.get('session')?.value

  // try {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/login`, {
  //     headers: {
  //       Cookie: `session=${idToken}`,
  //     },
  //   })

  //   const result = await res.json()

  //   if (!result) redirect('/login')

  //   return result
  // } catch (error) {
  //   redirect('/login')
  //   console.log(error)
  // const firebaseError = error as FirebaseError
  // if (firebaseError) {
  //   const headersList = headers()
  //   const pathname = headersList.get('next-url')

  //   //if (pathname) redirect('/login')
  //   return { isLogged: false, uid: '', nickname: '', email: '' }
  // } else {
  //   // FirebaseError가 아닌 다른 에러 처리
  //   console.error('Non-Firebase Error:', error)
  //   throw new Error('Non-Firebase Error')
  // }
  //}
}

export default fetchUser
