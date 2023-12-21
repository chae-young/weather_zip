import Spin from '@/app/_components/common/Spin'
import React from 'react'

const loading = () => {
  return (
    <div className="text-center">
      <Spin />
    </div>
  )
}

export default loading
