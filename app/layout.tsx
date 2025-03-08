import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./home-styles.css";
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '云小睿 - 智能教学助手',
  description: '远择专业的教学人助手，开启智能教学之旅',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
