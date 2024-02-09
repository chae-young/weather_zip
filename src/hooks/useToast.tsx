import { toast } from 'react-toastify'

const useToast = () => {
  const toastSuccess = (msg: string) => {
    toast.success(msg)
  }
  const toastError = (msg: string) => {
    toast.error(msg)
  }
  const toastPromise = (
    action: any,
    pendingMsg: string,
    successMsg: string,
  ) => {
    toast.promise(
      action,
      {
        pending: pendingMsg,
        success: successMsg,
        error: '에러가 발생했습니다. 잠시후 다시 시도해주세요',
      },
      { autoClose: 1000 },
    )
  }

  return { toastSuccess, toastPromise, toastError }
}

export default useToast
