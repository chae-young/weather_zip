import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

export type IUser = {
  uid: string | null
  email: string | null
  nickname: string | null
}
const localStorage =
  typeof window !== 'undefined' ? window.localStorage : undefined

const { persistAtom } = recoilPersist({
  key: 'userInfo',
  storage: localStorage,
})

const userAtom = atom<IUser>({
  key: 'userAtom',
  default: {
    uid: '',
    email: '',
    nickname: '',
  },
  effects_UNSTABLE: [persistAtom],
})

export default userAtom
