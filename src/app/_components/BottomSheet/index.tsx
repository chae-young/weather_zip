interface BottomSheetProps {
  children: React.ReactNode
}

const BottomSheet = ({ children }: BottomSheetProps) => {
  return (
    <div className="before:fixed before:top-0 before:left-0 before:bg-black before:content-[''] before:w-full before:h-full before:z-[55] before:opacity-30">
      <div className="fixed bottom-0 left-0 right-0 m-auto max-w-[var(--container)] bg-white z-[56] rounded-t-2xl py-8 px-5">
        {children}
      </div>
    </div>
  )
}

export default BottomSheet
