import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../firebase/firebasedb'

import { NextRequest, NextResponse } from 'next/server'
import { adminInitApp } from '../../../../firebase/firebase-admin-config'

adminInitApp()

export interface IrecommendObject {
  title: string
  bottom: string
  top: string
  list: string[]
  temp_max: number
  temp_min: number
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const temp = Number(params.get('temp'))

  if (!temp)
    return NextResponse.json(
      {
        error: 'temp is required',
      },
      {
        status: 400,
      },
    )

  try {
    const q = query(collection(db, 'recommend'), where('temp_max', '>=', temp))
    const querySnapshot = await getDocs(q)
    const res: IrecommendObject[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data() as IrecommendObject

      if (data.temp_min <= temp) {
        res.push(data)
      }
    })
    return NextResponse.json(res[0])
  } catch (error) {
    return NextResponse.json(
      { error: 'Faild to fetch' },
      {
        status: 500,
      },
    )
  }
}
