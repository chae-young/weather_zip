import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import ToastProvider from './providers/ToastProvider'
import RecoilRootProvider from './providers/recoilRootProvider'

const customFont = localFont({
  src: [
    {
      path: './fonts/gmarketsanslight.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/gmarketsansmedium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/gmarketsansbold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--custom-font',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '날씨.zip',
  description: '날씨정보와 코디기록, 코디공유를 한번에',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${customFont.variable}`}>
        <RecoilRootProvider>
          <ToastProvider>
            <div className="max-w-[var(--container)] m-auto h-screen">
              {children}
            </div>
          </ToastProvider>
        </RecoilRootProvider>
      </body>
    </html>
  )
}
