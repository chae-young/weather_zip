'use client'

import { useRouter } from 'next/navigation'
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../../../../firebase/firebasedb'

import useGetCurrentWeather, {
  TcurrentWeather,
} from '@/hooks/swr/useGetCurrentWeather'
import SubWeatherCon from '@/app/_components/SubWeatherCon'
import SkeletonInfoWeather from '../_skeleton/SkeletonInfoWeather'
import BottomRoundedCon from '@/app/_components/BottomRoundedCon'
import WideButton from '@/app/_components/Button/WideButton'
import UploadImage from './UploadImage'
import UploadMultiImage from './UploadMultiImage'
import useImageUpload from '@/hooks/useImageUpload'
import { Tuser } from '../../fetchUser'

interface WriteContentProps {
  user: Tuser | undefined
}

const WriteContent = ({ user }: WriteContentProps) => {
  const router = useRouter()
  const { currentWeather } = useGetCurrentWeather()

  const desc = `현재 성남시 날씨는 ${currentWeather?.temp}°C 에요.
      오늘 입을 옷을 기록해봐요.`

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
        fullbody_image: imageURL,
        each_image: imageList,
      })
      router.push(`/user/recordDetail/${id}`)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  return (
    <>
      {currentWeather.temp !== undefined ? (
        <SubWeatherCon desc={desc} currentWeather={currentWeather} />
      ) : (
        <SkeletonInfoWeather />
      )}
      <BottomRoundedCon>
        <section>
          <h3 className="text-body3 mb-4">전신샷</h3>
          <UploadImage
            setImageURL={setImageURL}
            handelImageUpload={handelImageUpload}
            imageURL={imageURL}
            uploadIng={uploadIng}
          />
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
        <WideButton type="button" onClick={handleOnSubmit} content="기록하기" />
      </BottomRoundedCon>
    </>
  )
}

export default WriteContent
