import fetchUser from '@/app/user/fetchUser'
import Nav from '../_components/common/Nav'
import RecommendList from './_components/RecommendList'
import TempClothing from './_components/TempClothingList'
import CurrentWeather from './_components/currentWeather'
import CurrentDaysWeather from './_components/currentDaysWeather'
import GeolocationInitializer from './_components/GeolocationInitializer'

const Home = async () => {
  const user = await fetchUser()
  return (
    <>
      <GeolocationInitializer />
      <section className="bg-pointBg flex flex-col justify-center items-center relative overflow-hidden">
        <CurrentWeather />
        <CurrentDaysWeather />
      </section>
      <article className="w-full bg-pointBg">
        <section className="w-full rounded-tl-[30px] rounded-tr-[30px] bg-white pt-10 px-5 min-h-min pb-16">
          <RecommendList />
          {user?.isLogged && (
            <TempClothing isLogged={user?.isLogged} uid={user.uid} />
          )}
        </section>
        <Nav />
      </article>
    </>
  )
}

export default Home
