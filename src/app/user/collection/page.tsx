import { Suspense } from 'react'
import TopTitle from '../../_components/common/TopTitle'
import Tab from './_components/Tab'
import CollectionList from './_components/CollectionList'
import Nav from '../../_components/common/Nav'
import InnerCon from '../../_components/common/InnerCon'
import fetchUser from '../fetchUser'
import Spin from '@/app/_components/common/Spin'

const Collection = async ({
  searchParams,
}: {
  searchParams: { temp_min: string; temp_max: string }
}) => {
  const user = await fetchUser()
  const dataLimit = 10
  const tempMin = Number(searchParams.temp_min)
  const tempMax = Number(searchParams.temp_max)
  return (
    <div className="bg-pointSubBg">
      <TopTitle title="컬렉션" />
      <InnerCon>
        <Tab />

        {/* <CollectionList
          tempMax={tempMax}
          tempMin={tempMin}
          uid={user.uid}
          dataLimit={dataLimit}
        /> */}
      </InnerCon>
      <Nav />
    </div>
  )
}

export default Collection
