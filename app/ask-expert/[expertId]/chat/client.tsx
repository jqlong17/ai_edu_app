"use client"

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, Mic, MicOff, StopCircle } from "lucide-react"

// 检查用户是否登录的函数
const checkIsLoggedIn = () => {
  // 在客户端检查localStorage中是否有登录状态
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isLoggedIn') === 'true'
  }
  return false
}

export default function ExpertChatClient({ params }: { params: { expertId: string } }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<{type: 'user' | 'expert', content: string}[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // 模拟专家数据
  const expert = {
    id: params.expertId,
    name: "章建跃",
    title: "数学教育专家",
    description: "著名数学教育专家，教育部基础教育课程教材专家工作委员会委员",
    specialties: ["教学设计", "试题解析"],
    avatar: "/images/expert1.png",
  }
  
  useEffect(() => {
    // 检查用户是否已登录
    const loggedIn = checkIsLoggedIn()
    setIsLoggedIn(loggedIn)
    
    // 如果已登录，添加欢迎消息
    if (loggedIn) {
      setMessages([
        {
          type: 'expert',
          content: `您好，我是${expert.name}，${expert.title}。请问有什么可以帮助您的？`
        }
      ])
    }
    
    setIsLoading(false)
    
    // 如果未登录，跳转到登录页面
    if (!loggedIn) {
      router.push('/login?redirect=' + encodeURIComponent(`/ask-expert/${params.expertId}/chat`))
    }
  }, [params.expertId, router, expert.name, expert.title])
  
  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // 添加用户消息
      setMessages(prev => [...prev, { type: 'user', content: message }])
      
      // 清空输入框
      setMessage('')
      
      // 模拟专家回复
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { 
            type: 'expert', 
            content: `感谢您的提问。关于"${message.trim()}"，我的回答是：这是一个很好的问题。作为数学教育专家，我建议您可以从基础概念开始理解，然后逐步深入。您还有其他问题吗？` 
          }
        ])
      }, 1000)
    }
  }
  
  const toggleRecording = () => {
    if (isRecording) {
      // 停止录音
      setIsRecording(false)
      
      // 模拟语音识别结果
      const recognizedText = "这是一个语音识别的模拟结果，实际应用中应该调用语音识别API。"
      
      // 添加用户消息
      setMessages(prev => [...prev, { type: 'user', content: recognizedText }])
      
      // 模拟专家回复
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { 
            type: 'expert', 
            content: `感谢您的语音提问。关于"${recognizedText}"，我的回答是：这是一个很好的问题。作为数学教育专家，我建议您可以从基础概念开始理解，然后逐步深入。您还有其他问题吗？` 
          }
        ])
      }, 1000)
    } else {
      // 开始录音
      setIsRecording(true)
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
  
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-6 max-w-sm mx-auto">
          <div className="text-red-500 text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-bold mb-2">需要登录</h2>
          <p className="text-gray-600 mb-4">与专家对话需要登录账号，正在为您跳转到登录页面...</p>
          <Link href={`/login?redirect=${encodeURIComponent(`/ask-expert/${params.expertId}/chat`)}`} className="text-blue-500 hover:underline">
            立即登录
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col h-screen bg-[#f0f3f8]">
      {/* 顶部导航 */}
      <div className="flex items-center p-4 bg-white border-b">
        <Link href={`/ask-expert/${params.expertId}`} className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h2 className="font-medium">{expert.name}</h2>
          <p className="text-xs text-gray-500">{expert.title}</p>
        </div>
      </div>
      
      {/* 聊天区域 */}
      <div className="flex-1 overflow-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start ${msg.type === 'user' ? 'justify-end' : ''}`}>
              {msg.type === 'expert' && (
                <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-blue-600 text-sm">专</span>
                </div>
              )}
              <div className={`p-3 rounded-lg shadow-sm max-w-[80%] ${
                msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-white'
              }`}>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* 底部输入框 */}
      <div className="border-t p-3 bg-white">
        {isRecording ? (
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <div className="animate-pulse text-red-500 mb-1">● 正在录音...</div>
              <p className="text-xs text-gray-500">请对着麦克风说话</p>
            </div>
            <button 
              onClick={toggleRecording}
              className="ml-2 bg-red-500 text-white rounded-full p-3"
            >
              <StopCircle className="h-6 w-6" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="flex items-center">
            <input
              type="text"
              placeholder="请输入您的问题..."
              className="flex-1 border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button 
              type="button" 
              onClick={toggleRecording}
              className="ml-2 bg-gray-100 text-gray-600 rounded-full p-2.5"
            >
              <Mic className="h-5 w-5" />
            </button>
            <button 
              type="submit" 
              className="ml-2 bg-blue-500 text-white rounded-full p-2.5"
              disabled={!message.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        )}
      </div>
    </div>
  )
} 