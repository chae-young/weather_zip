import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase/firebasedb'

export interface IrecommendObject {
  title: string
  bottom: string
  top: string
  list: string[]
  temp_max: number
  temp_min: number
}

export const fetchRecommendList = async (temp: number) => {
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
