import TopTitle from '@/app/_components/common/TopTitle'
import InnerCon from '@/app/_components/common/InnerCon'
import Nav from '@/app/_components/common/Nav'
import CategoryList from './_components/CategoryList'

import fetchUser from '../fetchUser'
import { fetchCollectionLeng } from './fetchCollectionLeng'

const Mypage = async () => {
  const allCollectionImageLeng = await fetchCollectionLeng()
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
          <p className="text-gray-500 mt-3">
            <b className="text-bk">{allCollectionImageLeng}개</b>의 옷을 가지고
            있어요.
          </p>
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
