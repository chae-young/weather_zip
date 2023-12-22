import Nav from '../_components/common/Nav'
import fetchUser from '../user/fetchUser'
import CurrentDaysWeather from './CurrentDaysWeather'
import CurrentWeather from './CurrentWeather'
import HomeList from './_components/HomeList'
import RecommendList from './_components/RecommendList'
import TempClothing from './_components/TempClothingList'

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
