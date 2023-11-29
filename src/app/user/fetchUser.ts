import { collection, getDocs, query, where } from 'firebase/firestore'
import { cookies } from 'next/headers'
import { db } from '../../../firebase/firebasedb'

export type Tuser = {
  isLogged: boolean
  uid: string
  nickname: string
  email: string
}

const fetchUser = async () => {
  const cookieStore = cookies()
  const idToken = cookieStore.get('session')?.value
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/login`, {
      cache: 'no-store',
      method: 'GET',
      headers: {
        Cookie: `session=${idToken}`,
      },
    })
    if (response.status === 200) {
      const result: Tuser = await response.json()

      // 실시간 유저 업데이트시 정보 제공
      const q = query(collection(db, 'users'), where('uid', '==', result.uid))
      const querySnapshot = await getDocs(q)
      const userInfo = querySnapshot.docs.map((doc: any) => ({
        ...doc.data(),
        isLogged: result.isLogged,
        nickname: doc.data().nickname,
      }))[0]
      return userInfo
    }
    // const userInfo: Tuser = await response.json()
    // return userInfo
  } catch (error) {
    console.error(error)
  }
}

export default fetchUser
