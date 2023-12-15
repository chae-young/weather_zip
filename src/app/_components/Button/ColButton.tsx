'use client'

interface ColButtonProps {
  handelOnCancel: () => void
  handeOnSubmit: () => void
}

const ColButton = ({ handelOnCancel, handeOnSubmit }: ColButtonProps) => {
  return (
    <div className="flex gap-[10px] mt-10">
      <button
        className="flex-1 h-[50px] rounded-xl border border-gray4"
        onClick={handelOnCancel}
      >
        취소
      </button>
      <button
        className="flex-1 h-[50px] rounded-xl bg-pointColor"
        onClick={handeOnSubmit}
      >
        등록
      </button>
    </div>
  )
}

export default ColButton
