import { Tcollection } from '@/app/(share)/weatherLogs/fetchWeatherLogs'
import { atom } from 'recoil'

interface TcollectionInfo {
  tempMin: number
  tempMax: number
  collections: Tcollection[]
}

const collectionAtom = atom<TcollectionInfo>({
  key: 'collectionAtom',
  default: {
    tempMin: 0,
    tempMax: 0,
    collections: [],
  },
})

export default collectionAtom
