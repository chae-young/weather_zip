import React from 'react'

const SkeletonInfoWeather = () => (
  <section className="animate-pulse px-5 pt-7 py-10">
    <div className="bg-gray-200 h-4 w-14 rounded-2xl">{}</div>
    <div className="bg-gray-200 h-12 w-40 rounded-2xl mt-3">{}</div>
    <p className="bg-gray-200 h-3 w-40 rounded-2xl mt-3">{}</p>
    <p className="bg-gray-200 h-3 w-40 rounded-2xl mt-2">{}</p>
  </section>
)

export default SkeletonInfoWeather
