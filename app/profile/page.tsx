"use client"

import Link from "next/link"
import { ChevronRight, User, Edit2, Check, X } from "lucide-react"
import { AppLayout } from "@/components/layout"
import { useRouter } from "next/navigation"
import { useState } from "react"

// 模拟用户数据
const initialUserData = {
  name: "张老师",
  role: "七年级 数学老师",
  subjects: ["数学"],
  grade: "七年级"
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

// 可选学科列表
const availableSubjects = ["数学", "语文", "英语", "物理", "化学", "生物", "历史", "地理", "政治"]

// 可选年级列表
const availableGrades = ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级", "七年级", "八年级", "九年级", "高一", "高二", "高三"]

export default function Profile() {
  const router = useRouter()
  const [userData, setUserData] = useState(initialUserData)
  
  // 编辑状态
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingSubjects, setIsEditingSubjects] = useState(false)
  const [isEditingGrade, setIsEditingGrade] = useState(false)
  
  // 临时编辑值
  const [tempName, setTempName] = useState(userData.name)
  const [tempSubjects, setTempSubjects] = useState([...userData.subjects])
  const [tempGrade, setTempGrade] = useState(userData.grade)
  
  // 处理名称编辑
  const handleEditName = () => {
    setTempName(userData.name)
    setIsEditingName(true)
  }
  
  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserData({...userData, name: tempName})
      setIsEditingName(false)
    }
  }
  
  const handleCancelNameEdit = () => {
    setIsEditingName(false)
  }
  
  // 处理学科编辑
  const handleEditSubjects = () => {
    setTempSubjects([...userData.subjects])
    setIsEditingSubjects(true)
  }
  
  const handleToggleSubject = (subject: string) => {
    if (tempSubjects.includes(subject)) {
      setTempSubjects(tempSubjects.filter(s => s !== subject))
    } else {
      setTempSubjects([...tempSubjects, subject])
    }
  }
  
  const handleSaveSubjects = () => {
    setUserData({...userData, subjects: tempSubjects})
    setIsEditingSubjects(false)
  }
  
  const handleCancelSubjectsEdit = () => {
    setIsEditingSubjects(false)
  }
  
  // 处理年级编辑
  const handleEditGrade = () => {
    setTempGrade(userData.grade)
    setIsEditingGrade(true)
  }
  
  const handleSelectGrade = (grade: string) => {
    setTempGrade(grade)
  }
  
  const handleSaveGrade = () => {
    setUserData({...userData, grade: tempGrade})
    setIsEditingGrade(false)
  }
  
  const handleCancelGradeEdit = () => {
    setIsEditingGrade(false)
  }
  
  const handleLogout = () => {
    // 这里应该添加实际的登出逻辑，如清除token等
    // 然后跳转到登录页面
    router.push('/login')
  }
  
  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen bg-[#f5f7fa]">
        {/* 顶部渐变区域 */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-5 pb-6">
          <div className="flex items-center mb-2">
            <User className="h-6 w-6 mr-2 text-blue-600" />
            <h1 className="text-2xl font-bold md:text-3xl">个人中心</h1>
          </div>
          <p className="text-sm text-gray-600 md:text-base">
            管理您的个人信息和历史记录
          </p>
        </div>
        
        {/* 内容容器 */}
        <div className="p-5 md:px-6 md:py-6 flex-1">
          {/* 用户信息卡片 */}
          <div className="bg-white rounded-xl shadow-sm mb-4 md:mb-6">
            <div className="p-4 md:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-11 h-11 md:w-14 md:h-14 bg-[#e8f3ff] rounded-full flex items-center justify-center mr-3 md:mr-4 overflow-hidden">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" fill="#e8f3ff"/>
                      <path d="M20 20C23.3137 20 26 17.3137 26 14C26 10.6863 23.3137 8 20 8C16.6863 8 14 10.6863 14 14C14 17.3137 16.6863 20 20 20Z" fill="#4080FF"/>
                      <path d="M20 22C14.4772 22 10 26.4772 10 32H30C30 26.4772 25.5228 22 20 22Z" fill="#4080FF"/>
                    </svg>
                  </div>
                  {isEditingName ? (
                    <div>
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="border border-blue-300 rounded px-2 py-1 text-[15px] md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <div className="text-xs md:text-sm text-[#999] mt-1">{userData.grade} {userData.subjects.join('、')}老师</div>
                    </div>
                  ) : (
                    <div>
                      <div className="font-medium text-[15px] md:text-lg">{userData.name}</div>
                      <div className="text-xs md:text-sm text-[#999]">{userData.grade} {userData.subjects.join('、')}老师</div>
                    </div>
                  )}
                </div>
                {isEditingName ? (
                  <div className="flex space-x-2">
                    <button onClick={handleSaveName} className="text-blue-500">
                      <Check className="h-5 w-5" />
                    </button>
                    <button onClick={handleCancelNameEdit} className="text-gray-500">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <button onClick={handleEditName} className="text-blue-500">
                    <Edit2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* 基本信息 */}
          <div className="mb-4 md:mb-6">
            <h3 className="text-sm md:text-base font-medium text-[#666] mb-2 ml-1">基本信息</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* 我的学科 */}
              <div className="p-4 md:p-5 border-b border-[#f5f5f5]">
                {isEditingSubjects ? (
                  <div>
                    <div className="flex items-center justify-between mb-3">
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
                      <div className="flex space-x-2">
                        <button onClick={handleSaveSubjects} className="text-blue-500">
                          <Check className="h-5 w-5" />
                        </button>
                        <button onClick={handleCancelSubjectsEdit} className="text-gray-500">
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-8">
                      {availableSubjects.map((subject) => (
                        <button
                          key={subject}
                          onClick={() => handleToggleSubject(subject)}
                          className={`px-3 py-1.5 rounded-full text-sm ${
                            tempSubjects.includes(subject)
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-5 h-5 md:w-6 md:h-6 mr-3 text-[#666]">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="4" width="14" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M7 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M7 12H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <span className="text-[15px] md:text-base">我的学科</span>
                        <div className="text-xs text-gray-500 mt-1">{userData.subjects.join('、')}</div>
                      </div>
                    </div>
                    <button onClick={handleEditSubjects} className="text-blue-500">
                      <Edit2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* 我的年级 */}
              <div className="p-4 md:p-5">
                {isEditingGrade ? (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-5 h-5 md:w-6 md:h-6 mr-3 text-[#666]">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 7L8 14L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <rect x="3" y="3" width="14" height="14" rx="7" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                        </div>
                        <span className="text-[15px] md:text-base">我的年级</span>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={handleSaveGrade} className="text-blue-500">
                          <Check className="h-5 w-5" />
                        </button>
                        <button onClick={handleCancelGradeEdit} className="text-gray-500">
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-8">
                      {availableGrades.map((grade) => (
                        <button
                          key={grade}
                          onClick={() => handleSelectGrade(grade)}
                          className={`px-3 py-1.5 rounded-full text-sm ${
                            tempGrade === grade
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {grade}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-5 h-5 md:w-6 md:h-6 mr-3 text-[#666]">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 7L8 14L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <rect x="3" y="3" width="14" height="14" rx="7" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                      </div>
                      <div>
                        <span className="text-[15px] md:text-base">我的年级</span>
                        <div className="text-xs text-gray-500 mt-1">{userData.grade}</div>
                      </div>
                    </div>
                    <button onClick={handleEditGrade} className="text-blue-500">
                      <Edit2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* 历史对话 */}
          <div className="mb-4 md:mb-6">
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
          <div className="mt-auto mb-24 md:mb-0 md:mt-4">
            <button 
              onClick={handleLogout}
              className="w-full bg-white text-[#4080ff] font-medium py-3.5 rounded-xl shadow-sm text-[15px] md:text-base md:max-w-xs md:mx-auto md:block"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
} 