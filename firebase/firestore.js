import { getFirestore } from 'firebase/firestore'
import firebaseDB from './firebasedb'

const fireStore = getFirestore(firebaseDB)
export default fireStore
