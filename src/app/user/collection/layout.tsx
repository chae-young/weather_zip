import InnerCon from '@/app/_components/common/InnerCon'
import Nav from '@/app/_components/common/Nav'
import TopTitle from '@/app/_components/common/TopTitle'

interface CollectionLayoutProps {
  children: React.ReactNode
  tab: React.ReactNode
  list: React.ReactNode
}

const CollectionLayout = ({ children, tab, list }: CollectionLayoutProps) => {
  return (
    <div className="bg-pointSubBg">
      <TopTitle title="컬렉션" />
      <InnerCon>
        {tab}
        {children}
        {list}
      </InnerCon>
      <Nav />
    </div>
  )
}

export default CollectionLayout
