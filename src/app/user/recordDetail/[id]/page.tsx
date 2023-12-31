import TopTitle from '@/app/_components/common/TopTitle'
import SubWeatherCon from '@/app/_components/SubWeatherCon'
import BottomRoundedCon from '@/app/_components/BottomRoundedCon'
import ImageFeed from '@/app/_components/collection/ImageFeed'
import WideButton from '@/app/_components/Button/WideButton'
import NotFound from '@/app/not-found'
import InnerCon from '@/app/_components/common/InnerCon'
import { fetchMyRecord } from '../fetchMyRecord'

interface recordDetailProps {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

const recordDetail = async ({ params, searchParams }: recordDetailProps) => {
  const recordData = await fetchMyRecord(params.id)
  const desc = `이날 ${recordData?.address} 날씨는 ${recordData?.weather.temp}°C 에요.
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
                id={params.id}
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
                  tags={recordData.tags}
                  fullbody_image={recordData?.fullbody_image}
                  desc={recordData?.weather.desc}
                  each_image={recordData?.each_image}
                />
                <WideButton
                  type="button"
                  content="날씨로그에 올리기"
                  status="upload"
                  data={recordData}
                />
              </BottomRoundedCon>
            </InnerCon>
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </>
  )
}

export default recordDetail
