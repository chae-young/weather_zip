import React from 'react'
import { HiLocationMarker } from 'react-icons/hi'
import { MdPlayArrow } from 'react-icons/md'

const SkeletonWeather = () => {
  return (
    <>
      <div
        role="status"
        className="max-w-sm animate-pulse pt-10 flex flex-col items-center"
      >
        <div className="flex">
          <HiLocationMarker className="text-body5 mr-1" />
          <div className="h-2.5 bg-gray-200 rounded-full w-20 mb-4">{}</div>
        </div>
        <div className="bg-gray-200 rounded-full w-36 h-40">{}</div>
        <div className="text-center mt-4 flex flex-col items-center">
          <div className="h-2 bg-gray-200 rounded-full w-10"> </div>
          <div className="text-body4 flex justify-center items-center mt-3">
            <MdPlayArrow className="-rotate-90 text-[#ff5c5c] w-7" />
            최고온도{' '}
            <div className="ml-2 h-2 bg-gray-200 rounded-full w-9"> </div>
          </div>
          <div className="text-body4 flex justify-center items-center">
            <MdPlayArrow className="rotate-90 text-[#67b9fd] w-7" />
            최저온도{' '}
            <div className="ml-2 h-2 bg-gray-200 rounded-full w-9"> </div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
      <div className="animate-pulse flex my-5 gap-1">
        <div className="bg-gray-200 rounded-full w-24 h-24">{}</div>
        <div className="bg-gray-200 rounded-full w-24 h-24">{}</div>
        <div className="bg-gray-200 rounded-full w-24 h-24">{}</div>
        <div className="bg-gray-200 rounded-full w-24 h-24">{}</div>
      </div>
    </>
  )
}

export default SkeletonWeather
