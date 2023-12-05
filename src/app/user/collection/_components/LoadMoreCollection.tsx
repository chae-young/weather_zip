'use client'

import React, { useState } from 'react'
import InfiniteScroll from '@/app/_components/common/InfiniteScroll'
import { fetchCollection } from '../fetchCollection'
import { lastDocTimestamp } from '@/util/timestampChange'
import { Tcollection } from '@/app/(share)/weatherLogs/fetchWeatherLogs'
import CollectionItem from './CollectionItem'

interface LoadMoreCollectionProps {
  lastDoc?: Tcollection | false
  firstDataLength: number
  tempMax: number
  tempMin: number
  uid: string
}

const LoadMoreCollection = ({
  lastDoc,
  firstDataLength,
  tempMin,
  tempMax,
  uid,
}: LoadMoreCollectionProps) => {
  const [collections, setCollections] = useState<Tcollection[]>([])
  const [dataLength, setdataLength] = useState(firstDataLength)
  const [loaedMoreLastDac, setLoaedMoreLastDac] = useState(lastDoc)

  const fetchMoreData = () => {
    if (loaedMoreLastDac) {
      fetchCollection({
        tempMin,
        tempMax,
        lastDoc: lastDocTimestamp(loaedMoreLastDac),
        uid: uid,
      })
        .then((res: Tcollection[]) => {
          setCollections((prevData) => [...prevData, ...res])
          setdataLength(res.length)
          setLoaedMoreLastDac(!(res.length > 10) ? res[res.length - 1] : false)
        })
        .catch((error: unknown) => {
          console.error(error)
        })
    }
  }

  return (
    <>
      <CollectionItem collections={collections} />
      {!(dataLength < 10) && <InfiniteScroll fetchMoreData={fetchMoreData} />}
    </>
  )
}

export default LoadMoreCollection
