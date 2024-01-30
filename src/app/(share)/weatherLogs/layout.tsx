import Nav from '@/app/_components/common/Nav'
import TopTitle from '@/app/_components/common/TopTitle'
import InnerCon from '@/app/_components/common/InnerCon'

interface WeatherLogsLayoutProps {
  logs: React.ReactNode
}

const WeatherLogsLayout = ({ logs }: WeatherLogsLayoutProps) => {
  return (
    <div className="">
      <TopTitle title="날씨로그" />
      <InnerCon>{logs}</InnerCon>
      <Nav />
    </div>
  )
}

export default WeatherLogsLayout
