import { fetchCollection } from '../fetchCollection'
import LoadMoreCollection from './LoadMoreCollection'
import { newLastDoc } from '@/util/timestampChange'
import CollectionItem from './CollectionItem'

interface CollectionListProps {
  // collections: Tcollection[]
  tempMax: number
  tempMin: number
  uid: string
  dataLimit: number
}

const CollectionList = async ({
  tempMax,
  tempMin,
  uid,
  dataLimit,
}: CollectionListProps) => {
  const collections = await fetchCollection({
    tempMin: tempMin,
    tempMax: tempMax,
    lastDoc: null,
    uid: uid,
  })

  return (
    <>
      {collections.length === 0 ? (
        <div className="min-h-list flex justify-center mt-10 text-gray-400">
          등록한 컬렉션이 없어요.
        </div>
      ) : (
        <ul className="flex flex-wrap gap-[1px] min-h-list content-start pb-5">
          <CollectionItem collections={collections} />
          {collections.length >= dataLimit && (
            <LoadMoreCollection
              uid={uid}
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
    </>
  )
}

export default CollectionList
