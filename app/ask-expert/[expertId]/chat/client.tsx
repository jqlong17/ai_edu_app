"use client"

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, Mic, MicOff, StopCircle } from "lucide-react"

// 模拟专家数据
const expertsData = {
  "1": {
    name: "章老师",
    title: "数学教育专家",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=math&backgroundColor=b6e3f4",
    welcomeMessage: "您好，我是章老师。作为一名数学教育专家，我擅长数学思维培养和解题方法创新。请问有什么数学问题需要我帮助吗？",
    responseTemplates: [
      "这是一个很好的数学问题。让我们一步步分析：\n1. 首先要理解题目的核心概念\n2. 找出已知条件和未知量\n3. 选择合适的解题方法\n\n",
      "在解决这类数学问题时，我建议从以下几个角度思考：\n1. 基本概念的理解\n2. 解题思路的构建\n3. 方法的选择\n\n",
      "数学学习最重要的是理解基本原理。针对您的问题，我们可以这样思考：\n1. 回顾相关知识点\n2. 分析题目特点\n3. 总结解题方法\n\n"
    ]
  },
  "2": {
    name: "朱老师",
    title: "德育专家",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=moral&backgroundColor=ffdfba",
    welcomeMessage: "您好，我是朱老师。作为德育工作者，我致力于帮助学生健康成长。您有什么想和我交流的吗？",
    responseTemplates: [
      "在德育工作中，我们需要注意学生的个体差异。针对这个情况，我的建议是：\n1. 了解学生的成长背景\n2. 建立良好的师生关系\n3. 因材施教\n\n",
      "培养学生良好品德的关键在于以身作则和循循善诱。具体来说：\n1. 树立正确的价值观\n2. 培养良好的行为习惯\n3. 营造积极的班级氛围\n\n",
      "处理这类问题时，要特别注意学生的心理感受。我建议：\n1. 倾听学生的想法\n2. 给予适当的引导\n3. 保持耐心和信心\n\n"
    ]
  },
  "3": {
    name: "韩老师",
    title: "英语教育专家",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=english&backgroundColor=d1f4d1",
    welcomeMessage: "Hello！我是韩老师。很高兴能帮助您提升英语水平。What can I do for you?",
    responseTemplates: [
      "在英语学习中，这是一个很常见的困惑。建议您：\n1. 多听英语原声材料\n2. 坚持每日口语练习\n3. 培养英语思维\n\n",
      "提升英语能力需要多听多说。针对您的问题，我建议：\n1. 制定合理的学习计划\n2. 找到适合的学习方法\n3. 创造语言环境\n\n",
      "学习英语最重要的是培养语感。让我们从以下几个方面入手：\n1. 模仿地道的表达\n2. 理解文化背景\n3. 多做实践练习\n\n"
    ]
  },
  "4": {
    name: "李老师",
    title: "物理教育专家",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=physics&backgroundColor=f4d1e3",
    welcomeMessage: "您好，我是李老师。物理学习需要理论结合实践，我很乐意帮您解答物理学习中的疑惑。",
    responseTemplates: [
      "物理现象背后都有其科学原理。让我们通过实验现象来理解：\n1. 观察现象\n2. 分析原理\n3. 总结规律\n\n",
      "解决物理问题的关键是理解基本概念和定律。我们可以这样分析：\n1. 明确已知条件\n2. 寻找适用定律\n3. 建立解题思路\n\n",
      "在物理学习中，建立正确的思维方式很重要。建议您：\n1. 理解物理概念\n2. 联系生活实际\n3. 多做实验验证\n\n"
    ]
  }
}

// 检查用户是否登录的函数
const checkIsLoggedIn = () => {
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
  
  // 获取当前专家数据
  const expert = expertsData[params.expertId as keyof typeof expertsData]
  
  useEffect(() => {
    const loggedIn = checkIsLoggedIn()
    setIsLoggedIn(loggedIn)
    
    if (loggedIn && expert) {
      setMessages([
        {
          type: 'expert',
          content: expert.welcomeMessage
        }
      ])
    }
    
    setIsLoading(false)
    
    if (!loggedIn) {
      router.push('/login?redirect=' + encodeURIComponent(`/ask-expert/${params.expertId}/chat`))
    }
  }, [params.expertId, router, expert])
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && expert) {
      // 添加用户消息
      setMessages(prev => [...prev, { type: 'user', content: message }])
      
      // 清空输入框
      setMessage('')
      
      // 随机选择一个回复模板
      const randomResponse = expert.responseTemplates[
        Math.floor(Math.random() * expert.responseTemplates.length)
      ]
      
      // 模拟专家回复
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { 
            type: 'expert', 
            content: randomResponse + `具体到您问的"${message.trim()}"，我的建议是：根据您的描述，我们可以从专业角度来分析和解决这个问题。您觉得这个思路怎么样？`
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