'use client'

import Image from 'next/image'

import weatherIcons from '@/util/weatherIcons'
import ImageFeed from '@/app/_components/collection/ImageFeed'
import { newLastDoc, toDateTime } from '@/util/timestampChange'
import { Tcollection } from '../fetchWeatherLogs'
import LoadMoreLogs from './LoadMoreLogs'

interface WeatherLogListProps {
  weatherLogs: Tcollection[]
}
const WeatherLogList = ({ weatherLogs }: WeatherLogListProps) => {
  return (
    <>
      {weatherLogs.map((weatherLog) => (
        <li className="mb-14" key={weatherLog.id}>
          <div className="flex items-center mb-2 justify-between">
            {/* <span className="rounded-full bg-gray-500 w-8 h-8 block"></span>{' '} */}
            <span className="text-body3">{weatherLog.nickname}</span>
            <span className="text-body4 text-gray-400">
              {toDateTime(weatherLog.timestamp.seconds)}
            </span>
          </div>
          <div>
            <ImageFeed
              tags={weatherLog.tags}
              fullbody_image={weatherLog.fullbody_image}
              each_image={weatherLog.each_image}
              desc={weatherLog.weather.desc}
            />
          </div>
          <div className="flex gap-2">
            <span className="bg-[#f5f5f5] rounded-2xl h-6 px-3 text-body4 flex justify-center items-center">
              <Image
                priority={true}
                src={weatherIcons[weatherLog.weather.icon?.substring(0, 2)]}
                width={15}
                height={15}
                alt={weatherLog.weather.desc}
                className="mr-1 w-4 h-4"
              />
              {weatherLog.weather.desc}
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
