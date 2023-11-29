'use client'

import { LuUser } from 'react-icons/lu'
import { TbFolderHeart } from 'react-icons/tb'
import { MdLogout } from 'react-icons/md'
import { FiChevronRight } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '../../../../../firebase/firebasedb'

const CategoryList = () => {
  const router = useRouter()
  const categorys = [
    {
      name: '닉네임 수정',
      link: '/user/profile',
      icon: <LuUser className="text-xl" />,
    },
    {
      name: '컬렉션',
      link: '/user/collection',
      icon: <TbFolderHeart className="text-xl" />,
    },
    {
      name: '로그아웃',
      link: '/api/logout',
      icon: <MdLogout className="text-xl" />,
    },
  ]

  const signOutUser = async () => {
    await signOut(auth)

    const response = await fetch('http://localhost:3000/api/logout', {
      method: 'POST',
    })

    if (response.status === 200) {
      router.push('/')
      router.refresh()
    }
  }

  const handleOnMore = (url: string) => {
    if (url.substring(0, 4) === '/api') {
      return signOutUser()
    }
    router.push(`${url}`)
  }

  return (
    <ul className="space-y-0.5 mt-14">
      {categorys.map((category, idx) => (
        <li
          key={idx}
          className="bg-white first:rounded-t-2xl last:rounded-b-2xl px-4"
        >
          <button
            onClick={() => handleOnMore(category.link)}
            className="w-full flex items-center h-[60px]  text-stone-600 relative"
          >
            {category.icon}
            <span className="ml-2 text-bk text-sm">{category.name}</span>
            <FiChevronRight className="text-xl absolute right-0" />
          </button>
        </li>
      ))}
    </ul>
  )
}

export default CategoryList
