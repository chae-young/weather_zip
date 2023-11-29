import { Timestamp } from 'firebase/firestore'
import { Tcollection } from '@/app/(share)/weatherLogs/fetchWeatherLogs'

export const newLastDoc = (originalLastDoc: Tcollection) => {
  return {
    ...originalLastDoc,
    timestamp: {
      seconds: originalLastDoc?.timestamp.seconds,
      nanoseconds: originalLastDoc?.timestamp.nanoseconds,
    },
  }
}

export const lastDocTimestamp = (lastDoc: Tcollection) => {
  return Timestamp.fromMillis(
    lastDoc.timestamp.seconds * 1000 +
      Math.round(lastDoc.timestamp.nanoseconds / 1e6),
  )
}

const format = (num: number) => (num < 10 ? '0' + num : num.toString())

export const toDateTime = (secs: number) => {
  const t = new Date(1970, 0, 1)
  t.setSeconds(secs)
  const year = t.getFullYear()
  const month = t.getMonth() + 1
  const day = t.getDate()
  return `${year}-${format(month)}-${format(day)}`
}
