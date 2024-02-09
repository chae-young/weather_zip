'use client'

import Image from 'next/image'
import { BiPlus } from 'react-icons/bi'
import Spin from '@/app/_components/common/Spin'
import { Dispatch, SetStateAction } from 'react'
import RoundedDeleteButton from '@/app/_components/Button/RoundedDeleteButton'

interface UploadMultiImageProps {
  setImageList: Dispatch<SetStateAction<string[]>>
  imageList: string[]
  handelImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void | null
  uploadIng: boolean
}

const UploadMultiImage = ({
  imageList,
  setImageList,
  handelImageUpload,
  uploadIng,
}: UploadMultiImageProps) => {
  const handleOnDelete = (deleteUrl: string) => {
    const deletedImageList = imageList.filter((url) => url !== deleteUrl)
    setImageList(deletedImageList)
  }

  return (
    <div className="flex overflow-x-auto space-x-8 mb-6">
      <div className="flex shrink-0 gap-1">
        <label
          htmlFor="each_file"
          className="w-28 h-28 bg-gray1 rounded-2xl flex flex-col items-center justify-center"
        >
          {uploadIng ? <Spin /> : <BiPlus className="text-4xl text-white" />}
          <p className=" text-body6 text-gray-400">{imageList.length}/5</p>
        </label>
        <input
          className="sr-only"
          type="file"
          id="each_file"
          accept="image/jpg, image/png, image/jpeg"
          onChange={handelImageUpload}
        />
        {imageList.map((url, idx) => (
          <div
            className="rounded-2xl overflow-hidden w-28 h-28 relative"
            key={`${idx + url}`}
          >
            <Image
              src={url}
              alt="개별샷"
              width={112}
              height={112}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            />
            <RoundedDeleteButton handleOnDelete={() => handleOnDelete(url)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default UploadMultiImage
