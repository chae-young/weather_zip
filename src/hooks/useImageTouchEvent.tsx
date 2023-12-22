import { Ttag } from '@/recoil/atom/imageTagsAtom'
import { Dispatch, RefObject, SetStateAction } from 'react'

const useImageTouchEvent = (
  ref: RefObject<HTMLDivElement>,
  imageSize: { w: number; h: number },
  setTags: Dispatch<SetStateAction<Ttag[]>>,
) => {
  // 터치 스타트
  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    //console.log('[모바일]드래그시작', e.touches[0])
  }
  // 터치 중
  const handleTouchMove =
    ({ x, y }: any) =>
    (e: React.TouchEvent<HTMLButtonElement>) => {
      const ele = e.currentTarget
      const currentTargetRect = ref?.current?.getBoundingClientRect()
      const touch = e.touches[0]
      let dx = touch.clientX - currentTargetRect!.left
      let dy = touch.clientY - currentTargetRect!.top
      //console.log('[모바일]드래그중....', x, y)
      ele.style.left = `${((dx - ele.offsetWidth / 4) / imageSize.w) * 100}%`
      ele.style.top = `${((dy - ele.offsetHeight / 4) / imageSize.h) * 100}%`
    }
  // 터치 끝
  const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
    const currentElId = e.currentTarget.id
    const currentElCoordiLeft = e.currentTarget.style.left
    const currentElCoordiTop = e.currentTarget.style.top
    setTags((prevTag) =>
      prevTag.map((tag) =>
        tag.id === currentElId
          ? {
              ...tag,
              x: currentElCoordiLeft,
              y: currentElCoordiTop,
            }
          : tag,
      ),
    )
  }

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}

export default useImageTouchEvent
