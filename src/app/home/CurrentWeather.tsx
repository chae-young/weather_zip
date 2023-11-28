'use client'

import Image from 'next/image'
import { HiLocationMarker } from 'react-icons/hi'
import { MdPlayArrow } from 'react-icons/md'

import weatherIcons from '@/util/weatherIcons'
import SkeletonCurrentWeather from './_skeleton/SkeletonCurrentWeather'
import useGetCurrentWeather from '@/hooks/swr/useGetCurrentWeather'

const CurrentWeather = () => {
  const { currentWeather, loaded, isLoading, isValidating } =
    useGetCurrentWeather()
  const icon = currentWeather.icon && currentWeather.icon.substring(0, 2)

  if (!loaded || isLoading || isValidating) {
    return <SkeletonCurrentWeather />
  }

  return (
    <article
      className="
    before:content-[''] before:absolute before:-left-20 before:top-6 before:bg-[url(/images/main-cloud.svg)] before:w-40 before:h-24 before:bg-no-repeat before:bg-contain
    after:content-[''] after:absolute after:-right-12 after:bottom-[60%] after:bg-[url(/images/main-cloud.svg)] after:w-40 after:h-24 after:bg-no-repeat after:bg-contain
    before:animate-shake before:animate-infinite before:animate-duration-[10000ms] before:animate-ease-linear
    after:animate-shake after:animate-infinite after:animate-duration-[10000ms] after:animate-ease-linear

    "
    >
      <div className="text-body3 flex justify-center items-center pt-20">
        <HiLocationMarker className="text-body2 mr-1 self-start" />
        <span>{currentWeather.address}</span>
      </div>
      {icon && (
        <Image
          src={weatherIcons[icon]}
          width={138}
          height={153}
          alt=""
          className="m-auto"
        />
      )}

      <div className="text-center mt-4">
        <b className="text-4xl">{`${currentWeather?.temp}℃`}</b>
        <p className="text-body4 flex justify-center items-center mt-3">
          <MdPlayArrow className="-rotate-90 text-[#ff5c5c] w-7" />
          최고온도 {`${currentWeather?.temp_max}℃`}
        </p>
        <p className="text-body4 flex justify-center items-center">
          <MdPlayArrow className="rotate-90 text-[#67b9fd] w-7" />
          최저온도 {`${currentWeather?.temp_min}℃`}
        </p>
      </div>
    </article>
  )
}

export default CurrentWeather
