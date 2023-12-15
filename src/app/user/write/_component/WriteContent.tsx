'use client'

import { useRouter } from 'next/navigation'
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../../../../firebase/firebasedb'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import useGetCurrentWeather from '@/hooks/swr/useGetCurrentWeather'
import SubWeatherCon from '@/app/_components/SubWeatherCon'
import SkeletonInfoWeather from '../_skeleton/SkeletonInfoWeather'
import BottomRoundedCon from '@/app/_components/BottomRoundedCon'
import WideButton from '@/app/_components/Button/WideButton'
import UploadImage from './UploadImage'
import UploadMultiImage from './UploadMultiImage'
import useImageUpload from '@/hooks/useImageUpload'
import { Tuser } from '../../fetchUser'
import Nav from '@/app/_components/common/Nav'
import TopTitle from '@/app/_components/common/TopTitle'
import InnerCon from '@/app/_components/common/InnerCon'
import imagTagsAtom from '@/recoil/atom/imageTagsAtom'
import ModalImageOnTags from './modal/ModalImageOnTags'
import ImageOnTherTagList from '@/app/_components/\bImageOnTheTagList'

interface WriteContentProps {
  user: Tuser | undefined
}

const WriteContent = ({ user }: WriteContentProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const { currentWeather } = useGetCurrentWeather()
  const [isOpenLayer, setIsOpenLayer] = useState(false)
  const [isCloseLayer, setIsCloseLayer] = useState(false)
  const [tags, setTags] = useRecoilState(imagTagsAtom)

  const {
    handelImageUpload: multiHandelImageUpload,
    imageList,
    setImageList,
    uploadIng: multiUploadIng,
  } = useImageUpload({
    type: 'multi',
  })
  const { handelImageUpload, imageURL, setImageURL, uploadIng } =
    useImageUpload({
      type: 'single',
    })
  const desc = `현재 성남시 날씨는 ${currentWeather?.temp}°C 에요.
  오늘 입을 옷을 기록해봐요.`

  const handleOnSubmit = async () => {
    if (!imageList.length || !imageURL.length)
      return alert('이미지를 업로드해주세요.')

    try {
      const docRef = await doc(collection(db, 'collection'))
      const { id } = docRef

      await setDoc(docRef, {
        id,
        userId: user?.uid,
        nickname: user?.nickname,
        address: currentWeather.address,
        timestamp: serverTimestamp(),
        weather: {
          temp: currentWeather?.temp,
          desc: currentWeather?.desc,
          icon: currentWeather?.icon,
        },
        tags: tags,
        fullbody_image: imageURL,
        each_image: imageList,
      })
      setTags([])
      router.push(`/user/recordDetail/${id}`)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  // 태그추가(레이어 오픈)
  const handleTagLayerOpen = () => {
    setIsCloseLayer(false)
    setIsOpenLayer(true)
  }

  // 레이어창 닫기
  const handleTagLayerClose = () => {
    setIsCloseLayer(true)
    timerRef.current = setTimeout(() => setIsOpenLayer(false), 150)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <>
      <TopTitle title="기록하기" />
      <InnerCon>
        {currentWeather.temp !== undefined ? (
          <SubWeatherCon desc={desc} currentWeather={currentWeather} />
        ) : (
          <SkeletonInfoWeather />
        )}
        <BottomRoundedCon>
          <section>
            <h3 className="text-body3 mb-4">전신샷</h3>
            <div className="relative">
              <UploadImage
                handleTagLayerOpen={handleTagLayerOpen}
                setImageURL={setImageURL}
                handelImageUpload={handelImageUpload}
                imageURL={imageURL}
                setTags={setTags}
                uploadIng={uploadIng}
              />
              <ImageOnTherTagList tags={tags} />
            </div>
          </section>
          <section className="mt-9">
            <h3 className="text-body3 mb-4">
              개별샷 (오늘 입은 옷을 세세하게 올려봐요)
            </h3>
            <UploadMultiImage
              setImageList={setImageList}
              handelImageUpload={multiHandelImageUpload}
              imageList={imageList}
              uploadIng={multiUploadIng}
            />
          </section>
          <WideButton
            type="button"
            onClick={handleOnSubmit}
            content="기록하기"
          />
        </BottomRoundedCon>
        <Nav />
      </InnerCon>
      {/* 모달 */}
      <ModalImageOnTags
        imageURL={imageURL}
        isOpenLayer={isOpenLayer}
        isCloseLayer={isCloseLayer}
        handleTagLayerClose={handleTagLayerClose}
      />
    </>
  )
}

export default WriteContent
