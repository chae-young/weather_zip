import useIntersection from '@/hooks/useIntersection'
import { useEffect, useRef } from 'react'
import Spin from './Spin'

interface InfiniteScrollProps {
  fetchMoreData: () => void
}

const InfiniteScroll = ({ fetchMoreData }: InfiniteScrollProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isIntersecting = useIntersection(ref, { threshold: 0.5 })

  useEffect(() => {
    if (isIntersecting) fetchMoreData()
  }, [isIntersecting])

  return (
    <div ref={ref} className="text-center">
      <Spin />
    </div>
  )
}

export default InfiniteScroll
