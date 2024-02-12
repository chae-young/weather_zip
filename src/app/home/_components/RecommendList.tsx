'use client'

import Image from 'next/image'
import SkeletonRecommendList from '../_skeleton/SkeletonRecommendList'
import { useGetRecommendList } from '@/hooks/swr/useGetRecommendList'

const RecommendList = () => {
  const { recommendList, isValidating } = useGetRecommendList()

  // if (isValidating && !recommendList) {
  //   return <SkeletonRecommendList />
  // }

  return (
    <section>
      {recommendList?.list.length > 0 ? (
        <>
          <h3 className="text-h4 mb-3">{recommendList?.title}</h3>
          <div className="flex overflow-x-auto space-x-8 mb-6">
            <div className="flex shrink-0 [&>*:last-child]:mr-0 h-44">
              {recommendList?.list.map((url: string) => (
                <div
                  className="rounded-2xl overflow-hidden mr-1 bg-gray-600"
                  key={url}
                >
                  <Image
                    priority={true}
                    src={url}
                    alt={recommendList.title}
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
        <SkeletonRecommendList />
      )}
    </section>
  )
}

export default RecommendList
