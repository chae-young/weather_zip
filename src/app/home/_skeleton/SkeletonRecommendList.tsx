import React from 'react'

const SkeletonRecommendList = () => (
  <div className="animate-pulse">
    <h3 className="bg-gray-200 w-60 h-5 rounded-2xl mb-4">{}</h3>
    <div className="flex overflow-x-auto space-x-8 mb-6">
      <div className="flex shrink-0 [&>*:last-child]:mr-0 min-w">
        <div className="bg-gray-200 w-36 h-48 rounded-2xl mr-2"></div>
        <div className="bg-gray-200 w-36 h-48 rounded-2xl mr-2"></div>
        <div className="bg-gray-200 w-36 h-48 rounded-2xl mr-2"></div>
        <div className="bg-gray-200 w-36 h-48 rounded-2xl mr-2"></div>
      </div>
    </div>
  </div>
)

export default SkeletonRecommendList
