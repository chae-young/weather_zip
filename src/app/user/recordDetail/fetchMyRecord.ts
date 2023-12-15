import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../../firebase/firebasedb'

export const fetchMyRecord = async (id: string) => {
  try {
    const docRef = doc(db, 'collection', `${id}`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    }
  } catch (err) {
    console.error(err)
    throw err
  }

  return null
}
