import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-full justify-center items-center flex flex-col bg-pointBg">
      <Image
        src="/images/404.svg"
        width={243}
        height={356}
        alt="404 잘못된 주소 입니다."
      />
      <h1 className="mt-4">잘못된 주소 에요.</h1>
      <div className="mt-6 rounded-lg bg-pointColor py-1 px-4">
        <Link href="/">홈으로</Link>
      </div>
    </div>
  )
}
