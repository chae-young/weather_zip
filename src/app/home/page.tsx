import Nav from '../_components/common/Nav'
import fetchUser from '../user/fetchUser'
import CurrentDaysWeather from './CurrentDaysWeather'
import CurrentWeather from './CurrentWeather'
import RecommendList from './_components/RecommendList'
import TempClothing from './_components/TempClothingList'

const Home = async () => {
  const user = await fetchUser()

  return (
    <>
      <section className="bg-pointBg flex flex-col justify-center items-center relative overflow-hidden">
        <CurrentWeather />
        <CurrentDaysWeather />
        <article className="w-full">
          <section className="w-full rounded-tl-[30px] rounded-tr-[30px] bg-white pt-10 px-5 min-h-min pb-16">
            <RecommendList />
            {user?.isLogged && <TempClothing isLogged={user?.isLogged} />}
          </section>
        </article>
      </section>
      <Nav />
    </>
  )
}

export default Home
