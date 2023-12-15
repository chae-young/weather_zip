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
      throw new Error('유저 정보를 가져올 수 없습니다.')
    }
  } catch (error) {
    console.error
    throw error
  }
}

export default fetchUser
