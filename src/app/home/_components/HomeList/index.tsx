import fetchUser from '@/app/user/fetchUser'
import dynamic from 'next/dynamic'
const RecommendList = dynamic(() => import('../RecommendList'))
const TempClothing = dynamic(() => import('../TempClothingList'))

const HomeList = async () => {
  const user = await fetchUser()
  return (
    <>
      <article className="w-full">
        <section className="w-full rounded-tl-[30px] rounded-tr-[30px] bg-white pt-10 px-5 min-h-min pb-16">
          <RecommendList />
          {user?.isLogged && (
            <TempClothing isLogged={user?.isLogged} uid={user.uid} />
          )}
        </section>
      </article>
    </>
  )
}

export default HomeList
