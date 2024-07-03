import axios from 'axios'

// * baseURL과 헤더 동적으로..
export const axiosInstance = axios.create({})

axiosInstance.interceptors.request.use(
  (config) => {
    const newConfig = { ...config }
    // url에 kakao가 있으면 카카오 헤더를 보내는 걸로.
    if (newConfig.url?.includes('kakao')) {
      newConfig.headers[
        'Authorization'
      ] = `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_APIKEY}`
    }
    return newConfig
  },
  (error) => {
    return Promise.reject(error)
  },
)
