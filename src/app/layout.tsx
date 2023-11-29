import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import RecoilRootProvider from './recoilRootProvider'

const customFont = localFont({
  src: [
    {
      path: './fonts/GmarketSansLight.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/GmarketSansMedium.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/GmarketSansBold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--custom-font',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '날씨.zip',
  description: '...준비중',
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
          <div className="max-w-[var(--container)] m-auto h-screen">
            {children}
          </div>
        </RecoilRootProvider>
      </body>
    </html>
  )
}
