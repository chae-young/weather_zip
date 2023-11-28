import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
import { db } from '../../../firebase/firebasedb'
import useSWRInfinite from 'swr/infinite'

export type Tcollection = {
  id: string
  timestamp: Date
  address: string
  each_image: string[]
  fullbody_image: string
  userId: string
  weather: {
    temp: number
    icon: string
    desc: string
  }
}

const fetcher = async (fetchInfo: any): Promise<Tcollection[]> => {
  const [key, lastDoc] = fetchInfo
  const q = query(
    collection(db, 'collection'),
    orderBy('timestamp'),
    ...(lastDoc ? [startAfter(lastDoc)] : []),
    limit(10),
  )

  const querySnapshot = await getDocs(q)
  const data: Tcollection[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    timestamp: doc.data().timestamp,
    address: doc.data().address,
    each_image: doc.data().each_image,
    fullbody_image: doc.data().fullbody_image,
    userId: doc.data().userId,
    weather: {
      temp: doc.data().weather.temp,
      icon: doc.data().weather.icon,
      desc: doc.data().weather.desc,
    },
  }))

  console.log(data)
  return data
}

const useGetLogs = () => {
  const getKey = (pageIndex: number, previousPageData: Tcollection[]) => {
    if (previousPageData && !previousPageData.length) return null
    if (pageIndex === 0) return ['collection']
    const lastDoc = previousPageData[previousPageData.length - 1]
    if (lastDoc) return ['collection', lastDoc.timestamp]
  }

  const {
    data: weatherLogs,
    size,
    setSize,
  } = useSWRInfinite<Tcollection[]>(getKey, fetcher)

  return {
    weatherLogs,
    size,
    setSize,
  }
}

export default useGetLogs
