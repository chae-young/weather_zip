import currentTempAtom from '@/recoil/atom/currentTempAtom'
import axios from 'axios'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import useSWR from 'swr'
import useGeolocation from '../useGeolocation'
import useGetAddress from './useGetAddress'

export type TcurrentWeather = {
  address?: string
  temp?: number
  temp_max?: number
  temp_min?: number
  icon?: string
  desc?: string
}

const fetcher = (url: string): Promise<TcurrentWeather> => {
  return axios.get(url).then((res) => {
    const resData = res.data
    return {
      temp: Math.round(resData.main.temp - 273.15),
      temp_max: Math.round(resData.main.temp_max - 273.15),
      temp_min: Math.round(resData.main.temp_min - 273.15),
      icon: resData.weather[0].icon,
      desc: resData.weather[0].description,
    }
  })
}

const useGetCurrentWeather = () => {
  const { coordinates, loaded, error: locationError } = useGeolocation()
  const [currentTemp, setCurrentTemp] = useRecoilState(currentTempAtom)
  const { currentAddress } = useGetAddress(coordinates.lat, coordinates.lng)

  const { data, isLoading, isValidating, error } = useSWR(
    coordinates.lat > 0
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&lang=kr&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_APIKEY}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  )

  const currentWeather = {
    ...data,
    address: currentAddress,
  }

  useEffect(() => {
    setCurrentTemp((prev) => ({
      ...prev,
      temp: currentWeather.temp,
    }))
  }, [currentWeather.temp])

  return {
    currentWeather,
    loaded,
    coordinates,
    locationError,
    isLoading,
    isValidating,
    error,
  }
}

export default useGetCurrentWeather
