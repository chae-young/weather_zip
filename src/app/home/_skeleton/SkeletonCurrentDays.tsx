import React from 'react'

const SkeletonCurrentDays = () => (
  <div className="animate-pulse flex my-5 gap-1">
    <div className="bg-gray-200 rounded-full w-24 h-24">{}</div>
    <div className="bg-gray-200 rounded-full w-24 h-24">{}</div>
    <div className="bg-gray-200 rounded-full w-24 h-24">{}</div>
    <div className="bg-gray-200 rounded-full w-24 h-24">{}</div>
  </div>
)

export default SkeletonCurrentDays
