import InnerCon from '../../_components/common/InnerCon'
import Nav from '../../_components/common/Nav'
import TopTitle from '../../_components/common/TopTitle'
import LoadMoreLogs from './_components/LoadMoreLogs'
import WeatherLogList from './_components/WeatherLogList'
import { fetchWeatherLogs } from './fetchWeatherLogs'
import { newLastDoc } from '@/util/timestampChange'

const WeatherLogs = async () => {
  const dataLimit = 10
  const weatherLogs = await fetchWeatherLogs({ dataLimit: 10, lastDoc: null })
  const originalLastDoc = weatherLogs[weatherLogs.length - 1]

  return (
    <>
      <TopTitle title="날씨로그" />
      <InnerCon>
        <ul className="min-h-[800px] px-5 pb-5">
          <WeatherLogList weatherLogs={weatherLogs} />
          <LoadMoreLogs
            firstDataLength={weatherLogs.length}
            lastDoc={
              weatherLogs.length === dataLimit && newLastDoc(originalLastDoc)
            }
          />
        </ul>
      </InnerCon>
      <Nav />
    </>
  )
}

export default WeatherLogs
