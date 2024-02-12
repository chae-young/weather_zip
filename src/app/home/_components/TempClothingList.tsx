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
  const { tempClothingList, isValidating, isLoading, loaded } =
    useGetTempClothingList(isLogged, uid)
  // if (tempClothingList?.length) {
  //   return <SkeletonRecommendList />
  // }

  return (
    <section className="mt-4">
      {!loaded ? (
        <SkeletonRecommendList />
      ) : (tempClothingList?.length as number) > 0 ? (
        <>
          <h3 className="text-h4 mb-3">내가 비슷한 온도에 입었어요.</h3>
          <div className="flex overflow-x-auto space-x-8 mb-6">
            <div className="flex shrink-0 [&>*:last-child]:mr-0 h-44">
              {tempClothingList?.map((list: ItempClothing) => (
                <div className="rounded-2xl overflow-hidden mr-1" key={list.id}>
                  <Image
                    priority={true}
                    src={list.fullbody_image}
                    alt="내가 비슷한 온도에 입었어요."
                    width={140}
                    height={180}
                    className="object-cover w-36 h-44"
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-h4 mb-3">내가 비슷한 온도에 입었어요.</h3>
          <div className="items-center justify-center flex flex-col pb-10">
            <Image
              priority={true}
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
        </>
      )}
    </section>
  )
}

export default TempClothing
