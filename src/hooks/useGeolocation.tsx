import { useEffect, useState } from 'react'

interface LocationType {
  loaded: boolean
  coordinates: { lat: number; lng: number }
  error?: { code: number; message: string } | null
}

const useGeolocation = () => {
  const [location, setLocation] = useState<LocationType>({
    loaded: false,
    error: null,
    coordinates: { lat: 0, lng: 0 },
  })

  // 성공했을 경우
  const onSuccess = (position: {
    coords: { latitude: number; longitude: number }
  }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    })
  }

  const onError = (error: { code: number; message: string }) => {
    setLocation({
      loaded: true,
      coordinates: { lat: 0, lng: 0 },
      error: {
        code: 1,
        message: 'GPS를 허용해주세요.',
      },
    })
  }

  const options = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: Infinity,
  }

  useEffect(() => {
    // geolocation을 지원하지 않는경우
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      })
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options)
  }, [])

  return location
}

export default useGeolocation
