"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { AppLayout } from "@/components/layout"
import { useRouter } from "next/navigation"

// 模拟用户数据
const user = {
  name: "张老师",
  role: "七年级 数学老师"
}

// 模拟历史对话数据
const historyChats = [
  {
    title: "如何申请二次函数",
    date: "2024-03-20",
    time: "08:49:17",
    href: "/ask-expert/chat/1",
    category: "数学专家"
  },
  {
    title: "平行线的判定方法",
    date: "2024-03-20",
    time: "08:47:32",
    href: "/ask-expert/chat/2",
    category: "数学专家"
  }
]

export default function Profile() {
  const router = useRouter()
  
  const handleLogout = () => {
    // 这里应该添加实际的登出逻辑，如清除token等
    // 然后跳转到登录页面
    router.push('/login')
  }
  
  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen bg-[#f5f7fa]">
        {/* 返回按钮 - 仅在移动端显示 */}
        <div className="p-5 md:hidden">
          <Link href="/" className="text-[#666]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        
        {/* 页面标题 - 仅在桌面端显示 */}
        <div className="hidden md:block p-6 pb-4">
          <h1 className="text-2xl font-bold text-gray-800">个人资料</h1>
          <p className="text-sm text-gray-500 mt-1">管理您的个人信息和设置</p>
        </div>
        
        {/* 内容容器 */}
        <div className="md:px-6 md:pb-6 flex-1">
          {/* 用户信息卡片 */}
          <div className="mx-5 md:mx-0 bg-white rounded-xl shadow-sm mb-4 md:mb-6">
            <Link href="/profile/settings" className="flex items-center justify-between p-4 md:p-5">
              <div className="flex items-center">
                <div className="w-11 h-11 md:w-14 md:h-14 bg-[#e8f3ff] rounded-full flex items-center justify-center mr-3 md:mr-4 overflow-hidden">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" fill="#e8f3ff"/>
                    <path d="M20 20C23.3137 20 26 17.3137 26 14C26 10.6863 23.3137 8 20 8C16.6863 8 14 10.6863 14 14C14 17.3137 16.6863 20 20 20Z" fill="#4080FF"/>
                    <path d="M20 22C14.4772 22 10 26.4772 10 32H30C30 26.4772 25.5228 22 20 22Z" fill="#4080FF"/>
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-[15px] md:text-lg">{user.name}</div>
                  <div className="text-xs md:text-sm text-[#999]">{user.role}</div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-[#ccc]" />
            </Link>
          </div>
          
          {/* 基本信息 */}
          <div className="mx-5 md:mx-0 mb-4 md:mb-6">
            <h3 className="text-sm md:text-base font-medium text-[#666] mb-2 ml-1">基本信息</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <Link href="/profile/subjects" className="flex items-center justify-between p-4 md:p-5 border-b border-[#f5f5f5]">
                <div className="flex items-center">
                  <div className="w-5 h-5 md:w-6 md:h-6 mr-3 text-[#666]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="4" width="14" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M7 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M7 12H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="text-[15px] md:text-base">我的学科</span>
                </div>
                <ChevronRight className="h-5 w-5 text-[#ccc]" />
              </Link>
              
              <Link href="/profile/grades" className="flex items-center justify-between p-4 md:p-5">
                <div className="flex items-center">
                  <div className="w-5 h-5 md:w-6 md:h-6 mr-3 text-[#666]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 7L8 14L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="3" y="3" width="14" height="14" rx="7" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <span className="text-[15px] md:text-base">我的年级</span>
                </div>
                <ChevronRight className="h-5 w-5 text-[#ccc]" />
              </Link>
            </div>
          </div>
          
          {/* 历史对话 */}
          <div className="mx-5 md:mx-0 mb-4 md:mb-6">
            <h3 className="text-sm md:text-base font-medium text-[#666] mb-2 ml-1">历史对话</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {historyChats.map((chat, index) => (
                <Link 
                  key={index} 
                  href={chat.href} 
                  className={`flex items-center justify-between p-4 md:p-5 ${index < historyChats.length - 1 ? 'border-b border-[#f5f5f5]' : ''}`}
                >
                  <div className="flex-1">
                    <div className="font-medium text-[15px] md:text-base">{chat.title}</div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs md:text-sm text-[#4080ff] bg-[#e8f3ff] px-2 py-0.5 rounded-sm mr-2">{chat.category}</span>
                      <span className="text-xs md:text-sm text-[#999]">{chat.date} {chat.time}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#ccc]" />
                </Link>
              ))}
            </div>
          </div>
          
          {/* 退出登录按钮 */}
          <div className="mx-5 md:mx-0 mt-auto mb-24 md:mb-0 md:mt-4">
            <button 
              onClick={handleLogout}
              className="w-full bg-white text-[#4080ff] font-medium py-3.5 rounded-xl shadow-sm text-[15px] md:text-base md:max-w-xs md:mx-auto md:block"
            >
              退出登录
            </button>
          </div>
        </div>
        
        {/* 底部导航栏 - 仅在移动端显示，已由AppLayout组件提供 */}
      </div>
    </AppLayout>
  )
} 