import Nav from '@/app/_components/common/Nav'
import TopTitle from '@/app/_components/common/TopTitle'
import fetchUser from '../fetchUser'
import UpdateProfile from './_components/UpdateProfile'
import InnerCon from '@/app/_components/common/InnerCon'

const Profile = async () => {
  const user = await fetchUser()

  return (
    <>
      <TopTitle back title="프로필" />
      <InnerCon bg={'bg-pointSubBg'}>
        <UpdateProfile nickname={user?.nickname} uid={user?.uid} />
      </InnerCon>
      <Nav />
    </>
  )
}

export default Profile
