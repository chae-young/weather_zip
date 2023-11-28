interface BottomRoundedConProps {
  children: React.ReactNode
}

const BottomRoundedCon = ({ children }: BottomRoundedConProps) => (
  <section className="w-full rounded-tl-[30px] rounded-tr-[30px] bg-white pt-10 px-5 min-h-[70vh] pb-20">
    {children}
  </section>
)

export default BottomRoundedCon
