import { atom } from 'recoil'

export type IUser = {
  uid: string | null
  email: string | null
  nickname: string | null
}

const userAtom = atom<IUser>({
  key: 'userAtom',
  default: {
    uid: '',
    email: '',
    nickname: '',
    //temp: '',
  },
})

export default userAtom
