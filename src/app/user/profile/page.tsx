import TopTitle from '@/app/_components/common/TopTitle'
import fetchUser from '../fetchUser'
import UpdateProfile from './_components/UpdateProfile'

const Profile = async () => {
  const user = await fetchUser()

  return (
    <>
      <UpdateProfile nickname={user?.nickname} uid={user?.uid} />
    </>
  )
}

export default Profile
