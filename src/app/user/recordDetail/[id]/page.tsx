import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../../../firebase/firebasedb'

import TopTitle from '@/app/_components/common/TopTitle'
import SubWeatherCon from '@/app/_components/SubWeatherCon'
import BottomRoundedCon from '@/app/_components/BottomRoundedCon'
import Nav from '@/app/_components/common/Nav'
import ImageFeed from '@/app/_components/collection/ImageFeed'
import WideButton from '@/app/_components/Button/WideButton'
import NotFound from '@/app/not-found'
import InnerCon from '@/app/_components/common/InnerCon'

interface recordDetailProps {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

const fetcher = async (id: string) => {
  try {
    const docRef = doc(db, 'collection', `${id}`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      return docSnap.data()
    }
  } catch (err) {
    console.error(err)
    throw err
  }

  return null
}

const recordDetail = async ({ params, searchParams }: recordDetailProps) => {
  const recordData = await fetcher(params.id)
  const desc = `이날 성남시 날씨는 ${recordData?.weather.temp}°C 에요.
옷차림이 맘에 드시나요?`
  const currentWeather = {
    temp: recordData?.weather.temp,
    icon: recordData?.weather.icon,
    address: recordData?.address,
  }

  return (
    <>
      {recordData ? (
        <>
          <div className="bg-pointSubBg">
            <TopTitle title="내 기록" back />
            <InnerCon>
              <SubWeatherCon
                desc={desc}
                currentWeather={
                  currentWeather || {
                    temp: '',
                    temp_max: '',
                    temp_min: '',
                    icon: '',
                  }
                }
              />
              <BottomRoundedCon>
                <ImageFeed
                  fullbody_image={recordData?.fullbody_image}
                  desc={recordData?.weather.desc}
                  each_image={recordData?.each_image}
                />
                <WideButton
                  type="button"
                  content="피드에 올리기"
                  status="upload"
                  data={recordData}
                />
              </BottomRoundedCon>
            </InnerCon>
            <Nav />
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </>
  )
}

export default recordDetail
