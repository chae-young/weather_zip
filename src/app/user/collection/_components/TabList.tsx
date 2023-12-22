import Link from 'next/link'

interface TabListProps {
  content: string
  isActive: number | null
  onClick: () => void
  idx: number
}

const TabList = ({ content, onClick, isActive, idx }: TabListProps) => (
  <li>
    <button
      onClick={onClick}
      className={`${
        isActive === idx && 'bg-pointColor'
      } bg-gray3 rounded-lg text-body4 whitespace-nowrap flex justify-center items-center h-7 py-1 px-3`}
    >
      {content}
    </button>
  </li>
)

export default TabList
