'use client'

import React, { useState } from 'react'
import InfiniteScroll from '@/app/_components/common/InfiniteScroll'
import { fetchCollection } from '../fetchCollection'
import CollectionList from './CollectionList'
import { lastDocTimestamp } from '@/util/timestampChange'
import { Tcollection } from '@/app/(share)/weatherLogs/fetchWeatherLogs'

interface LoadMoreCollectionProps {
  lastDoc?: Tcollection | false
  firstDataLength: number
  tempMax: number
  tempMin: number
}

const LoadMoreCollection = ({
  lastDoc,
  firstDataLength,
  tempMin,
  tempMax,
}: LoadMoreCollectionProps) => {
  const [collections, setCollections] = useState<Tcollection[]>([])
  const [dataLength, setdataLength] = useState(firstDataLength)

  const fetchMoreData = () => {
    if (lastDoc) {
      fetchCollection({ tempMin, tempMax, lastDoc: lastDocTimestamp(lastDoc) })
        .then((res: Tcollection[]) => {
          setCollections((prevData) => [...prevData, ...res])
          setdataLength(collections.length)
        })
        .catch((error: unknown) => {
          console.error(error)
        })
    }
  }

  return (
    <>
      <CollectionList collections={collections} />
      {!(dataLength < 10) && <InfiniteScroll fetchMoreData={fetchMoreData} />}
    </>
  )
}

export default LoadMoreCollection
