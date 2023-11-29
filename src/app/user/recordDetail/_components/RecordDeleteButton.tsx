'use client'

import { deleteDoc, doc } from 'firebase/firestore'
import { TbTrash } from 'react-icons/tb'
import { db } from '../../../../../firebase/firebasedb'
import { useRouter } from 'next/navigation'

interface RecordDeleteButtonProps {
  id: string
}

const RecordDeleteButton = ({ id }: RecordDeleteButtonProps) => {
  const router = useRouter()
  const handleDelete = async () => {
    await deleteDoc(doc(db, 'collection', id))
    router.back()
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="flex text-body4 items-center text-[#787878]"
    >
      <TbTrash className="text-base self-baseline" />
      삭제하기
    </button>
  )
}

export default RecordDeleteButton
