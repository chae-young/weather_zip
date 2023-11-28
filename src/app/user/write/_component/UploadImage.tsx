'use client'

import Image from 'next/image'
import { BiPlus } from 'react-icons/bi'
import Spin from '@/app/_components/common/Spin'
import RoundedDeleteButton from '@/app/_components/Button/RoundedDeleteButton'
import { Dispatch, SetStateAction } from 'react'

interface UploadImageProps {
  imageURL: string
  setImageURL: Dispatch<SetStateAction<string>>
  handelImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void | null
  uploadIng: boolean
}

const UploadImage = ({
  handelImageUpload,
  setImageURL,
  uploadIng,
  imageURL,
}: UploadImageProps) => {
  const handleOnDelete = () => {
    setImageURL('')
  }

  return (
    <>
      {imageURL ? (
        <div className="relative w-44 h-44 rounded-2xl overflow-hidden">
          <Image
            src={imageURL}
            alt="btnStart"
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          />
          <RoundedDeleteButton handleOnDelete={handleOnDelete} />
        </div>
      ) : (
        <>
          <label
            htmlFor="fullbody_file"
            className="w-44 h-44 bg-gray1 rounded-2xl flex items-center justify-center"
          >
            {uploadIng ? <Spin /> : <BiPlus className="text-4xl text-white" />}
          </label>
          <input
            className="sr-only"
            type="file"
            id="fullbody_file"
            accept="image/jpg, image/png, image/jpeg"
            onChange={handelImageUpload}
          />
        </>
      )}
    </>
  )
}

export default UploadImage
