'use client'

import React, { Suspense } from 'react'
import { Tuser } from '@/app/user/fetchUser'
import useGetRelatedWeather from '@/hooks/swr/useGetRelatedWeather'
import SkeletonWeather from '../_skeleton/SkeletonWeather'
import CurrentWeather from './currentWeather'
import CurrentDaysWeather from './currentDaysWeather'
import HomeLoading from '../__loading'

interface IHomeSectionProps {
  user?: Tuser | null
}

const HomeSection = ({ user }: IHomeSectionProps) => {
  const {
    currentWeathers,
    currentWeatherDays,
    isLoading,
    isError,
    isValidating,
  } = useGetRelatedWeather()

  //if (!currentWeathers || !currentWeatherDays) return <SkeletonWeather />

  return (
    <>
      <section className="bg-pointBg flex flex-col justify-center items-center relative overflow-hidden">
        <CurrentWeather currentWeathers={currentWeathers} />
        <CurrentDaysWeather currentWeatherDays={currentWeatherDays} />
      </section>
      <article className="w-full bg-pointBg">
        {/* <section className="w-full rounded-tl-[30px] rounded-tr-[30px] bg-white pt-10 px-5 min-h-min pb-16">
          <RecommendList />
          {user?.isLogged && (
            <TempClothing isLogged={user?.isLogged} uid={user.uid} />
          )}
        </section> */}
      </article>
    </>
  )
}

export default HomeSection
