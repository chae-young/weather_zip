'use client'

import Image from 'next/image'
import weatherIcons from '@/util/weatherIcons'
import { ICurrentDayItem, ICurrentDays } from '@/types'

interface ICurrentDaysWeatherProps {
  currentWeatherDays: ICurrentDays
}

const CurrentDaysWeather = ({
  currentWeatherDays,
}: ICurrentDaysWeatherProps) => {
  return (
    <div className="w-full">
      <div className="flex overflow-x-auto space-x-8 my-5">
        <div className="flex shrink-0 pl-10">
          {currentWeatherDays?.list.map((day: ICurrentDayItem) => (
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
