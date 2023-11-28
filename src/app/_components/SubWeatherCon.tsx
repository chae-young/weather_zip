import Image from 'next/image'
import weatherIcons from '@/util/weatherIcons'
import { TcurrentWeather } from '@/hooks/swr/useGetCurrentWeather'
import { HiLocationMarker } from 'react-icons/hi'

interface SubWeatherConProps {
  desc: string
  currentWeather: TcurrentWeather
}

const SubWeatherCon = ({ desc, currentWeather }: SubWeatherConProps) => (
  <section className="px-5 pt-7 py-10">
    <div className="text-body3 flex items-center mb-3">
      <HiLocationMarker className="text-body2 mr-1 self-start" />
      <span>{currentWeather.address}</span>
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
