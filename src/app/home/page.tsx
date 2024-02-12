import dynamic from 'next/dynamic'

const CurrentWeather = dynamic(() => import('./_components/currentWeather'), {
  ssr: false,
})
const CurrentDaysWeather = dynamic(
  () => import('./_components/currentDaysWeather'),
  {
    ssr: false,
  },
)

const Home = async () => {
  return (
    <>
      <CurrentWeather />
      <CurrentDaysWeather />
    </>
  )
}

export default Home
