import TopTitle from '../../_components/common/TopTitle'
import Tab from './_components/Tab'
import CollectionList from './_components/CollectionList'
import Nav from '../../_components/common/Nav'
import InnerCon from '../../_components/common/InnerCon'
import { fetchCollection } from './fetchCollection'
import LoadMoreCollection from './_components/LoadMoreCollection'
import { newLastDoc } from '@/util/timestampChange'
import fetchUser from '../fetchUser'

const Collection = async ({
  searchParams,
}: {
  searchParams: { temp_min: string; temp_max: string }
}) => {
  const user = await fetchUser()
  const dataLimit = 10
  const tempMin = Number(searchParams.temp_min)
  const tempMax = Number(searchParams.temp_max)
  const collections = await fetchCollection({
    tempMin,
    tempMax,
    lastDoc: null,
    uid: user.uid,
  })

  return (
    <div className="bg-pointSubBg">
      {/* <LoginCheck /> */}
      <TopTitle title="컬렉션" />
      <InnerCon>
        <Tab />
        {collections.length === 0 ? (
          <div className="min-h-list flex justify-center mt-10 text-gray-400">
            등록한 컬렉션이 없어요.
          </div>
        ) : (
          <ul className="flex flex-wrap gap-[1px] min-h-list content-start pb-5">
            <CollectionList collections={collections} />
            {collections.length >= dataLimit && (
              <LoadMoreCollection
                uid={user.uid}
                firstDataLength={collections.length}
                tempMin={tempMin}
                tempMax={tempMax}
                lastDoc={
                  collections.length === dataLimit &&
                  newLastDoc(collections[collections.length - 1])
                }
              />
            )}
          </ul>
        )}
      </InnerCon>
      <Nav />
    </div>
  )
}

export default Collection
