import useIntersection from '@/hooks/useIntersection'
import React, { useEffect, useRef } from 'react'

interface InfiniteScrollProps {
  fetchMoreData: () => void
}

const InfiniteScroll = ({ fetchMoreData }: InfiniteScrollProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isIntersecting = useIntersection(ref, { threshold: 0.5 })

  useEffect(() => {
    if (isIntersecting) fetchMoreData()
  }, [isIntersecting])

  return <div ref={ref} className="h-5 w-4 bg-black"></div>
}

export default InfiniteScroll
