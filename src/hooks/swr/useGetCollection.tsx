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
import useSWR from 'swr'
import { fetchCollection } from '@/app/user/collection/fetchCollection'
import { useRecoilValue } from 'recoil'
import collectionAtom from '@/recoil/atom/collectionAtom'

type Tcollection = {
  id: string
  nickname: string
  timestamp: any
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
  const [key, tempMin, tempMax, lastDoc] = fetchInfo
  let q
  if (tempMin || tempMax) {
    q = query(
      collection(db, 'collection'),
      where('weather.temp', '>=', tempMin),
      where('weather.temp', '<=', tempMax),
      //orderBy('timestamp'),
      ...(lastDoc ? [startAfter(lastDoc)] : []),
      limit(10),
    )
  } else {
    q = query(
      collection(db, 'collection'),
      orderBy('timestamp'),
      ...(lastDoc ? [startAfter(lastDoc)] : []),
      limit(10),
    )
  }

  const querySnapshot = await getDocs(q)
  const data: Tcollection[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    nickname: doc.data().nickname,
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

  return data
}

const useGetCollection = (uid: string) => {
  const collectionInfo = useRecoilValue(collectionAtom)
  // if (collectionInfo.tempMax === 0) return

  const { data: tabClickedCollections, isLoading } = useSWR<Tcollection[]>(
    'collection',
    () =>
      fetchCollection({
        tempMin: collectionInfo.tempMin,
        tempMax: collectionInfo.tempMax,
        uid,
      }),
  )

  return {
    tabClickedCollections,
    isLoading,
  }
}

export default useGetCollection
