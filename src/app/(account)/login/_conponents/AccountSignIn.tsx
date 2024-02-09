'use client'

import WideButton from '@/app/_components/Button/WideButton'
import InputField from '@/app/_components/InputField'
import { auth } from '../../../../../firebase/firebasedb'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import useInputChange from '@/hooks/useInputChange'
import useToast from '@/hooks/useToast'

interface SignInProps {}

const AccountSignIn = ({}: SignInProps) => {
  const router = useRouter()
  const [email, setEmail, handleChangeEmail] = useInputChange('')
  const [password, setPassword, handleChangePassword] = useInputChange('')
  const [confirmLoginError, setConfirmLoginError] = useState('')
  const { toastPromise, toastSuccess } = useToast()

  const siginIn = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password)

      const idToken = await credential.user.getIdToken()

      const responsePromise = fetch('/api/login', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })

      toastPromise(responsePromise, '로그인 중...', '로그인 되었습니다.')
      const response = await responsePromise

      if (response.status === 200) {
        router.replace('/')
        router.refresh()
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        //console.log(error.code)
        switch (error.code) {
          case 'auth/user-not-found':
            setConfirmLoginError(
              '입력한 아이디 또는 비밀번호가 일치하지 않습니다.',
            )
            break
          case 'auth/wrong-password':
            setConfirmLoginError('비밀번호가 일치하지 않습니다.')
            break
          case 'auth/invalid-login-credentials':
            setConfirmLoginError(
              '입력한 아이디 또는 비밀번호가 일치하지 않습니다.',
            )
            break
        }
      }
    }
  }

  return (
    <section>
      <form className="mt-10" onSubmit={siginIn}>
        <div className="mb-10">
          <InputField
            type="email"
            id="email"
            placeholder="이메일"
            value={email}
            onChange={handleChangeEmail}
          />
          <InputField
            type="password"
            id="password"
            placeholder="패스워드"
            value={password}
            onChange={handleChangePassword}
            errorMsg={confirmLoginError}
          />
        </div>
        <WideButton content="로그인" type="submit" />
      </form>
    </section>
  )
}

export default AccountSignIn
