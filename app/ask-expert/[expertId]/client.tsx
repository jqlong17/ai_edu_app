"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Maximize2, Bot } from "lucide-react"
import Image from 'next/image'

// 专家数据
const expertsData = {
  "1": {
    id: "1",
    name: "章老师",
    title: "数学教育专家",
    description: "从事数学教育20年，专注于数学思维培养和解题方法创新，善于化繁为简",
    specialties: ["数学思维", "解题技巧", "教学设计"],
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=math",
  },
  "2": {
    id: "2",
    name: "朱老师",
    title: "德育专家",
    description: "致力于学生品德教育和心理健康指导，擅长处理学生成长过程中的各类问题",
    specialties: ["品德教育", "心理辅导", "班级管理"],
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=moral",
  },
  "3": {
    id: "3",
    name: "韩老师",
    title: "英语教育专家",
    description: "具有丰富的英语教学经验，专注于英语学习方法研究和跨文化交际能力培养",
    specialties: ["英语教学", "口语训练", "考试辅导"],
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=english",
  },
  "4": {
    id: "4",
    name: "李老师",
    title: "物理教育专家",
    description: "物理教育专家，擅长物理实验设计和科学思维培养，让物理学习更加生动有趣",
    specialties: ["物理实验", "概念讲解", "题目分析"],
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=physics",
  }
}

// 检查用户是否登录的函数
const checkIsLoggedIn = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isLoggedIn') === 'true'
  }
  return false
}

// 获取背景色
function getAvatarBgColor(expertId: string) {
  const colors = [
    "bg-blue-50 text-blue-500", // 蓝色
    "bg-purple-50 text-purple-500", // 紫色
    "bg-green-50 text-green-500", // 绿色
    "bg-orange-50 text-orange-500", // 橙色
  ];
  
  const colorIndex = parseInt(expertId) % colors.length;
  return colors[colorIndex];
}

export default function ExpertDetailClient({ params }: { params: { expertId: string } }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // 获取当前专家数据
  const expert = expertsData[params.expertId as keyof typeof expertsData]
  const bgColorClass = getAvatarBgColor(params.expertId)
  
  useEffect(() => {
    const loggedIn = checkIsLoggedIn()
    setIsLoggedIn(loggedIn)
    setIsLoading(false)
  }, [])
  
  const handleStartChat = () => {
    if (isLoggedIn) {
      router.push(`/ask-expert/${params.expertId}/chat`)
    } else {
      router.push('/login?redirect=' + encodeURIComponent(`/ask-expert/${params.expertId}/chat`))
    }
  }
  
  if (isLoading || !expert) {
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
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* 返回按钮 */}
      <div className="sticky top-0 bg-white p-4 border-b">
        <Link href="/ask-expert" className="text-gray-600">
          <ArrowLeft className="h-6 w-6" />
        </Link>
      </div>
      
      {/* 专家信息 */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* 头像 */}
        <div className={`w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden ${bgColorClass} flex items-center justify-center`}>
          <Bot className="h-12 w-12" />
        </div>
        
        {/* 专家信息 */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{expert.name}</h2>
          <p className="text-gray-600 mb-4">{expert.title}</p>
          <p className="text-gray-600 leading-relaxed">{expert.description}</p>
        </div>
        
        {/* 专长标签 */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {expert.specialties.map((specialty, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
            >
              {specialty}
            </span>
          ))}
        </div>
        
        {/* 开始对话按钮 */}
        <button 
          onClick={handleStartChat}
          className="w-full max-w-xs mx-auto py-3 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          开始对话
        </button>
      </div>
      
      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-lg mx-auto flex justify-around py-2">
          <Link href="/" className="flex flex-col items-center pt-1.5 pb-1 px-4 text-gray-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 10V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3 10L12 3L21 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs mt-1">AI应用</span>
          </Link>
          <Link href="/ask-expert" className="flex flex-col items-center pt-1.5 pb-1 px-4 text-blue-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9 9C9 7.89543 9.89543 7 11 7H13C14.1046 7 15 7.89543 15 9C15 10.1046 14.1046 11 13 11H11V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="17" r="1" fill="currentColor"/>
            </svg>
            <span className="text-xs mt-1">问专家</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center pt-1.5 pb-1 px-4 text-gray-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M20 19C20 16.7909 16.4183 15 12 15C7.58172 15 4 16.7909 4 19V20H20V19Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span className="text-xs mt-1">我的</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 