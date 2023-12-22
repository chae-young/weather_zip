import InnerCon from '@/app/_components/common/InnerCon'
import TopTitle from '@/app/_components/common/TopTitle'

interface ProfileLayoutProps {
  children: React.ReactNode
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <>
      <TopTitle back title="프로필" />
      <InnerCon bg={'bg-pointSubBg'}>{children}</InnerCon>
    </>
  )
}

export default ProfileLayout
