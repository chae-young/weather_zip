import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase/firebasedb'
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
  try {
    const q = query(collection(db, 'recommend'), where('temp_max', '>=', temp))
    const querySnapshot = await getDocs(q)
    const res: IrecommendObject[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data() as IrecommendObject

      if (data.temp_min <= temp) {
        res.push(data)
      }
    })
    return res[0]
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const useGetRecommendList = () => {
  const currentWeather = useRecoilValue(currentTempAtom)
  const {
    data: recommendList,
    isValidating,
    isLoading,
  } = useSWR(
    `recommendation-${currentWeather.temp}`,
    () => fetcher(Number(currentWeather.temp)),
    { suspense: true },
  )

  return {
    recommendList,
    isValidating,
    isLoading,
  }
}
