export interface IcurrentWeather {
  address: string
  temp: number
  temp_max: number
  temp_min: number
  icon: string
  desc: string
}

export interface ICurrentDayItem {
  clouds: { all: number }
  dt: number
  dt_txt: string
  main: {
    feels_like: number
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_kf: number
    temp_max: number
    temp_min: number
  }
  pop: number
  sys: { pod: string }
  visibility: number
  weather: [{ id: number; main: string; description: string; icon: string }]
  wind: { speed: number; deg: number; gust: number }
}

export interface ICurrentDays {
  city: unknown
  list: ICurrentDayItem[]
}

export interface ICurrentAddr {
  documents: [
    {
      address: {
        address_name: string
        region_1depth_name: string
        region_2depth_name: string
        region_3depth_name: string
        mountain_yn: string
        main_address_no: string
        sub_address_no: string
        zip_code: string
      }
    },
  ]
  meta: { total_count: 1 }
}
