import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url: string) => {
  return axios
    .get(url, {
      headers: {
        Authorization: `KakaoAK 19e7dc296f4d66268250f4b38f174e05`,
      },
    })
    .then((res) => {
      const result = res.data.documents[0].address
      const data = `${result.region_1depth_name} ${result.region_2depth_name} ${result.region_3depth_name}`
      return data
    })
}

const useGetAddress = (lat: number, lng: number) => {
  const { data: currentAddress } = useSWR(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`,
    fetcher,
  )

  return {
    currentAddress,
  }
}

export default useGetAddress
