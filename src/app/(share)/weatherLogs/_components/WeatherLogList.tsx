import Image from 'next/image'

import weatherIcons from '@/util/weatherIcons'
import ImageFeed from '@/app/_components/collection/ImageFeed'
import { Tcollection } from '@/hooks/swr/useGetCollection'
import { toDateTime } from '@/util/timestampChange'

interface WeatherLogListProps {
  weatherLogs: Tcollection[]
}
const WeatherLogList = ({ weatherLogs }: WeatherLogListProps) => {
  return (
    <>
      {weatherLogs.map((weatherLog) => (
        <li className="mb-14">
          <div className="flex items-center mb-2 justify-between">
            {/* <span className="rounded-full bg-gray-500 w-8 h-8 block"></span>{' '} */}
            <span className="text-body3">김치만두</span>
            <span className="text-body4 text-gray-400">
              {toDateTime(weatherLog.timestamp.seconds)}
            </span>
          </div>
          <div>
            <ImageFeed
              fullbody_image={weatherLog.fullbody_image}
              each_image={weatherLog.each_image}
              desc={weatherLog.weather.desc}
            />
          </div>
          <div className="flex gap-2">
            <span className="bg-[#f5f5f5] rounded-2xl h-6 px-3 text-body4 flex justify-center items-center">
              <Image
                src={weatherIcons[weatherLog.weather.icon?.substring(0, 2)]}
                width={15}
                height={15}
                alt={weatherLog.weather.desc}
                className="mr-1"
              />
              맑음
            </span>
            <span className="bg-[#f5f5f5] rounded-2xl flex justify-center items-center h-6 px-3 text-body4">
              {`${weatherLog.weather.temp}℃`}
            </span>
          </div>
        </li>
      ))}
    </>
  )
}

export default WeatherLogList
