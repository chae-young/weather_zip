export const dynamic = 'force-dynamic'

import importDynamic from 'next/dynamic'

import { newLastDoc } from '@/util/timestampChange'
import { fetchWeatherLogs } from '../fetchWeatherLogs'
const LoadMoreLogs = importDynamic(
  () => import('../_components/LoadMoreLogs'),
  { ssr: false },
)
const WeatherLogList = importDynamic(
  () => import('../_components/WeatherLogList'),
  { ssr: false },
)

const WeatherLogs = async () => {
  const dataLimit = 10
  const weatherLogs = await fetchWeatherLogs({ dataLimit: 10, lastDoc: null })
  const originalLastDoc = weatherLogs[weatherLogs.length - 1]
  return (
    <>
      <ul className="min-h-[800px] px-5 pb-5">
        <WeatherLogList weatherLogs={weatherLogs} />
        <LoadMoreLogs
          firstDataLength={weatherLogs.length}
          lastDoc={
            weatherLogs.length === dataLimit && newLastDoc(originalLastDoc)
          }
        />
      </ul>
    </>
  )
}

export default WeatherLogs
