import { Ttag } from '@/recoil/atom/imageTagsAtom'
import React, { Dispatch, RefObject, SetStateAction, useRef } from 'react'

const useImageMouseEvent = (
  ref: RefObject<HTMLDivElement>,
  imageSize: { w: number; h: number },
  setTags: Dispatch<SetStateAction<Ttag[]>>,
) => {
  const dragging = useRef(false)

  // 마우스 스타트
  const handleMouseDown = (e: React.DragEvent<HTMLButtonElement>) => {
    //console.log('[pc]')
    const ghostImage = new Image()
    ghostImage.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

    // e.dataTransfer.setDragImage()를 사용할 때 이미지 엘리먼트를 전달합니다.
    e.dataTransfer.setDragImage(ghostImage, 0, 0)
    dragging.current = true
  }
  // 마우스 중
  const handleMouseMove = (
    e: React.DragEvent<HTMLButtonElement>,
    coords: { x: string; y: string },
  ) => {
    const ele = e.currentTarget
    const currentTargetRect = ref?.current?.getBoundingClientRect()

    let dx = e.clientX - currentTargetRect!.left
    let dy = e.clientY - currentTargetRect!.top
    //console.log('[pc]드래그중....')
    ele.style.left = `${((dx - ele.offsetWidth / 4) / imageSize.w) * 100}%`
    ele.style.top = `${((dy - ele.offsetHeight / 4) / imageSize.h) * 100}%`
  }
  // 마우스 끝
  const handleMouseUp = (e: React.DragEvent<HTMLButtonElement>) => {
    //console.log('드래그 끝', e.currentTarget)
    dragging.current = false
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
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  }
}

export default useImageMouseEvent
