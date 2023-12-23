import fetchUser from '../../fetchUser'
import CollectionList from '../_components/CollectionList'
import { fetchCollection } from '../fetchCollection'

const Collection = async ({
  searchParams,
}: {
  searchParams: { temp_min: string; temp_max: string }
}) => {
  const dataLimit = 10
  const tempMin = Number(searchParams.temp_min)
  const tempMax = Number(searchParams.temp_max)

  const user = await fetchUser()
  const collections = await fetchCollection({
    tempMin: tempMin,
    tempMax: tempMax,
    lastDoc: null,
    uid: user.uid,
  })

  return (
    <>
      <CollectionList
        uid={user.uid}
        collections={collections}
        tempMax={tempMax}
        tempMin={tempMin}
        dataLimit={dataLimit}
      />
    </>
  )
}

export default Collection
