import { atom } from 'recoil'
//
type Ttemp = {
  location: string
  temp: number | undefined
}

const currentTempAtom = atom<Ttemp>({
  key: 'currentTempAtom',
  default: {
    location: '',
    temp: 0,
  },
})

export default currentTempAtom
