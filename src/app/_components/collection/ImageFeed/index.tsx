import Image from 'next/image'

interface ImageFeedProps {
  fullbody_image: string
  desc: string
  each_image: string[]
}

const ImageFeed = ({ fullbody_image, desc, each_image }: ImageFeedProps) => {
  return (
    <>
      <div className="overflow-hidden w-full min-h-[360px] rounded-2xl relative">
        {fullbody_image && (
          <Image
            src={fullbody_image}
            alt={desc}
            fill
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            className="rounded-2xl object-cover"
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        )}
      </div>
      <div className="flex overflow-x-auto space-x-8 mb-6 mt-5">
        <div className="flex shrink-0 gap-1">
          {each_image &&
            each_image.map((url: string, idx: number) => (
              <div
                key={idx}
                className="w-[140px] h-[140px] overflow-hidden rounded-2xl relative"
              >
                <Image
                  src={url}
                  alt={desc}
                  fill
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                  className="object-cover"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default ImageFeed
