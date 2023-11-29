import Image from 'next/image'
import weatherIcons from '@/util/weatherIcons'
import { TcurrentWeather } from '@/hooks/swr/useGetCurrentWeather'
import { HiLocationMarker } from 'react-icons/hi'
import RecordDeleteButton from '../user/recordDetail/_components/RecordDeleteButton'

interface SubWeatherConProps {
  desc: string
  id?: string
  currentWeather: TcurrentWeather
}

const SubWeatherCon = ({ desc, currentWeather, id }: SubWeatherConProps) => (
  <section className="px-5 pt-7 py-10">
    <div className="flex justify-between items-center mb-3">
      <div className="flex">
        <HiLocationMarker className="text-body2 mr-1 self-start" />
        <span className="text-body3">{currentWeather.address}</span>
      </div>
      {id && <RecordDeleteButton id={id} />}
    </div>
    <div className="flex items-center mb-2">
      {currentWeather?.icon && (
        <Image
          src={weatherIcons[currentWeather?.icon.substring(0, 2)]}
          alt={desc}
          width={35}
          height={35}
        />
      )}
      <b className="text-[34px] ml-5">{currentWeather?.temp}℃</b>
    </div>
    <p className="whitespace-pre-line text-body3">{desc}</p>
  </section>
)

export default SubWeatherCon
