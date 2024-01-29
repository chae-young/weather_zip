import { collection, getDocs, query, where } from 'firebase/firestore'
import { cookies } from 'next/headers'
import { db } from '../../../firebase/firebasedb'
import { auth } from 'firebase-admin'
import { adminInitApp } from '../../../firebase/firebase-admin-config'

export type Tuser = {
  isLogged: boolean
  uid: string
  nickname: string
  email: string
}
adminInitApp()
const fetchUser = async (): Promise<Tuser | null> => {
  const cookieStore = cookies()
  const idToken = cookieStore.get('session')?.value
  if (!idToken) return null

  const decodedClaims = await auth().verifySessionCookie(idToken!, false)

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

  return userInfo
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
