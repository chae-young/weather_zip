'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Tcollection } from '@/app/(share)/weatherLogs/fetchWeatherLogs'

interface CollectionListProps {
  collections: Tcollection[]
}

const CollectionList = ({ collections }: CollectionListProps) => {
  return collections.map((collection) => (
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
  ))
}

export default CollectionList
