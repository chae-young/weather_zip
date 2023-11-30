'use client'

import Image from 'next/image'
import SkeletonRecommendList from '../_skeleton/SkeletonRecommendList'
import {
  ItempClothing,
  useGetTempClothingList,
} from '@/hooks/swr/useGetTempClothingList'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'

interface TempClothingProps {
  isLogged: boolean
  uid: string
}
const TempClothing = ({ isLogged, uid }: TempClothingProps) => {
  const { tempClothingList, isValidating, isLoading } = useGetTempClothingList(
    isLogged,
    uid,
  )

  if (isValidating || isLoading || (tempClothingList?.length as number) <= 0) {
    return <SkeletonRecommendList />
  }

  return (
    <section className="mt-12">
      <h3 className="text-h4 mb-3">내가 비슷한 온도에 입었어요.</h3>
      {(tempClothingList?.length as number) >= 1 ? (
        <div className="flex overflow-x-auto space-x-8 mb-6">
          <div className="flex shrink-0 [&>*:last-child]:mr-0">
            {tempClothingList?.map((list: ItempClothing) => (
              <div className="rounded-2xl overflow-hidden mr-1" key={list.id}>
                <Image
                  src={list.fullbody_image}
                  alt="내가 비슷한 온도에 입었어요."
                  width={140}
                  height={180}
                  className="object-cover h-[180px] w-[140px]"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="items-center justify-center flex flex-col pb-10">
          <Image
            src="/images/icon_heart-eyes.svg"
            alt="기록하러가기"
            width={65}
            height={65}
            className="animate-bounce animate-duration-[1400ms]"
          />
          <Link
            href="/user/write"
            className="text-bk text-body4 flex items-center"
          >
            기록하러 가기
            <IoIosArrowBack className=" text-bk rotate-180" />
          </Link>
        </div>
      )}
    </section>
  )
}

export default TempClothing
