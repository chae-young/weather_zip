'use client'

import React, { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import LoginCheck from '../../_components/LoginCheck'
import TopTitle from '../../_components/common/TopTitle'
import Tab from './_components/Tab'
import InfiniteScroll from '../../_components/common/InfiniteScroll'
import useGetCollection from '@/hooks/swr/useGetCollection'
import CollectionList from './_components/CollectionList'
import Nav from '../../_components/common/Nav'
import InnerCon from '../../_components/common/InnerCon'

const Collection = () => {
  const searchParams = useSearchParams()
  const paramTempMin = Number(searchParams.get('temp_min'))
  const paramTempMax = Number(searchParams.get('temp_max'))

  const { collections, size, setSize } = useGetCollection(
    paramTempMin,
    paramTempMax,
  )

  const fetchedData = useMemo(
    () => collections?.flatMap((data) => data),
    [collections],
  )

  const fetchMoreData = () => {
    setSize((previousSize) => previousSize + 1)
  }

  return (
    <div className="bg-pointSubBg">
      <LoginCheck />
      <TopTitle title="컬렉션" />
      <InnerCon>
        <Tab />

        {/* <ul className="flex flex-wrap gap-[1px] min-h-[800px] content-start">
          {fetchedData?.map((data) => (
            <CollectionList
              key={data.id}
              id={data.id}
              fullbodyImage={data.fullbody_image}
              desc={data.weather.desc}
            />
          ))}
        </ul> */}
        <InfiniteScroll fetchMoreData={fetchMoreData} />
      </InnerCon>
      <Nav />
    </div>
  )
}

export default Collection
