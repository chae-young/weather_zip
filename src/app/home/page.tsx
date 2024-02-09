import dynamic from 'next/dynamic'
import fetchUser from '@/app/user/fetchUser'
import Nav from '../_components/common/Nav'
const CurrentWeather = dynamic(() => import('./_components/currentWeather'), {
  ssr: false,
})
const CurrentDaysWeather = dynamic(
  () => import('./_components/currentDaysWeather'),
  {
    ssr: false,
  },
)
const RecommendList = dynamic(() => import('./_components/RecommendList'), {
  ssr: false,
})
const TempClothing = dynamic(() => import('./_components/TempClothingList'), {
  ssr: false,
})

const Home = async () => {
  const user = await fetchUser()
  return (
    <>
      <section className="bg-pointBg flex flex-col justify-center items-center relative overflow-hidden">
        <CurrentWeather />
        <CurrentDaysWeather />
      </section>
      <article className="w-full">
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
