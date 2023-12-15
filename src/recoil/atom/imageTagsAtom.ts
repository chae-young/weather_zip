import { atom } from 'recoil'

export type Ttag = {
  id: string
  name: string
  x: string
  y: string
}

const imagTagsAtom = atom<Ttag[]>({
  key: 'imagTagsAtom',
  default: [],
})

export default imagTagsAtom
