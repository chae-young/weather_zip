'use client'

import { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import { BiPlus } from 'react-icons/bi'
import Spin from '@/app/_components/common/Spin'
import RoundedDeleteButton from '@/app/_components/Button/RoundedDeleteButton'
import { Ttag } from '@/recoil/atom/imageTagsAtom'

interface UploadImageProps {
  imageURL: string
  setImageURL: Dispatch<SetStateAction<string>>
  handelImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void | null
  uploadIng: boolean
  setTags: Dispatch<SetStateAction<Ttag[]>>
  handleTagLayerOpen: () => void
}

const UploadImage = ({
  imageURL,
  uploadIng,
  handelImageUpload,
  setImageURL,
  setTags,
  handleTagLayerOpen,
}: UploadImageProps) => {
  const handleOnDelete = (url: string) => {
    setImageURL('')
    setTags([])
  }
  return (
    <>
      {imageURL ? (
        <div className="relative w-full h-auto rounded-2xl overflow-hidden touch-none">
          <Image
            src={imageURL}
            alt="btnStart"
            width={0}
            height={0}
            sizes="(min-width: 640px) 50vw, 100vw"
            placeholder="blur"
            className="w-full"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          />
          <button
            className="h-6 px-2 rounded-xl absolute bottom-3 -translate-x-1/2 left-1/2 bg-pointColor text-body4 flex justify-center items-center shadow-[-2px_-3px_58px_5px_rgba(59,56,56,0.5)]"
            onClick={handleTagLayerOpen}
          >
            <BiPlus className="text-sm text-bk mr-1" /> 태그 추가
          </button>
          <RoundedDeleteButton
            handleOnDelete={() => handleOnDelete(imageURL)}
          />
        </div>
      ) : (
        <>
          <label
            htmlFor="fullbody_file"
            className="w-full h-auto aspect-square bg-gray1 rounded-2xl flex items-center justify-center"
          >
            {uploadIng ? <Spin /> : <BiPlus className="text-5xl text-white" />}
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
