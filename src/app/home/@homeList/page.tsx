import dynamic from 'next/dynamic'
import fetchUser from '@/app/user/fetchUser'

const RecommendList = dynamic(() => import('../_components/RecommendList'), {
  ssr: false,
})
const TempClothing = dynamic(() => import('../_components/TempClothingList'), {
  ssr: false,
})

const HomeList = async () => {
  const user = await fetchUser()

  return (
    <>
      <RecommendList />
      {user?.isLogged && (
        <TempClothing isLogged={user?.isLogged} uid={user.uid} />
      )}
    </>
  )
}

export default HomeList
