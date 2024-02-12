import Nav from '../_components/common/Nav'

interface HomelayoutProps {
  children: React.ReactNode
  homeList: React.ReactNode
}

const Homelayout = ({ children, homeList }: HomelayoutProps) => {
  return (
    <>
      <section className="bg-pointBg flex flex-col justify-center items-center relative overflow-hidden">
        {children}
      </section>
      <article className="w-full bg-pointBg">
        <section className="w-full rounded-tl-[30px] rounded-tr-[30px] bg-white pt-10 px-5 min-h-min pb-16">
          {homeList}
        </section>
        <Nav />
      </article>
    </>
  )
}

export default Homelayout
