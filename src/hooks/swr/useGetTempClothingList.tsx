import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../../../firebase/firebasedb'
import useSWR, { useSWRConfig } from 'swr'
import { useRecoilValue } from 'recoil'
import currentTempAtom from '@/recoil/atom/currentTempAtom'
import useGeolocation from '../useGeolocation'

export interface ItempClothing {
  id: string
  fullbody_image: string
  userId: string
}
const fetcher = async (temp: number, uid: string) => {
  const tempMax = temp + 5
  const tempMin = temp - 5

  try {
    const q = query(
      collection(db, 'collection'),
      where('userId', '==', uid),
      where('weather.temp', '>=', tempMin),
      where('weather.temp', '<=', tempMax),
      orderBy('weather.temp'),
      orderBy('timestamp', 'desc'),
      limit(10),
    )
    const querySnapshot = await getDocs(q)
    const data: ItempClothing[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      fullbody_image: doc.data().fullbody_image,
      userId: doc.data().userId,
    }))

    return data
  } catch (err) {
    console.error(err)
    throw ''
  }
}

export const useGetTempClothingList = (isLogged: boolean, uid: string) => {
  const { mutate } = useSWRConfig()
  const { loaded } = useGeolocation()
  const currentWeather = useRecoilValue(currentTempAtom)
  const {
    data: tempClothingList,
    isValidating,
    isLoading,
  } = useSWR<ItempClothing[]>(
    `tempclothing-${currentWeather.temp}-user-${isLogged}`,
    () => fetcher(Number(currentWeather.temp), uid),
    {
      suspense: true,
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
