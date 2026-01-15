'use client'

import axios from 'axios'
import Image from 'next/image'
import useSWR from 'swr'
import weatherIcons from '@/util/weatherIcons'
import SkeletonCurrentDays from '../_skeleton/SkeletonCurrentDays'
import { useRecoilValue } from 'recoil'
import coordinatesAtom from '@/recoil/atom/coordinatedAtom'

interface ICurrentDay {
  clouds: { all: number }
  dt: number
  dt_txt: string
  main: {
    feels_like: number
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_kf: number
    temp_max: number
    temp_min: number
  }
  pop: number
  sys: { pod: string }
  visibility: number
  weather: [{ id: number; main: string; description: string; icon: string }]
  wind: { speed: number; deg: number; gust: number }
}

const CurrentDaysWeather = () => {
  const { lat, lng, loaded } = useRecoilValue(coordinatesAtom)
  const fetcher = (url: string) => axios.get(url).then((res) => res.data)
  const { data, error, isLoading, isValidating } = useSWR(
    lat > 0
      ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&lang=kr&cnt=10&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_APIKEY}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  )

  if (!loaded || isLoading || isValidating) {
    return <SkeletonCurrentDays />
  }

  return (
    <div className="w-full">
      <div className="flex overflow-x-auto space-x-8 my-5">
        <div className="flex shrink-0 pl-10">
          {data?.list.map((day: ICurrentDay) => (
            <div className="w-20 flex flex-col items-center" key={day.dt}>
              <div className="w-12 h-12 flex justify-center items-center relative">
                <Image
                  src={weatherIcons[day.weather[0].icon.substring(0, 2)]}
                  alt={day.weather[0].description}
                  fill
                />
              </div>
              <p className="text-body6 mt-2">{`${(
                day.main.temp - 273.15
              ).toFixed()}℃`}</p>
              <p className="text-body6">{day.dt_txt.slice(11, -3)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CurrentDaysWeather
