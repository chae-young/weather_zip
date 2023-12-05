'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
} from 'firebase/auth'
import { auth, db, emailProvider } from '../../../../firebase/firebasedb'
import { FirebaseError } from 'firebase/app'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import userAtom from '@/recoil/atom/userAtom'
import useInputChange from '@/hooks/useInputChange'
import InputField from '../../_components/InputField'
import WideButton from '../../_components/Button/WideButton'
import { addDoc, collection } from 'firebase/firestore'

const Login = () => {
  const router = useRouter()
  const [email, setEmail, handleChangeEmail] = useInputChange('')
  const [password, setPassword, handleChangePassword] = useInputChange('')
  const [confirmLoginError, setConfirmLoginError] = useState('')
  const [userInfo, setUserInfo] = useRecoilState(userAtom)

  // const handleOnSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()

  //   try {
  //     const getUserInfo = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password,
  //     )
  //     setUserInfo({
  //       uid: getUserInfo.user.uid,
  //       nickname: getUserInfo.user.displayName,
  //       email: getUserInfo.user.email,
  //     })

  //     if (params.get('previous') != '/join') {
  //       router.back()
  //     } else {
  //       const prevParams = params.get('previous')
  //       router.push(prevParams as string)
  //     }
  //   } catch (error: unknown) {
  //     if (error instanceof FirebaseError) {
  //       //console.log(error.code)
  //       switch (error.code) {
  //         case 'auth/user-not-found':
  //           setConfirmLoginError(
  //             '입력한 아이디 또는 비밀번호가 일치하지 않습니다.',
  //           )
  //           break
  //         case 'auth/wrong-password':
  //           setConfirmLoginError('비밀번호가 일치하지 않습니다.')
  //           break
  //         case 'auth/invalid-login-credentials':
  //           setConfirmLoginError(
  //             '입력한 아이디 또는 비밀번호가 일치하지 않습니다.',
  //           )
  //           break
  //       }
  //     }
  //   }
  // }

  const googleLogin = async () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    if (user) {
      fetch('/api/login', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await user?.getIdToken()}`,
        },
      }).then((response) => {
        const userRef = collection(db, 'users')
        addDoc(userRef, {
          uid: user.uid,
          email: user.email,
          nickname: user.displayName,
        })
        if (response.status === 200) {
          router.back()
          router.refresh()
        }
      })
    }
  }

  // signInWithPopup(auth, provider)
  //   .then((result) => {
  //     setUserInfo({
  //       uid: result.user.uid,
  //       nickname: result.user.displayName,
  //       email: result.user.email,
  //     })
  //     router.back()
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })

  const siginIn = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const getUserInfo = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )

      const idToken = await getUserInfo.user.getIdToken()
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })

      if (response.status === 200) {
        router.back()
        router.refresh()
        //router.push('/home')
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
    <div className="px-5">
      <h1 className="mb-2 pt-20">
        <Image
          src="/images/logo.svg"
          alt="날씨.zip"
          width={150}
          height={50}
          className="mx-auto"
        />
      </h1>
      <p className="text-body5 text-center">
        로그인 하면 날씨.zip의 더 많은 서비스를 누릴 수 있어요
      </p>
      {/* 계정 로그인 */}
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
      <hr className="my-10" />
      {/* 소셜 로그인 */}
      <section>
        <button
          onClick={googleLogin}
          className="rounded-xl border border-gray2 h-[50px] w-full flex justify-center items-center"
        >
          <Image
            className="mr-2"
            src="/images/icon_google.svg"
            width={16}
            height={16}
            alt="구글 로그인"
          />
          구글 로그인
        </button>
        <p className="text-body5 mt-16 text-center">
          아직 회원이 아니신가요?{' '}
          <Link href="/join?previous=login">
            <strong>회원가입</strong>
          </Link>
        </p>
      </section>
    </div>
  )
}

export default Login
