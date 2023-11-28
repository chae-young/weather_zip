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
import { Tcollection } from '@/hooks/swr/useGetCollection'

export const fetchCollection = async ({
  tempMin,
  tempMax,
  lastDoc,
}: {
  tempMin: number
  tempMax: number
  lastDoc: any
}) => {
  let q
  if (tempMin || tempMax) {
    q = query(
      collection(db, 'collection'),
      where('weather.temp', '>=', tempMin),
      where('weather.temp', '<=', tempMax),
      orderBy('weather.temp'),
      orderBy('timestamp', 'desc'),
      ...(lastDoc ? [startAt(lastDoc)] : []),
      limit(10),
    )
  } else {
    q = query(
      collection(db, 'collection'),
      orderBy('timestamp', 'desc'),
      ...(lastDoc ? [startAt(lastDoc)] : []),
      limit(10),
    )
  }

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
