import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../../../../firebase/firebasedb'
import { auth } from 'firebase-admin'

import { NextRequest, NextResponse } from 'next/server'
import { adminInitApp } from '../../../../firebase/firebase-admin-config'
import { cookies } from 'next/headers'

adminInitApp()

export interface ItempClothing {
  id: string
  fullbody_image: string
  userId: string
}
export async function GET(request: NextRequest) {
  const session = cookies().get('session')?.value || ''
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const decodedClaims = await auth().verifySessionCookie(session, true)
  if (!decodedClaims) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const temp = Number(searchParams.get('temp'))
  const uid = decodedClaims.uid

  const tempMax = temp + 5
  const tempMin = temp - 5

  try {
    const q = query(
      collection(db, 'collection'),
      where('userId', '==', uid),
      where('weather.temp', '>=', tempMin),
      where('weather.temp', '<=', tempMax),
      orderBy('weather.temp'),
      orderBy('timestamp', 'desc'),
      limit(10),
    )
    const querySnapshot = await getDocs(q)
    const data: ItempClothing[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      fullbody_image: doc.data().fullbody_image,
      userId: doc.data().userId,
    }))

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Faild to fetch' },
      {
        status: 500,
      },
    )
  }
}
