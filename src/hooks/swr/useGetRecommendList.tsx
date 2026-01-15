import useSWR from 'swr'
import { useRecoilValue } from 'recoil'
import currentTempAtom from '@/recoil/atom/currentTempAtom'

export interface IrecommendObject {
  title: string
  bottom: string
  top: string
  list: string[]
  temp_max: number
  temp_min: number
}
const fetcher = async (temp: number) => {
  const res = await fetch(`/api/recommend?temp=${temp}`)

  if (!res.ok) throw new Error('Faild to fetch')
  return res.json()
}

export const useGetRecommendList = () => {
  const currentWeather = useRecoilValue(currentTempAtom)
  const {
    data: recommendList,
    isValidating,
    isLoading,
  } = useSWR(
    currentWeather.temp ? `recommendation-${currentWeather.temp}` : null,
    () => fetcher(Number(currentWeather.temp)),
    { suspense: false },
  )

  return {
    recommendList,
    isValidating,
    isLoading,
  }
}
