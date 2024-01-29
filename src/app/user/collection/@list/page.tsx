import { useRecoilState, useRecoilValue } from 'recoil'
import fetchUser from '../../fetchUser'
import CollectionList from '../_components/CollectionList'
import { fetchCollection } from '../fetchCollection'
import userAtom from '@/recoil/atom/userAtom'
import useGetCollection from '@/hooks/swr/useGetCollection'

const Collection = async ({
  searchParams,
}: {
  searchParams: { temp_min: string; temp_max: string }
}) => {
  const dataLimit = 10
  const tempMin = Number(searchParams.temp_min)
  const tempMax = Number(searchParams.temp_max)
  const userInfo = await fetchUser()
  console.log(userInfo)
  //const { collections } = useGetCollection(tempMin, tempMax)
  const collections = await fetchCollection({
    tempMin: tempMin,
    tempMax: tempMax,
    lastDoc: null,
    uid: userInfo?.uid!,
  })

  return (
    <>
      <CollectionList
        uid={userInfo?.uid!}
        collections={collections}
        tempMax={tempMax}
        tempMin={tempMin}
        dataLimit={dataLimit}
      />
    </>
  )
}

export default Collection
