'use client'

import Image from 'next/image'
import SkeletonRecommendList from '../_skeleton/SkeletonRecommendList'
import { useGetRecommendList } from '@/hooks/swr/useGetRecommendList'

const RecommendList = () => {
  const { recommendList, isValidating } = useGetRecommendList()

  if (isValidating && !recommendList) {
    return <SkeletonRecommendList />
  }

  return (
    <section>
      <h3 className="text-h4 mb-3">{recommendList?.title}</h3>
      <div className="flex overflow-x-auto space-x-8 mb-6">
        <div className="flex shrink-0 [&>*:last-child]:mr-0">
          {recommendList?.list.map((url: string) => (
            <div className="rounded-2xl overflow-hidden mr-1" key={url}>
              <Image
                src={url}
                alt={recommendList.title}
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

export default RecommendList
