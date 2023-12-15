import React, { RefObject, useEffect, useState } from 'react'

const useResponsiveImageSize = (ref: RefObject<HTMLDivElement>) => {
  const [imageSize, setImageSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    if (ref.current)
      setImageSize({
        w: ref.current.offsetWidth,
        h: ref.current.offsetHeight,
      })

    const getSize = () => {
      if (ref.current)
        setImageSize({
          w: ref.current.offsetWidth,
          h: ref.current.offsetHeight,
        })
    }
    window.addEventListener('resize', getSize)
    return () => window.removeEventListener('resize', getSize)
  }, [ref.current])

  return {
    imageSize,
    setImageSize,
  }
}

export default useResponsiveImageSize
