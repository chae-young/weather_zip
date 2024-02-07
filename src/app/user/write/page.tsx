import WriteContent from './_component/WriteContent'
import fetchUser from '../fetchUser'

const Write = async () => {
  const user = await fetchUser()
  return (
    <div className="bg-pointSubBg h-screen">
      <WriteContent user={user!} />
    </div>
  )
}

export default Write
