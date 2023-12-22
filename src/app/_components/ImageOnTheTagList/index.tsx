import { Ttag } from '@/recoil/atom/imageTagsAtom'

interface ImageOnTherTagListProps {
  move?: boolean
  tags: Ttag[] | []
  handleClickTag?: (e: React.MouseEvent) => void
  handleTouchStart?: (e: React.TouchEvent<HTMLButtonElement>) => void
  handleTouchMove?: ({
    x,
    y,
  }: {
    x: string
    y: string
  }) => (e: React.TouchEvent<HTMLButtonElement>) => void
  handleTouchEnd?: (e: React.TouchEvent<HTMLButtonElement>) => void
  handleMouseMove?: (
    e: React.DragEvent<HTMLButtonElement>,
    coords: {
      x: string
      y: string
    },
  ) => void
  handleMouseUp?: (e: React.DragEvent<HTMLButtonElement>) => void
  handleMouseDown?: (e: React.DragEvent<HTMLButtonElement>) => void
}

const ImageOnTherTagList = ({
  move,
  tags,
  handleClickTag,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleMouseMove,
  handleMouseDown,
  handleMouseUp,
}: ImageOnTherTagListProps) => {
  return (
    <ul>
      {tags &&
        tags.map((tag) =>
          move ? (
            <li key={tag.id}>
              <button
                id={tag.id}
                onClick={handleClickTag}
                draggable
                onDragStart={handleMouseDown}
                onDragOver={(e) =>
                  handleMouseMove && handleMouseMove(e, { x: tag.x, y: tag.y })
                }
                //onDragOver={handleMouseUp}
                onDragEnd={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={(e: React.TouchEvent<HTMLButtonElement>) =>
                  handleTouchMove && handleTouchMove({ x: tag.x, y: tag.y })(e)
                }
                onTouchEnd={handleTouchEnd}
                style={{
                  left: tag.x,
                  top: tag.y,
                }}
                className={`tag-button bg-pointColor absolute z-10 text-body3 py-1 px-2 rounded-lg -translate-x-1/2 -translate-y-1/2`}
              >
                {tag.name}
              </button>
            </li>
          ) : (
            <span
              key={tag.id}
              style={{
                left: tag.x,
                top: tag.y,
              }}
              className={`tag-button bg-pointColor absolute z-10 text-body3 py-1 px-2 rounded-lg -translate-x-1/2 -translate-y-1/2`}
            >
              {tag.name}
            </span>
          ),
        )}
    </ul>
  )
}

export default ImageOnTherTagList
