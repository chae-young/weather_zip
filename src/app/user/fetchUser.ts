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
      return result
    }
  } catch (error) {
    console.error
  }
}

export default fetchUser
