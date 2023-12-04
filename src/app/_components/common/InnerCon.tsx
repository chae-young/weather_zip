interface InnerConProps {
  children: React.ReactNode
  bg?: string
  margin?: boolean
}

const InnerCon = ({ children, bg, margin }: InnerConProps) => {
  return (
    <div className={`pt-16 ${bg ? bg : ''} ${margin ? `p-5` : ''} h-full`}>
      {children}
    </div>
  )
}

export default InnerCon
