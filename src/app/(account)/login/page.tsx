import React from 'react'
import Image from 'next/image'
import AccountSignIn from './_conponents/AccountSignIn'
import SocialSiginIn from './_conponents/SocialSiginIn'

const Login = () => {
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
      <AccountSignIn />
      <hr className="my-10" />
      {/* 소셜 로그인 */}
      <SocialSiginIn />
    </div>
  )
}

export default Login
