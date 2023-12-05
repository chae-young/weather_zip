'use client'

import currentTempAtom from '@/recoil/atom/currentTempAtom'
import { useRecoilValue } from 'recoil'

const Temp = () => {
  const currentTemp = useRecoilValue(currentTempAtom)
  return currentTemp
}

export default Temp
