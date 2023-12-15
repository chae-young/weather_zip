import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from 'firebase/firestore'
import { db } from '../../../../firebase/firebasedb'
import { Tcollection } from '@/app/(share)/weatherLogs/fetchWeatherLogs'

export const fetchCollection = async ({
  tempMin,
  tempMax,
  lastDoc,
  uid,
}: {
  tempMin?: number
  tempMax?: number
  lastDoc?: any
  uid: string
}) => {
  let q
  if (tempMin || tempMax) {
    q = query(
      collection(db, 'collection'),
      where('userId', '==', uid),
      where('weather.temp', '>=', tempMin),
      where('weather.temp', '<=', tempMax),
      orderBy('weather.temp'),
      orderBy('timestamp', 'desc'),
      ...(lastDoc ? [startAfter(lastDoc)] : []),
      limit(10),
    )
  } else {
    q = query(
      collection(db, 'collection'),
      where('userId', '==', uid),
      orderBy('timestamp', 'desc'),
      ...(lastDoc ? [startAfter(lastDoc)] : []),
      limit(10),
    )
  }

  const querySnapshot = await getDocs(q)
  const data: Tcollection[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    timestamp: doc.data().timestamp,
    nickname: doc.data().nickname,
    address: doc.data().address,
    tags: doc.data().tags,
    each_image: doc.data().each_image,
    fullbody_image: doc.data().fullbody_image,
    userId: doc.data().userId,
    weather: {
      temp: doc.data().weather.temp,
      icon: doc.data().weather.icon,
      desc: doc.data().weather.desc,
    },
  }))

  return data
}
