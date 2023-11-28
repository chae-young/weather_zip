import currentTempAtom from '@/recoil/atom/currentTempAtom'
import { useRecoilValue } from 'recoil'

const useGetTemp = () => {
  const currentTemp = useRecoilValue(currentTempAtom)
  return currentTemp
}

export default useGetTemp
