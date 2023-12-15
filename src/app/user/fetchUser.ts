import { collection, getDocs, query, where } from 'firebase/firestore'
import { cookies } from 'next/headers'
import { db } from '../../../firebase/firebasedb'
import { redirect } from 'next/navigation'
import { FirebaseError } from 'firebase/app'

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
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/login`, {
      cache: 'no-store',
      method: 'GET',
      headers: {
        Cookie: `session=${idToken}`,
      },
    })
    if (response.status === 200) {
      const result: Tuser = await response.json()
      return result
    } else {
      console.error('로그인 실패')
    }
    return {
      uid: '',
      nickname: '',
      email: '',
      isLogged: false,
    }
  } catch (error) {
    console.error('사용자의 정보를 가져오지 못했습니다', error)
    throw new Error()
  }
}

export default fetchUser
