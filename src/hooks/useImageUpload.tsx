import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useState } from 'react'
import { storage } from '../../firebase/firebasedb'

interface ImageUploadProps {
  type?: 'single' | 'multi'
}

const useImageUpload = ({ type }: ImageUploadProps) => {
  const [imageURL, setImageURL] = useState('')
  const [imageList, setImageList] = useState<string[]>([])
  const [uploadIng, setUploadIng] = useState(false)

  const handelImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files
    if (!(imageList.length < 5)) return alert('5개이하만 업로드 가능합니다.')
    if (!file) return null

    const storageRef = ref(storage, `files/${file[0].name}`)
    const uploadTask = uploadBytesResumable(storageRef, file[0])

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        //console.log('업로드중')
        setUploadIng(true)
      },
      (error) => {
        switch (error.code) {
          case 'storage/canceled':
            alert('업로드가 취소됐습니다.')
            break
          default:
            console.error('Unhandled storage error:', error.code)
        }
      },
      () => {
        e.target.value = ''
        getDownloadURL(storageRef).then((downloadURL) => {
          //console.log('file', downloadURL)
          setUploadIng(false)
          if (type === 'multi') setImageList((prev) => [downloadURL, ...prev])
          setImageURL(downloadURL)
        })
      },
    )

    return null
  }

  return {
    imageURL,
    setImageURL,
    imageList,
    setImageList,
    uploadIng,
    handelImageUpload,
  }
}

export default useImageUpload
