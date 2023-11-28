'use client'

interface WideButtonProps {
  type: 'submit' | 'button' | 'reset'
  onClick?: () => void
  content: string
  status?: string
}

const WideButton = ({ type, onClick, content, status }: WideButtonProps) => {
  const handleOnClick = () => {
    switch (status) {
      case 'upload':
        console.log('피드에 올리기')
      default:
        console.log('')
    }
  }

  return (
    <button
      type={type ? 'submit' : 'button'}
      onClick={onClick ?? handleOnClick}
      className="bg-pointColor text-body2 rounded-xl flex justify-center items-center w-full h-[50px] m-auto"
    >
      {content}
    </button>
  )
}
export default WideButton
