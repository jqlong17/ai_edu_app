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
    <div className="flex flex-col h-full bg-[#f0f3f8]">
      {/* 返回按钮 */}
      <div className="p-5">
        <Link href="/" className="text-[#666]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
      
      {/* 用户信息卡片 */}
      <div className="mx-5 bg-white rounded-xl shadow-sm mb-4">
        <Link href="/profile/settings" className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <div className="w-11 h-11 bg-[#e8f3ff] rounded-full flex items-center justify-center mr-3 overflow-hidden">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" fill="#e8f3ff"/>
                <path d="M20 20C23.3137 20 26 17.3137 26 14C26 10.6863 23.3137 8 20 8C16.6863 8 14 10.6863 14 14C14 17.3137 16.6863 20 20 20Z" fill="#4080FF"/>
                <path d="M20 22C14.4772 22 10 26.4772 10 32H30C30 26.4772 25.5228 22 20 22Z" fill="#4080FF"/>
              </svg>
            </div>
            <div>
              <div className="font-medium text-[15px]">{user.name}</div>
              <div className="text-xs text-[#999]">{user.role}</div>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-[#ccc]" />
        </Link>
      </div>
      
      {/* 基本信息 */}
      <div className="mx-5 mb-4">
        <h3 className="text-sm font-medium text-[#666] mb-2 ml-1">基本信息</h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <Link href="/profile/subjects" className="flex items-center justify-between p-4 border-b border-[#f5f5f5]">
            <div className="flex items-center">
              <div className="w-5 h-5 mr-3 text-[#666]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="14" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M7 12H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-[15px]">我的学科</span>
            </div>
            <ChevronRight className="h-5 w-5 text-[#ccc]" />
          </Link>
          
          <Link href="/profile/grades" className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <div className="w-5 h-5 mr-3 text-[#666]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 7L8 14L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="3" y="3" width="14" height="14" rx="7" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <span className="text-[15px]">我的年级</span>
            </div>
            <ChevronRight className="h-5 w-5 text-[#ccc]" />
          </Link>
        </div>
      </div>
      
      {/* 历史对话 */}
      <div className="mx-5 mb-4">
        <h3 className="text-sm font-medium text-[#666] mb-2 ml-1">历史对话</h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {historyChats.map((chat, index) => (
            <Link 
              key={index} 
              href={chat.href} 
              className={`flex items-center justify-between p-4 ${index < historyChats.length - 1 ? 'border-b border-[#f5f5f5]' : ''}`}
            >
              <div className="flex-1">
                <div className="font-medium text-[15px]">{chat.title}</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-[#4080ff] bg-[#e8f3ff] px-2 py-0.5 rounded-sm mr-2">{chat.category}</span>
                  <span className="text-xs text-[#999]">{chat.date} {chat.time}</span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-[#ccc]" />
            </Link>
          ))}
        </div>
      </div>
      
      {/* 退出登录按钮 */}
      <div className="mx-5 mt-auto mb-24">
        <button 
          onClick={handleLogout}
          className="w-full bg-white text-[#4080ff] font-medium py-3.5 rounded-xl shadow-sm text-[15px]"
        >
          退出登录
        </button>
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
        <Link href="/ask-expert" className="flex flex-col items-center pt-1.5 pb-1 px-4 text-[#999]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9 9C9 7.89543 9.89543 7 11 7H13C14.1046 7 15 7.89543 15 9C15 10.1046 14.1046 11 13 11H11V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="12" cy="17" r="1" fill="currentColor"/>
          </svg>
          <span className="text-xs mt-0.5">问专家</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center pt-1.5 pb-1 px-4 text-[#4080ff]">
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