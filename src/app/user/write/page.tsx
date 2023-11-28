import TopTitle from '../../_components/common/TopTitle'
import Nav from '../../_components/common/Nav'
import InnerCon from '@/app/_components/common/InnerCon'
import WriteContent from './_component/WriteContent'
import fetchUser from '../fetchUser'

const Write = async () => {
  const user = await fetchUser()
  return (
    <div className="bg-pointSubBg h-screen">
      <TopTitle title="기록하기" />
      <InnerCon>
        <WriteContent user={user} />
        <Nav />
      </InnerCon>
    </div>
  )
}

export default Write
