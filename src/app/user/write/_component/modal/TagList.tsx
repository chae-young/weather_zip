import { IoClose } from 'react-icons/io5'
import WideButton from '@/app/_components/Button/WideButton'
import { Ttag } from '@/recoil/atom/imageTagsAtom'

interface TagListProps {
  tags: Ttag[]
  handleTagDelete: (id: string) => void
  handleImageUpload: () => void
}

const TagList = ({
  tags,
  handleTagDelete,
  handleImageUpload,
}: TagListProps) => {
  return (
    <div className="px-5">
      {tags.length > 0 ? (
        <>
          <ul className="mb-16">
            {tags.map((tag) => (
              <li
                key={tag.id}
                className="flex justify-between text-body3 py-2 mt-2 first:mt-6"
              >
                {tag.name}
                <button onClick={() => handleTagDelete(tag.id)}>
                  <span className="sr-only">삭제</span>
                  <IoClose className="text-xl text-bk" />
                </button>
              </li>
            ))}
          </ul>
          <WideButton
            content="등록하기"
            type="button"
            onClick={handleImageUpload}
          />
        </>
      ) : (
        <p className="text-gray-400 text-center mt-8 font-light">
          태그를 등록하려면 사진을 터치하세요.
        </p>
      )}
    </div>
  )
}

export default TagList
