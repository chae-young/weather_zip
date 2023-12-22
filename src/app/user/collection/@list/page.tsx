import Spin from '@/app/_components/common/Spin'
import CollectionList from '../_components/CollectionList'

const Collection = async ({
  searchParams,
}: {
  searchParams: { temp_min: string; temp_max: string }
}) => {
  const dataLimit = 10
  const tempMin = Number(searchParams.temp_min)
  const tempMax = Number(searchParams.temp_max)
  return (
    <>
      <CollectionList
        tempMax={tempMax}
        tempMin={tempMin}
        dataLimit={dataLimit}
      />
    </>
  )
}

export default Collection
