'use client'

import Image from 'next/image'
import { collection, getDocs, query, where } from 'firebase/firestore'
import useSWR from 'swr'
import { useRecoilValue } from 'recoil'
import currentTempAtom from '@/recoil/atom/currentTempAtom'
import { fetchRecommendList } from '../fetchRecommendList'
import SkeletonRecommendList from '../_skeleton/SkeletonRecommendList'

const RecommendList = () => {
  const currentWeather = useRecoilValue(currentTempAtom)
  const { data, isValidating } = useSWR(
    `recommendation-${currentWeather.temp}`,
    () => fetchRecommendList(Number(currentWeather.temp)),
  )

  if (isValidating || !currentWeather.temp) {
    return <SkeletonRecommendList />
  }

  return (
    <>
      <h3 className="text-h4 mb-3">{data?.title}</h3>
      <div className="flex overflow-x-auto space-x-8 mb-6">
        <div className="flex shrink-0 [&>*:last-child]:mr-0">
          {data?.list.map((url: string) => (
            <div className="rounded-2xl overflow-hidden mr-1" key={url}>
              <Image
                src={url}
                alt=""
                width={140}
                height={180}
                className="object-cover h-[180px] w-[140px]"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default RecommendList
