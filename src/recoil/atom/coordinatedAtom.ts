import { atom } from 'recoil'

export interface ICoordinates {
  loaded: boolean
  lat: number
  lng: number
  error: { code: number; message: string } | null
}

const coordinatesAtom = atom<ICoordinates>({
  key: 'coordinatesAtom',
  default: {
    loaded: false,
    lat: 0,
    lng: 0,
    error: null,
  },
})

export default coordinatesAtom
