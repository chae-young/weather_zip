import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import { db } from '../../../../firebase/firebasedb'
import { Ttag } from '@/recoil/atom/imageTagsAtom'

export type Tcollection = {
  id: string
  nickname: string
  timestamp: any
  address: string
  each_image: string[]
  fullbody_image: string
  userId: string
  tags: [] | Ttag[]
  weather: {
    temp: number
    icon: string
    desc: string
  }
}
export const fetchWeatherLogs = async ({
  dataLimit,
  lastDoc,
}: {
  dataLimit: number
  lastDoc: any
}): Promise<Tcollection[]> => {
  const q = query(
    collection(db, 'weatherlog'),
    orderBy('timestamp', 'desc'),
    //startAfter(timestamp),
    ...(lastDoc ? [startAfter(lastDoc)] : []),
    limit(10),
  )

  const querySnapshot = await getDocs(q)
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    nickname: doc.data().nickname,
    timestamp: doc.data().timestamp,
    address: doc.data().address,
    each_image: doc.data().each_image,
    fullbody_image: doc.data().fullbody_image,
    userId: doc.data().userId,
    tags: doc.data().tags,
    weather: {
      temp: doc.data().weather.temp,
      icon: doc.data().weather.icon,
      desc: doc.data().weather.desc,
    },
  }))
  return data
}
