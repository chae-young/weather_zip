import { collection, endAt, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../firebase/firebasedb'

export const fetchCollectionLeng = async () => {
  try {
    const q = query(collection(db, 'collection'))
    const querySnapshot = await getDocs(q)
    let allCollectionImageLeng = 0
    querySnapshot.forEach((doc) => {
      const { each_image } = doc.data()
      allCollectionImageLeng += each_image.length
    })
    return allCollectionImageLeng
  } catch (err) {
    console.error(err)
  }
}
