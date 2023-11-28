import { IoClose } from 'react-icons/io5'

interface RoundedDeleteButtonProps {
  handleOnDelete: () => void
}

const RoundedDeleteButton = ({ handleOnDelete }: RoundedDeleteButtonProps) => (
  <button
    onClick={handleOnDelete}
    className="absolute right-1 top-1 w-7 h-7 flex justify-center items-center"
  >
    <div className="rounded-full bg-black w-5 h-5 flex justify-center items-center">
      <IoClose className="text-white" />
    </div>
  </button>
)
export default RoundedDeleteButton
