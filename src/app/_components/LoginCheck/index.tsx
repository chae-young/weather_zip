'use client'

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from '../../../../firebase/firebasedb'
import { usePathname, useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import userAtom, { IUser } from '@/recoil/atom/userAtom'

const LoginCheck = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useRecoilState(userAtom)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push(`/login?previous=${pathname}`)
      } else {
        setUser({
          uid: user.uid,
          email: user.email,
          nickname: user.displayName,
        })
      }
    })
  }, [])

  return null
}

export default LoginCheck
