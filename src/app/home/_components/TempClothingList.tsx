'use client'

import Image from 'next/image'
import SkeletonRecommendList from '../_skeleton/SkeletonRecommendList'
import {
  ItempClothing,
  useGetTempClothingList,
} from '@/hooks/swr/useGetTempClothingList'

interface TempClothingProps {
  isLogged: boolean
}
const TempClothing = ({ isLogged }: TempClothingProps) => {
  const { tempClothingList, isValidating } = useGetTempClothingList(isLogged)

  if (!tempClothingList?.length) {
    return <SkeletonRecommendList />
  }

  return (
    <section className="mt-12">
      <h3 className="text-h4 mb-3">내가 비슷한 온도에 입었어요.</h3>
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
    </section>
  )
}

export default TempClothing
