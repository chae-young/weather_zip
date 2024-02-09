'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'

import { Tcollection } from '../fetchWeatherLogs'

import { lastDocTimestamp } from '@/util/timestampChange'

const InfiniteScroll = dynamic(
  () => import('@/app/_components/common/InfiniteScroll'),
  { ssr: false },
)
const WeatherLogList = dynamic(() => import('./WeatherLogList'), { ssr: false })

interface LoadMoreLogsProps {
  lastDoc?: Tcollection | false
  firstDataLength: number
}

const LoadMoreLogs = ({ lastDoc, firstDataLength }: LoadMoreLogsProps) => {
  const [weatherLogs, setWeatherLogs] = useState<Tcollection[]>([])
  const [dataLength, setdataLength] = useState(firstDataLength)
  const [loaedMoreLastDac, setLoaedMoreLastDac] = useState(lastDoc)

  const fetchMoreData = async () => {
    if (loaedMoreLastDac) {
      const fetchWeatherLogs = await import('../fetchWeatherLogs').then(
        (mod) => mod.fetchWeatherLogs,
      )
      fetchWeatherLogs({
        dataLimit: 10,
        lastDoc: lastDocTimestamp(loaedMoreLastDac),
      })
        .then((res: Tcollection[]) => {
          setWeatherLogs((prevData) => [...prevData, ...res])
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
      <WeatherLogList weatherLogs={weatherLogs} />
      {!(dataLength < 10) && <InfiniteScroll fetchMoreData={fetchMoreData} />}
    </>
  )
}

export default LoadMoreLogs
