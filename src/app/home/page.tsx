import dynamic from 'next/dynamic'
import fetchUser from '@/app/user/fetchUser'
const RecommendList = dynamic(() => import('./_components/RecommendList'), {
  ssr: false,
})
const TempClothing = dynamic(() => import('./_components/TempClothingList'), {
  ssr: false,
})

const Home = async () => {
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

export default Home
