import dynamic from 'next/dynamic'
import Nav from '../_components/common/Nav'
const CurrentDaysWeather = dynamic(() => import('./CurrentDaysWeather'), {
  ssr: false,
})
const CurrentWeather = dynamic(() => import('./CurrentWeather'), { ssr: false })
const HomeList = dynamic(() => import('./_components/HomeList'), { ssr: false })

const Home = async () => {
  return (
    <>
      <section className="bg-pointBg flex flex-col justify-center items-center relative overflow-hidden">
        <CurrentWeather />
        <CurrentDaysWeather />
        <HomeList />
      </section>
      <Nav />
    </>
  )
}

export default Home
