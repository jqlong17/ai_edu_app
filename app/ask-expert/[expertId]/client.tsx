"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Maximize2 } from "lucide-react"
import Image from 'next/image'

// 检查用户是否登录的函数
const checkIsLoggedIn = () => {
  // 在客户端检查localStorage中是否有登录状态
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isLoggedIn') === 'true'
  }
  return false
}

export default function ExpertDetailClient({ params }: { params: { expertId: string } }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // 模拟专家数据
  const expert = {
    id: params.expertId,
    name: "章建跃",
    title: "著名数学教育专家，教育部基础教育课程教材专家工作委员会委员，国家级教学成果奖获得者",
    description: "著名数学教育专家，教育部基础教育课程教材专家工作委员会委员，国家级教学成果奖获得者",
    specialties: ["教学设计", "试题解析"],
    avatar: "/images/expert1.png",
  }
  
  useEffect(() => {
    // 检查用户是否已登录
    const loggedIn = checkIsLoggedIn()
    setIsLoggedIn(loggedIn)
    setIsLoading(false)
  }, [])
  
  const handleStartChat = () => {
    // 如果用户已登录，直接跳转到聊天页面
    if (isLoggedIn) {
      router.push(`/ask-expert/${params.expertId}/chat`)
    } else {
      // 否则跳转到登录页面，并设置重定向URL
      router.push('/login?redirect=' + encodeURIComponent(`/ask-expert/${params.expertId}/chat`))
    }
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fa]">
      {/* 返回按钮 */}
      <div className="p-5">
        <Link href="/ask-expert" className="text-[#666]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
      
      {/* 专家卡片 */}
      <div className="mx-5 bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
        <div className="relative">
          <div className="w-full aspect-square bg-gray-200 relative">
            {expert.avatar ? (
              <Image 
                src={expert.avatar} 
                alt={expert.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-blue-100">
                <span className="text-blue-600 text-4xl font-bold">{expert.name.charAt(0)}</span>
              </div>
            )}
            <div className="absolute top-3 right-3 p-1 bg-white/80 rounded-full">
              <Maximize2 className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>
        
        <div className="p-5 text-center">
          <h2 className="text-xl font-medium mb-2">{expert.name}</h2>
          <p className="text-sm text-gray-600 mb-6 px-4 leading-relaxed">{expert.title}</p>
          
          <div className="flex space-x-4 px-4">
            <button 
              onClick={handleStartChat}
              className="flex-1 flex items-center justify-center py-3 bg-white border border-gray-200 text-[#333] rounded-lg shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M15.8333 10.8333C15.8333 14.5152 12.8486 17.5 9.16667 17.5C5.48477 17.5 2.5 14.5152 2.5 10.8333C2.5 7.15143 5.48477 4.16666 9.16667 4.16666C12.8486 4.16666 15.8333 7.15143 15.8333 10.8333Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13.3333 2.5L17.5 6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M17.5 2.5L13.3333 6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              语音对话
            </button>
            <button 
              onClick={handleStartChat}
              className="flex-1 flex items-center justify-center py-3 bg-white border border-gray-200 text-[#333] rounded-lg shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <rect x="2.5" y="5" width="15" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6.25 10H13.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M10 6.25V13.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              文字输入
            </button>
          </div>
        </div>
      </div>
      
      {/* 底部导航栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#eee] flex justify-around py-2">
        <Link href="/" className="flex flex-col items-center pt-1.5 pb-1 px-4 text-[#999]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 10V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M3 10L12 3L21 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs mt-0.5">AI应用</span>
        </Link>
        <Link href="/ask-expert" className="flex flex-col items-center pt-1.5 pb-1 px-4 text-[#4080ff]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9 9C9 7.89543 9.89543 7 11 7H13C14.1046 7 15 7.89543 15 9C15 10.1046 14.1046 11 13 11H11V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="12" cy="17" r="1" fill="currentColor"/>
          </svg>
          <span className="text-xs mt-0.5">问专家</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center pt-1.5 pb-1 px-4 text-[#999]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M20 19C20 16.7909 16.4183 15 12 15C7.58172 15 4 16.7909 4 19V20H20V19Z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span className="text-xs mt-0.5">我的</span>
        </Link>
      </div>
    </div>
  )
} 