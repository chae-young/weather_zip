'use client'

import { useRouter } from 'next/navigation'
import TabList from './TabList'
import { useState } from 'react'

const temps = [
  {
    temp_min: -30,
    temp_max: 0,
  },
  {
    temp_min: 0,
    temp_max: 5,
  },
  {
    temp_min: 5,
    temp_max: 10,
  },
  {
    temp_min: 10,
    temp_max: 15,
  },
  {
    temp_min: 15,
    temp_max: 20,
  },
  {
    temp_min: 20,
    temp_max: 25,
  },
  {
    temp_min: 25,
    temp_max: 30,
  },
  {
    temp_min: 30,
    temp_max: 60,
  },
]

const Tab = () => {
  const router = useRouter()
  const [isActive, setIsActive] = useState<null | number>(null)

  const handleOnClickFiltered = (query: string, idx: number) => {
    router.push(`collection?${query}`)
    setIsActive(idx)
  }

  return (
    <div className="flex overflow-x-auto space-x-8 px-4 py-4">
      <ul className="flex shrink-0 gap-2">
        {temps.map((temp, idx) => {
          if (idx === 0) {
            return (
              <TabList
                idx={idx}
                key={idx}
                isActive={isActive}
                content={`${temp.temp_max}도 이하`}
                onClick={() =>
                  handleOnClickFiltered(
                    `temp_min=${temp.temp_min}&temp_max=${temp.temp_max}`,
                    idx,
                  )
                }
              />
            )
          }
          if (idx === temps.length - 1) {
            return (
              <TabList
                idx={idx}
                key={idx}
                isActive={isActive}
                content={`${temp.temp_min}도 이상`}
                onClick={() =>
                  handleOnClickFiltered(
                    `temp_min=${temp.temp_min}&temp_max=${temp.temp_max}`,
                    idx,
                  )
                }
              />
            )
          }
          return (
            <TabList
              idx={idx}
              key={idx}
              isActive={isActive}
              content={`${temp.temp_min}도 ~ ${temp.temp_max}이하`}
              onClick={() =>
                handleOnClickFiltered(
                  `temp_min=${temp.temp_min}&temp_max=${temp.temp_max}`,
                  idx,
                )
              }
            />
          )
        })}
      </ul>
    </div>
  )
}

export default Tab
