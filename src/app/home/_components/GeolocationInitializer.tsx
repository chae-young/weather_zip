'use client'

import coordinatedAtom from '@/recoil/atom/coordinatedAtom'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

const GeolocationInitializer = () => {
  const setCoordinates = useSetRecoilState(coordinatedAtom)

  useEffect(() => {
    // geolocation을 지원하지 않는경우
    if (!('geolocation' in navigator)) {
      setCoordinates({
        loaded: true,
        lat: 0,
        lng: 0,
        error: { code: 0, message: 'Geolocation not supported' },
      })
      return
    }

    const onSuccess = (position: {
      coords: { latitude: number; longitude: number }
    }) => {
      console.log('성공')
      setCoordinates({
        loaded: true,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        error: null,
      })
    }

    const onError = (error: { code: number; message: string }) => {
      setCoordinates({
        loaded: true,
        lat: 0,
        lng: 0,
        error: {
          code: 0,
          message: 'OS나 현재 브라우저의 현재위치 설정을 허용해주세요.',
        },
      })
    }

    const options = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: Infinity,
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options)
  }, [setCoordinates])

  return null
}

export default GeolocationInitializer
