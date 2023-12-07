import TopTitle from '@/app/_components/common/TopTitle'
import InnerCon from '@/app/_components/common/InnerCon'
import Nav from '@/app/_components/common/Nav'
import CategoryList from './_components/CategoryList'
import fetchUser from '../fetchUser'
import CollectionLengInfo from './_components/CollectionLengInfo'

const Mypage = async () => {
  const user = await fetchUser()

  return (
    <>
      <TopTitle title="마이페이지" />
      <InnerCon bg="bg-pointSubBg" margin>
        <section className="flex flex-col justify-center items-center mt-8">
          <div className="w-[100px] h-[100px] rounded-full bg-pointColor flex justify-center items-center text-gray-400">
            준비중...
          </div>
          <h2 className="text-2xl mt-4">{user?.nickname}</h2>
          <CollectionLengInfo uid={user.uid} />
        </section>
        <section>
          <CategoryList />
        </section>
        <Nav />
      </InnerCon>
    </>
  )
}

export default Mypage
