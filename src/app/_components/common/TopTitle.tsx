'use client'

import { useRouter } from 'next/navigation'
import { IoIosArrowBack } from 'react-icons/io'

interface TopTitleProps {
  backLink?: string
  back?: boolean
  title: string
}

const TopTitle = ({ title, back, backLink }: TopTitleProps) => {
  const router = useRouter()

  const handleOnBack = () => {
    if (backLink) {
      router.push(backLink)
    } else {
      router.back()
    }
  }

  return (
    <div className="max-w-[var(--container)] bg-white h-[60px] flex items-center justify-center fixed left-0 right-0 w-full z-50 m-auto">
      {back && (
        <button
          onClick={handleOnBack}
          className="w-10 h-10 flex justify-center items-center absolute left-0"
        >
          <IoIosArrowBack />
        </button>
      )}
      <h1 className="text-h4">{title}</h1>
    </div>
  )
}

export default TopTitle
