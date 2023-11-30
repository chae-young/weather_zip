import weatherIcons from '@/util/weatherIcons'
import Image from 'next/image'

const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <ul className="relative w-64 h-44 flex justify-center">
        {Object.values(weatherIcons).map((img, idx) => (
          <li className="ani-loading animate-slide absolute opacity-0 flex items-center justify-center h-full bg-white">
            <Image src={img} alt="날씨" width={120} height={120} />
          </li>
        ))}
      </ul>
      {/* <p>날씨 수집중..</p> */}
    </div>
  )
}

export default Loading
