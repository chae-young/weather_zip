import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Ttag } from '@/recoil/atom/imageTagsAtom'
const ImageOnTherTagList = dynamic(
  () => import('@/app/_components/ImageOnTheTagList'),
)

interface ImageFeedProps {
  tags: Ttag[] | []
  fullbody_image: string
  desc: string
  each_image: string[]
}

const ImageFeed = async ({
  tags,
  fullbody_image,
  desc,
  each_image,
}: ImageFeedProps) => {
  return (
    <>
      <div className="overflow-hidden w-full rounded-2xl relative">
        {fullbody_image && (
          <>
            <Image
              priority={true}
              src={fullbody_image}
              alt={desc}
              width={560}
              height={560}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              className="rounded-2xl w-full h-full"
            />
            <ImageOnTherTagList tags={tags} />
          </>
        )}
      </div>
      <div className="flex overflow-x-auto space-x-8 mb-6 mt-5">
        <div className="flex shrink-0 gap-1">
          {each_image &&
            each_image.map((url: string, idx: number) => (
              <div key={idx} className="overflow-hidden rounded-2xl relative">
                <Image
                  priority={true}
                  src={url}
                  alt={desc}
                  width={140}
                  height={140}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                  className="object-cover w-36 h-36"
                />
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default ImageFeed
