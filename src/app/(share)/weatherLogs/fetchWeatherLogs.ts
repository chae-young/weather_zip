import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
} from 'firebase/firestore'
import { db } from '../../../../firebase/firebasedb'

export const fetchWeatherLogs = async ({
  dataLimit,
  lastDoc,
}: {
  dataLimit: number
  lastDoc: any
}) => {
  const q = query(
    collection(db, 'collection'),
    orderBy('timestamp', 'desc'),
    //startAfter(timestamp),
    ...(lastDoc ? [startAt(lastDoc)] : []),
    limit(10),
  )

  const querySnapshot = await getDocs(q)
  const data = querySnapshot.docs.map((doc) => ({
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
