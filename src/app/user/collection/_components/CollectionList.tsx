'use client'

import { Tcollection } from '@/app/(share)/weatherLogs/fetchWeatherLogs'
import CollectionItem from './CollectionItem'
import LoadMoreCollection from './LoadMoreCollection'
import { newLastDoc } from '@/util/timestampChange'
import collectionAtom from '@/recoil/atom/collectionAtom'
import { useRecoilState } from 'recoil'
import { Suspense, useEffect } from 'react'
import { fetchCollection } from '../fetchCollection'
import useGetCollection from '@/hooks/swr/useGetCollection'

interface CollectionListProps {
  // collections: Tcollection[]
  tempMax?: number
  tempMin?: number
  dataLimit: number
  collections: Tcollection[]
  uid: string
}

const CollectionList = ({
  tempMax,
  tempMin,
  dataLimit,
  collections,
  uid,
}: CollectionListProps) => {
  const [collectionState, setCollectionState] = useRecoilState(collectionAtom)

  const reFetchCollection = async () => {
    const collections = await fetchCollection({
      tempMin: collectionState.tempMin,
      tempMax: collectionState.tempMax,
      lastDoc: null,
      uid: uid,
    })
    setCollectionState((prevState) => ({
      ...prevState,
      collections: collections,
    }))
  }

  useEffect(() => {
    if (collectionState.tempMax !== 0) {
      reFetchCollection()
    } else {
      setCollectionState((prevState) => ({
        ...prevState,
        collections: collections,
      }))
    }
    console.log(collectionState.collections)
  }, [collectionState.tempMin])

  return (
    <>
      {collectionState.collections.length === 0 ? (
        <div className="min-h-list flex justify-center mt-10 text-gray-400">
          등록한 컬렉션이 없어요.
        </div>
      ) : (
        <ul className="flex flex-wrap gap-[1px] min-h-list content-start pb-5">
          <CollectionItem collections={collectionState.collections} />
          {collectionState.collections.length >= dataLimit && (
            <LoadMoreCollection
              uid={uid}
              firstDataLength={collections.length}
              tempMin={tempMin}
              tempMax={tempMax}
              lastDoc={
                collectionState.collections.length === dataLimit &&
                newLastDoc(collections[collectionState.collections.length - 1])
              }
            />
          )}
        </ul>
      )}
    </>
  )
}

export default CollectionList
