import TopTitle from '@/app/_components/common/TopTitle'
import InnerCon from '@/app/_components/common/InnerCon'
import Nav from '@/app/_components/common/Nav'
import CategoryList from './_components/CategoryList'
import fetchUser from '../fetchUser'

const Mypage = async () => {
  return (
    <>
      <TopTitle title="마이페이지" />
      <InnerCon bg="bg-pointSubBg" margin>
        <section className="flex flex-col justify-center items-center mt-8">
          <div className="w-[100px] h-[100px] rounded-full bg-pointColor flex justify-center items-center text-gray-400">
            준비중...
          </div>
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
