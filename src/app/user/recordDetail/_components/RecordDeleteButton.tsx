'use client'

import { deleteDoc, doc } from 'firebase/firestore'
import { TbTrash } from 'react-icons/tb'
import { db } from '../../../../../firebase/firebasedb'
import { useRouter } from 'next/navigation'
import useToast from '@/hooks/useToast'

interface RecordDeleteButtonProps {
  id: string
}

const RecordDeleteButton = ({ id }: RecordDeleteButtonProps) => {
  const router = useRouter()
  const { toastSuccess } = useToast()
  const handleDelete = async () => {
    await deleteDoc(doc(db, 'collection', id))
    toastSuccess('삭제가 완료되었습니다.')
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
