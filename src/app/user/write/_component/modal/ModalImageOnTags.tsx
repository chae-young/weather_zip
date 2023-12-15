'use client'

import BottomSheet from '@/app/_components/BottomSheet'
import ColButton from '@/app/_components/Button/ColButton'
import WideButton from '@/app/_components/Button/WideButton'
import InnerCon from '@/app/_components/common/InnerCon'
import useInputChange from '@/hooks/useInputChange'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import TagList from './TagList'
import useImageTouchEvent from '@/hooks/useImageTouchEvent'
import useResponsiveImageSize from '@/hooks/useResponsiveImageSize'
import { useRecoilState } from 'recoil'
import imagTagsAtom from '@/recoil/atom/imageTagsAtom'
import useImageMouseEvent from '@/hooks/useImageMouseEvent'
import ImageOnTherTagList from '@/app/_components/\bImageOnTheTagList'

interface ModalImageOnTagsProps {
  imageURL: string
  isOpenLayer: boolean
  isCloseLayer: boolean
  handleTagLayerClose: () => void
}

const ModalImageOnTags = ({
  imageURL,
  isOpenLayer,
  isCloseLayer,
  handleTagLayerClose,
}: ModalImageOnTagsProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { imageSize } = useResponsiveImageSize(ref)
  const [brandName, setBrandName] = useState('')
  const [ImageClick, setImageClick] = useState(false)
  const [tags, setTags] = useRecoilState(imagTagsAtom)
  const [coordinate, setCoordinate] = useState({ x: 0, y: 0 })
  const { handleTouchStart, handleTouchMove, handleTouchEnd } =
    useImageTouchEvent(ref, imageSize, setTags)
  const { handleMouseMove, handleMouseDown, handleMouseUp } =
    useImageMouseEvent(ref, imageSize, setTags)

  const onChangeBrandName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandName(e.target.value)
  }

  // 취소
  const handelOnCancel = () => {
    setImageClick(false)
  }

  // 이미지 클릭 후 태그 추가
  const handelAddTags = (e: React.MouseEvent<HTMLDivElement>) => {
    setImageClick(true)
    setBrandName('')

    const currentTargetRect = e.currentTarget.getBoundingClientRect()
    const e_offsetX = e.clientX - currentTargetRect.left
    const e_offsetY = e.clientY - currentTargetRect.top

    setCoordinate((prev) => ({
      x: e_offsetX,
      y: e_offsetY,
    }))
  }

  // 태그 등록하기
  const handeOnSubmit = () => {
    setTags((prevTags) => [
      ...prevTags,
      {
        id: brandName + (coordinate.x + coordinate.y),
        name: brandName,
        x: (coordinate.x / imageSize.w) * 100 + '%',
        y: (coordinate.y / imageSize.w) * 100 + '%',
      },
    ])
    setImageClick(false)
  }

  // 태그 삭제
  const handleTagDelete = (id: string) => {
    const newTags = tags.filter((tag) => tag.id !== id)
    setTags(newTags)
  }

  // 등록하기
  const handleImageUpload = () => {
    handleTagLayerClose()
  }

  // 이미 등록한 태그 클릭시
  const handleClickTag = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <>
      {isOpenLayer && imageURL && (
        <div
          className={`fixed left-0 top-0 right-0 m-auto bg-white z-50 w-full h-screen max-w-[var(--container)] pt-12 ${
            isCloseLayer ? 'animate-isDown' : 'animate-isUp'
          }`}
        >
          <div
            ref={ref}
            className="dropzone relative w-full h-auto aspect-square overflow-hidden touch-none"
            onClick={handelAddTags}
          >
            <Image
              src={imageURL}
              alt="btnStart"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              placeholder="blur"
              onClick={handelAddTags}
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            />
            {/* 이미지 위에 추가된 태그 리스트 */}
            <ImageOnTherTagList
              tags={tags}
              move
              handleClickTag={handleClickTag}
              handleTouchStart={handleTouchStart}
              handleTouchMove={handleTouchMove}
              handleTouchEnd={handleTouchEnd}
              handleMouseMove={handleMouseMove}
              handleMouseUp={handleMouseUp}
              handleMouseDown={handleMouseDown}
            />
          </div>
          {/* 태그 리스트 */}
          <TagList
            tags={tags}
            handleTagDelete={handleTagDelete}
            handleImageUpload={handleImageUpload}
          />
          {/* 레이어 닫기 */}
          <button
            onClick={handleTagLayerClose}
            className="absolute left-2 top-2 w-8 h-8 flex justify-center items-center"
          >
            <span className="sr-only">닫기</span>
            <IoIosArrowBack className="text-xl" />
          </button>
        </div>
      )}
      {/* 바텀시트 */}
      {ImageClick && (
        <BottomSheet>
          <input
            type="text"
            autoFocus
            value={brandName}
            onChange={onChangeBrandName}
            className="h-12 border-gray3 border rounded-2xl w-full px-4 placeholder:text-gray-400 placeholder:font-light"
            placeholder="브랜드명을 입력하세요"
          />
          <ColButton
            handelOnCancel={handelOnCancel}
            handeOnSubmit={handeOnSubmit}
          />
        </BottomSheet>
      )}
    </>
  )
}

export default ModalImageOnTags
