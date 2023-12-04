import { fetchCollectionLeng } from '../fetchCollectionLeng'

interface CollectionLenInfoProps {
  uid: string
}

const CollectionLenInfo = async ({ uid }: CollectionLenInfoProps) => {
  const allCollectionImageLeng = await fetchCollectionLeng(uid)

  return (
    <p className="text-gray-500 mt-3">
      <b className="text-bk">{allCollectionImageLeng}개</b>의 옷을 가지고
      있어요.
    </p>
  )
}

export default CollectionLenInfo
