import fetchUser from '../../fetchUser'
import CollectionLengInfo from './../_components/CollectionLengInfo'

const UserInfo = async () => {
  const user = await fetchUser()
  return (
    <>
      <h2 className="text-2xl mt-4">{user?.nickname}</h2>
      <CollectionLengInfo uid={user?.uid!} />
    </>
  )
}

export default UserInfo
