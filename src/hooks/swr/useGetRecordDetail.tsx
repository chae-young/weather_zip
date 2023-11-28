import { doc, getDoc } from 'firebase/firestore'
import useSWR from 'swr'
import { db } from '../../../firebase/firebasedb'

const fetcher = async (id: string) => {
  try {
    const docRef = doc(db, 'collection', `${id}`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      return docSnap.data()
    }
  } catch (err) {
    console.error(err)
    throw err
  }

  return null
}

const useGetRecordDetail = (id: string) =>
  useSWR(`recordDetail`, () => fetcher(id))

export default useGetRecordDetail
