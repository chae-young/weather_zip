'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../../../../firebase/firebasedb'
import { FirebaseError } from 'firebase/app'
import type { User } from 'firebase/auth'

import Image from 'next/image'
import TopTitle from '../../_components/common/TopTitle'
import WideButton from '../../_components/Button/WideButton'
import useInputChange from '@/hooks/useInputChange'
import InputField from '../../_components/InputField'
import InnerCon from '../../_components/common/InnerCon'
import { addDoc, collection } from 'firebase/firestore'

const Join = () => {
  const router = useRouter()

  const [email, setEmail, handleChangeEmail] = useInputChange('')
  const [nickname, setNickName, handleChangeNickname] = useInputChange('')
  const [password, setPassword, handleChangePassword] = useInputChange('')
  const [confirmPassword, setConfirmPassword, handleChangeConfirmPassword] =
    useInputChange('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [confirmEmailError, setConfirmEmailError] = useState('')

  const joinWithnickname = async (user: User | null) => {
    if (user) {
      try {
        const addNickname = await updateProfile(user, {
          displayName: nickname,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const addUserFireStore = (
      uid: string,
      email: string,
      nickname: string,
    ) => {}

    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const user = auth.currentUser
      joinWithnickname(user)

      if (user) {
        const userRef = collection(db, 'users')
        addDoc(userRef, { uid: user.uid, email, nickname })
      }

      router.push('/login?previous=join')
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found' || 'auth/wrong-password':
            setConfirmEmailError('이메일 혹은 비밀번호가 일치하지 않습니다.')
            break
          case 'auth/email-already-in-use':
            setConfirmEmailError('이미 가입되어 있는 계정입니다')
            break
        }
      }
    }
  }
  // 실시간 유효성 검사
  useEffect(() => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/
    if (password && !passwordRegex.test(password)) {
      setPasswordError(
        '비밀번호는 영문, 특수문자, 숫자를 조합하여 최소 8자 이상이어야 합니다.',
      )
    } else {
      setPasswordError('')
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.')
    } else {
      setConfirmPasswordError('')
    }
  }, [password, confirmPassword])

  return (
    <>
      <TopTitle title="회원가입" back />
      <InnerCon>
        <h1 className="my-6">
          <Image
            src="/images/logo.svg"
            alt="날씨.zip"
            width={100}
            height={30}
            className="mx-auto"
          />
        </h1>
        <form className="px-5" onSubmit={handleOnSubmit}>
          <div className="mb-8">
            <InputField
              type="email"
              id="email"
              placeholder="이메일"
              value={email}
              onChange={handleChangeEmail}
              errorMsg={confirmEmailError}
            />
            <InputField
              type="text"
              id="nickname"
              placeholder="닉네임"
              value={nickname}
              onChange={handleChangeNickname}
            />
            <InputField
              type="password"
              id="password"
              placeholder="패스워드"
              value={password}
              onChange={handleChangePassword}
              errorMsg={passwordError}
            />
            <InputField
              type="password"
              id="confirmPassword"
              placeholder="패스워드 확인"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              errorMsg={confirmPasswordError}
            />
          </div>
          <WideButton content="회원가입" type="submit" />
        </form>
      </InnerCon>
    </>
  )
}

export default Join
