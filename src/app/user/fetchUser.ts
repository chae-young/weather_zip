import { cookies } from 'next/headers'

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
    const userInfo: Tuser = await response.json()
    return userInfo
  } catch (error) {
    console.error(error)
  }
}

export default fetchUser
