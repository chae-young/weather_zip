import Nav from '../_components/common/Nav'
import CurrentDaysWeather from './CurrentDaysWeather'
import CurrentWeather from './CurrentWeather'
import RecommendList from './_components/RecommendList'

const Home = () => (
  <>
    <section className="bg-pointBg flex flex-col justify-center items-center relative overflow-hidden">
      <CurrentWeather />
      <CurrentDaysWeather />
      <article className="w-full">
        <section className="w-full rounded-tl-[30px] rounded-tr-[30px] bg-white pt-10 px-5 min-h-min pb-16">
          <RecommendList />
        </section>
      </article>
    </section>
    <Nav />
  </>
)

export default Home
