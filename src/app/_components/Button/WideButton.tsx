'use client'

import { useRouter } from 'next/navigation'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../../../firebase/firebasedb'

interface WideButtonProps {
  type: 'submit' | 'button' | 'reset'
  onClick?: () => void
  content: string
  status?: string
  data?: object
}

const WideButton = ({
  type,
  onClick,
  content,
  status,
  data,
}: WideButtonProps) => {
  const router = useRouter()

  const handleOnClick = async () => {
    switch (status) {
      case 'upload':
        const newData = {
          ...data,
          timestamp: serverTimestamp(),
        }
        try {
          const docRdf = await addDoc(collection(db, 'weatherlog'), {
            ...newData,
          })
          router.push('/weatherLogs')
          router.refresh()
          //revalidatePath('/')
        } catch (err) {
          console.error(err)
        }

      default:
        console.log('')
    }
  }

  return (
    <button
      type={type ? 'submit' : 'button'}
      onClick={onClick ?? handleOnClick}
      className="bg-pointColor text-body2 rounded-xl flex justify-center items-center w-full h-[50px] m-auto"
    >
      {content}
    </button>
  )
}
export default WideButton
