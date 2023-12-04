import { Tcollection } from '@/app/(share)/weatherLogs/fetchWeatherLogs'
import Image from 'next/image'
import Link from 'next/link'

interface CollectionItemProps {
  collections: Tcollection[]
}
const CollectionItem = ({ collections }: CollectionItemProps) => {
  return (
    <>
      {collections.map((collection) => (
        <li className="w-[49.82%] h-44" key={collection.id}>
          <Link
            href={`/user/recordDetail/${collection.id}`}
            className="block relative h-full"
          >
            {collection.fullbody_image && (
              <Image
                src={collection.fullbody_image}
                fill
                className="object-cover"
                sizes="(min-width: 640px) 50vw, 100vw"
                alt={collection.weather.desc}
              />
            )}
          </Link>
        </li>
      ))}
    </>
  )
}

export default CollectionItem
