import useSWR, { useSWRConfig } from 'swr'
import { useRecoilValue } from 'recoil'
import currentTempAtom from '@/recoil/atom/currentTempAtom'
import useGeolocation from '../useGeolocation'
import coordinatesAtom from '@/recoil/atom/coordinatedAtom'

export interface ItempClothing {
  id: string
  fullbody_image: string
  userId: string
}
const fetcher = async (temp: number, uid: string) => {
  const res = await fetch(`/api/temp-clothing?temp=${temp}`)

  if (!res.ok) {
    if (res.status === 401) return []
    throw new Error('Faild to fetch')
  }

  return res.json()
}

export const useGetTempClothingList = (isLogged: boolean, uid: string) => {
  const { mutate } = useSWRConfig()
  const { loaded } = useRecoilValue(coordinatesAtom)
  const currentWeather = useRecoilValue(currentTempAtom)
  const {
    data: tempClothingList,
    isValidating,
    isLoading,
  } = useSWR<ItempClothing[]>(
    currentWeather.temp
      ? `tempclothing-${currentWeather.temp}-user-${isLogged}`
      : null,
    () => fetcher(Number(currentWeather.temp), uid),
    {
      suspense: false,
      revalidateOnMount: false,
      revalidateOnFocus: false,
    },
  )

  //if (isLogged) mutate(`tempclothing-${currentWeather.temp}-user-${isLogged}`)

  return {
    tempClothingList,
    isValidating,
    isLoading,
    loaded,
  }
}
