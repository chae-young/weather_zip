import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { db } from '../../../firebase/firebasedb'
import useSWR, { useSWRConfig } from 'swr'
import { useRecoilValue } from 'recoil'
import currentTempAtom from '@/recoil/atom/currentTempAtom'

export interface ItempClothing {
  id: string
  fullbody_image: string
  userId: string
}
const fetcher = async (temp: number) => {
  const tempMax = temp + 5
  const tempMin = temp - 5
  const q = query(
    collection(db, 'collection'),
    where('weather.temp', '>=', tempMin),
    where('weather.temp', '<=', tempMax),
    limit(10),
  )
  const querySnapshot = await getDocs(q)
  const data: ItempClothing[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    fullbody_image: doc.data().fullbody_image,
    userId: doc.data().userId,
  }))

  return data
}

export const useGetTempClothingList = (isLogged: boolean) => {
  const { mutate } = useSWRConfig()
  const currentWeather = useRecoilValue(currentTempAtom)
  const {
    data: tempClothingList,
    isValidating,
    isLoading,
  } = useSWR(
    `tempclothing-${currentWeather.temp}-user-${isLogged}`,
    () => fetcher(Number(currentWeather.temp)),
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
    },
  )

  //if (isLogged) mutate(`tempclothing-${currentWeather.temp}-user-${isLogged}`)

  return {
    tempClothingList,
    isValidating,
    isLoading,
  }
}
