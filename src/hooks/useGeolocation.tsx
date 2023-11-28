import { useEffect, useState } from 'react'

interface LocationType {
  loaded: boolean
  coordinates: { lat: number; lng: number }
  error?: { code: number; message: string }
}

const useGeolocation = () => {
  const [location, setLocation] = useState<LocationType>({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  })

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
      error,
    })
  }

  const options = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: Infinity,
  }

  useEffect(() => {
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
