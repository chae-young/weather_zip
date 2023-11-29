'use client'

import { getAuth, updateProfile } from 'firebase/auth'
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../../../../../firebase/firebasedb'
import { useEffect, useState } from 'react'
import useInputChange from '@/hooks/useInputChange'
import { useRouter } from 'next/navigation'

interface UpdateProfileProps {
  nickname?: string
  uid?: string
}

const UpdateProfile = ({ nickname, uid }: UpdateProfileProps) => {
  const router = useRouter()
  const [newNickname, setNewNickname, handleChangeNickname] = useInputChange('')
  const [nicknameCheckError, setNicknameCheckError] = useState('')

  // 유효성 검사 초기화
  useEffect(() => {
    setNicknameCheckError('')
  }, [newNickname])

  const nicknameDuplicateCheck = async (newNickname: string) => {
    const q = query(
      collection(db, 'users'),
      where('nickname', '==', newNickname),
    )
    const querySnapshot = await getDocs(q)
    const userNickname: string[] = []
    querySnapshot.forEach((doc) => {
      userNickname.push(doc.data().nickname)
    })

    return userNickname
  }

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const isAvailable = await nicknameDuplicateCheck(newNickname)
    const auth = getAuth()
    if (!isAvailable.length && auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: newNickname,
        })

        const userRef = collection(db, 'users')
        const q = query(userRef, where('uid', '==', uid))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          const docRef = doc(db, 'users', querySnapshot.docs[0].id)
          await updateDoc(docRef, {
            nickname: newNickname,
          })
        }

        router.push('/user/mypage')
        router.refresh()
      } catch (error) {
        console.error(error)
      }
    } else {
      setNicknameCheckError('중복된 닉네임이 있어요')
    }
  }

  return (
    <form onSubmit={handleOnSubmit} className="mt-28">
      <div className="text-2xl px-5 flex flex-col">
        {nickname}을
        <div className="flex items-center mt-4">
          <input
            type="text"
            name="newNickname"
            id="newNickname"
            placeholder="닉네임을 입력해주세요."
            maxLength={12}
            onChange={handleChangeNickname}
            className="bg-stone-200 h-12 rounded-2xl shrink-0 w-[85%] pl-5 placeholder-gray-400"
          />
          <span className="grow text-center">로</span>
        </div>
        <p className="text-red-600 text-body6">{nicknameCheckError}</p>
        <button
          type="submit"
          className={`${
            newNickname ? 'text-bk font-bold' : 'text-gray-300'
          } text-left flex mt-4`}
        >
          수정할거에요
        </button>
      </div>
    </form>
  )
}

export default UpdateProfile
