import { collection, getDocs, query, where } from 'firebase/firestore'
import { cookies, headers } from 'next/headers'
import { db } from '../../../firebase/firebasedb'
import { redirect } from 'next/navigation'
import { FirebaseError } from 'firebase/app'
import { auth } from 'firebase-admin'

export type Tuser = {
  isLogged: boolean
  uid: string
  nickname: string
  email: string
}

const fetchUser = async (): Promise<Tuser> => {
  const cookieStore = cookies()
  const idToken = cookieStore.get('session')?.value

  try {
    const decodedClaims = await auth().verifySessionCookie(
      idToken as string,
      false,
    )
    // 세션 유효 검증 실패
    //if (!decodedClaims) redirect('/login')

    const q = query(
      collection(db, 'users'),
      where('uid', '==', decodedClaims.uid),
    )
    const querySnapshot = await getDocs(q)
    const userInfo: Tuser = querySnapshot.docs.map((doc: any) => ({
      ...doc.data(),
      isLogged: true,
      nickname: doc.data().nickname,
    }))[0]

    return userInfo
  } catch (error) {
    const firebaseError = error as FirebaseError
    if (firebaseError) {
      const headersList = headers()
      const pathname = headersList.get('next-url')

      if (pathname) alert(`${pathname},${firebaseError.message}`)
      return { isLogged: false, uid: '', nickname: '', email: '' }
    } else {
      // FirebaseError가 아닌 다른 에러 처리
      console.error('Non-Firebase Error:', error)
      throw new Error('Non-Firebase Error')
    }
  }
}

export default fetchUser
