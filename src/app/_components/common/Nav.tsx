import Link from 'next/link'
import { BiHome, BiPlus, BiHash } from 'react-icons/bi'
import { TbFolderHeart } from 'react-icons/tb'
import { LuUser2 } from 'react-icons/lu'

const Nav = () => (
  <nav className="bg-white flex justify-center items-center fixed bottom-0 left-0 right-0 m-auto max-w-[var(--container)] h-[60px] border-t border-[#f0f0f0]">
    <ul className="flex justify-evenly w-full">
      <li className="text-body6">
        <Link href="/" className="flex justify-center items-center flex-col">
          <BiHome className="text-xl" />홈
        </Link>
      </li>
      <li className="text-body6">
        <Link
          href="/weatherLogs"
          className="flex justify-center items-center flex-col mr-5"
        >
          <BiHash className="text-xl" />
          날씨로그
        </Link>
      </li>
    </ul>
    <Link
      href="/user/write"
      className="flex justify-center items-center absolute left-[50%] -top-3 -translate-x-2/4 w-[50px] h-[50px] bg-pointColor rounded-full"
    >
      <BiPlus className="text-2xl text-white" />
      <span className="sr-only">기록하기</span>
    </Link>
    <ul className="flex justify-evenly w-full">
      <li className="text-body6">
        <Link
          href="/user/collection"
          className="flex justify-center items-center flex-col ml-10"
        >
          <TbFolderHeart className="text-xl" />
          컬렉션
        </Link>
      </li>
      <li className="text-body6">
        <Link
          href="/user/mypage"
          className="flex justify-center items-center flex-col"
        >
          <LuUser2 className="text-xl" />
          마이페이지
        </Link>
      </li>
    </ul>
  </nav>
)

export default Nav
