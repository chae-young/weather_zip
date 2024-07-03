import useSWR from 'swr'
import useGeolocation from '../useGeolocation'
import { useEffect, useState } from 'react'
import { axiosInstance } from '@/app/instance'
import { IcurrentWeather, ICurrentDays } from '@/types'
import { useSetRecoilState } from 'recoil'
import currentTempAtom from '@/recoil/atom/currentTempAtom'

const useGetRelatedWeather = () => {
  const { coordinates, loaded } = useGeolocation()
  const [urls, setUrls] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const setCurrentTemp = useSetRecoilState(currentTempAtom)

  // API 병렬적으로 호출
  const multiFetcher = (urls: string[]) => {
    const promises = urls.map((url) => fetcher(url)) as [
      Promise<IcurrentWeather>,
      Promise<ICurrentDays>,
      Promise<string>,
    ]
    return Promise.all(promises)
  }

  // 각 API 호출
  const fetcher = async (url: string) => {
    try {
      const res = await axiosInstance.get(url)
      const data = res.data

      switch (true) {
        case url.includes('weather?'):
          return {
            temp: Math.round(data.main.temp - 273.15),
            temp_max: Math.round(data.main.temp_max - 273.15),
            temp_min: Math.round(data.main.temp_min - 273.15),
            icon: data.weather[0].icon,
            desc: data.weather[0].description,
          }
        case url.includes('kakao'):
          const result = data.documents[0].address
          const addr = `${result.region_1depth_name} ${result.region_2depth_name} ${result.region_3depth_name}`
          return addr
        default:
          return data
      }
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    if (coordinates.lat || coordinates.lng) {
      // * 1: current 2: days weather 3: address
      setUrls([
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&lang=kr&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_APIKEY}`,
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lng}&lang=kr&cnt=10&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_APIKEY}`,
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${coordinates.lng}&y=${coordinates.lat}&input_co'ord=WGS84`,
      ])
    }
  }, [coordinates])

  const {
    data,
    error: isError,
    //isLoading,
    isValidating,
  } = useSWR(urls, () => multiFetcher(urls), {
    suspense: true,
  })
  const [currentWeather, currentWeatherDays, currentAddress] = data ?? []

  const currentWeathers = {
    ...currentWeather,
    address: currentAddress,
  }

  useEffect(() => {
    setCurrentTemp((prev) => ({
      ...prev,
      temp: currentWeathers.temp,
    }))
  }, [currentWeathers.temp])

  return {
    currentWeathers,
    currentWeatherDays,
    currentAddress,
    isError,
    isLoading,
    isValidating,
  }
}

export default useGetRelatedWeather
