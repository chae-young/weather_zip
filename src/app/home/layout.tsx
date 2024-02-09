import Nav from '@/app/_components/common/Nav'

interface HomeLayoutProps {
  currentWeather: React.ReactNode
  currentDaysWeather: React.ReactNode
  children: React.ReactNode
}

const HomeLayout = ({
  children,
  currentWeather,
  currentDaysWeather,
}: HomeLayoutProps) => {
  return (
    <>
      <section className="bg-pointBg flex flex-col justify-center items-center relative overflow-hidden">
        {currentWeather}
        {currentDaysWeather}
        {children}
      </section>
      <Nav />
    </>
  )
}

export default HomeLayout
