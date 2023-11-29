'use client'

import React, { useState } from 'react'
import InfiniteScroll from '@/app/_components/common/InfiniteScroll'
import { Tcollection, fetchWeatherLogs } from '../fetchWeatherLogs'
import WeatherLogList from './WeatherLogList'
import { lastDocTimestamp } from '@/util/timestampChange'

interface LoadMoreLogsProps {
  lastDoc?: Tcollection | false
  firstDataLength: number
}

const LoadMoreLogs = ({ lastDoc, firstDataLength }: LoadMoreLogsProps) => {
  const [weatherLogs, setWeatherLogs] = useState<Tcollection[]>([])
  const [dataLength, setdataLength] = useState(firstDataLength)

  const fetchMoreData = () => {
    if (lastDoc) {
      fetchWeatherLogs({ dataLimit: 10, lastDoc: lastDocTimestamp(lastDoc) })
        .then((res: Tcollection[]) => {
          setWeatherLogs((prevData) => [...prevData, ...res])
          setdataLength(weatherLogs.length)
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
