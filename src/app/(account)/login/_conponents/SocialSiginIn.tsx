'use client'

import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const SocialSiginIn = () => {
  const router = useRouter()

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
        if (response.status === 200) {
          router.replace('/')
          router.refresh()
        } else {
          router.replace('/login')
        }
      })
    }
  }

  return (
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
        <Link href="/join?previous=login" prefetch={false}>
          <strong>회원가입</strong>
        </Link>
      </p>
    </section>
  )
}

export default SocialSiginIn
