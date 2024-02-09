export const dynamic = 'force-dynamic'
import importDynamic from 'next/dynamic'

import { newLastDoc } from '@/util/timestampChange'
import { fetchWeatherLogs } from '../fetchWeatherLogs'
import LoadMoreLogs from '../_components/LoadMoreLogs'

import WeatherLogList from '../_components/WeatherLogList'

const WeatherLogs = async () => {
  const dataLimit = 10
  const weatherLogs = await fetchWeatherLogs({ dataLimit: 10, lastDoc: null })
  const originalLastDoc = weatherLogs[weatherLogs.length - 1]
  return (
    <>
      <ul className="min-h-[800px] px-5 pb-5">
        <WeatherLogList weatherLogs={weatherLogs} />
        {weatherLogs.length >= 10 && (
          <LoadMoreLogs
            firstDataLength={weatherLogs.length}
            lastDoc={
              weatherLogs.length === dataLimit && newLastDoc(originalLastDoc)
            }
          />
        )}
      </ul>
    </>
  )
}

export default WeatherLogs
