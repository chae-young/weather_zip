'use client'

import { useParams } from 'next/navigation'
import BottomRoundedCon from '@/app/_components/BottomRoundedCon'
import SubWeatherCon from '@/app/_components/SubWeatherCon'
import TopTitle from '@/app/_components/common/TopTitle'
import useGetRecordDetail from '@/hooks/swr/useGetRecordDetail'
import Image from 'next/image'
import WideButton from '@/app/_components/Button/WideButton'
import SkeletonInfoWeather from '@/app/user/write/_skeleton/SkeletonInfoWeather'
import Nav from '@/app/_components/common/Nav'

const recordDetail = () => {
  const params = useParams()
  const { id } = params
  const { data, isValidating } = useGetRecordDetail(id as string)
  //const data = await getRecordData(id as string)

  const desc = `이날 성남시 날씨는 ${data?.weather.temp}°C 에요.
옷차림이 맘에 드시나요?`
  const currentWeather = {
    temp: data?.weather.temp,
    icon: data?.weather.icon,
  }

  if (isValidating) return <SkeletonInfoWeather />
  console.log(data?.fullbody_image)
  //

  return (
    <div className="bg-pointSubBg">
      <TopTitle title="내 기록" back />
      <SubWeatherCon
        desc={desc}
        currentWeather={
          currentWeather || { temp: '', temp_max: '', temp_min: '', icon: '' }
        }
      />
      <BottomRoundedCon>
        <div className="w-[320px] h-[320px] overflow-hidden rounded-2xl relative">
          {data && (
            <Image
              src={data?.fullbody_image}
              alt={data?.weather.desc}
              fill
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              className="rounded-2xl"
            />
          )}
        </div>
        <div className="flex overflow-x-auto space-x-8 mb-6 mt-5">
          <div className="flex shrink-0 gap-1">
            {data &&
              data?.each_image.map((url: string, idx: number) => (
                <div
                  key={idx}
                  className="w-[140px] h-[140px] overflow-hidden rounded-2xl relative"
                >
                  <Image
                    src={url}
                    alt={data?.weather.desc}
                    fill
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                    className="object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
        <WideButton type="button" content="피드에 올리기" status="upload" />
      </BottomRoundedCon>
      <Nav />
    </div>
  )
}

export default recordDetail
