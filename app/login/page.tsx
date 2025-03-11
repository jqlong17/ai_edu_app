"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect') || '/'
  
  const [activeTab, setActiveTab] = useState<'account' | 'sms'>('sms')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [countdown, setCountdown] = useState(60)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里应该添加实际的登录逻辑
    // 模拟登录成功，将用户重定向回原页面
    
    // 模拟存储登录状态
    localStorage.setItem('isLoggedIn', 'true')
    
    // 重定向到原来的页面
    router.push(redirectUrl)
  }

  const handleSkipLogin = () => {
    // 跳过登录，直接返回主页
    router.push('/')
  }

  const handleSendVerificationCode = () => {
    if (phone.length !== 11) {
      alert('请输入正确的手机号码')
      return
    }

    setIsCountingDown(true)
    let count = 60
    const timer = setInterval(() => {
      count--
      setCountdown(count)
      if (count === 0) {
        clearInterval(timer)
        setIsCountingDown(false)
        setCountdown(60)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f3f8]" style={{
      backgroundImage: 'linear-gradient(to bottom, #e8f3ff 0%, #f0f3f8 50%)',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* 返回按钮 */}
      <div className="p-5">
        <Link href="/" className="text-[#666]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* 登录卡片 */}
      <div className="flex-1 flex items-center justify-center px-5 pb-20">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6">
          {/* 选项卡 */}
          <div className="flex border-b border-[#f0f0f0] mb-6">
            <button 
              className={`flex-1 pb-3 text-center font-medium ${activeTab === 'account' ? 'text-[#0066ff] border-b-2 border-[#0066ff]' : 'text-[#666]'}`}
              onClick={() => setActiveTab('account')}
            >
              账号登录
            </button>
            <button 
              className={`flex-1 pb-3 text-center font-medium ${activeTab === 'sms' ? 'text-[#0066ff] border-b-2 border-[#0066ff]' : 'text-[#666]'}`}
              onClick={() => setActiveTab('sms')}
            >
              短信登录
            </button>
          </div>

          {/* 表单 */}
          <form onSubmit={handleLogin}>
            {activeTab === 'account' ? (
              <>
                {/* 账号密码登录 */}
                <div className="mb-4">
                  <div className="flex items-center border border-[#e5e5e5] rounded-lg px-4 py-3 mb-4">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#999] mr-2">
                      <path d="M10 10C12.0711 10 13.75 8.32107 13.75 6.25C13.75 4.17893 12.0711 2.5 10 2.5C7.92893 2.5 6.25 4.17893 6.25 6.25C6.25 8.32107 7.92893 10 10 10Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M16.25 17.5C16.25 14.6066 13.3934 12.5 10 12.5C6.60661 12.5 3.75 14.6066 3.75 17.5" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    <input 
                      type="text" 
                      placeholder="请输入手机号" 
                      className="flex-1 outline-none text-[15px]" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center border border-[#e5e5e5] rounded-lg px-4 py-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#999] mr-2">
                      <rect x="3.75" y="8.75" width="12.5" height="8.75" rx="1.25" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M6.25 8.75V6.25C6.25 3.76472 8.26472 1.75 10.75 1.75H11.25C13.7353 1.75 15.75 3.76472 15.75 6.25V8.75" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="10" cy="13.75" r="1.25" fill="currentColor"/>
                    </svg>
                    <input 
                      type="password" 
                      placeholder="请输入密码" 
                      className="flex-1 outline-none text-[15px]" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 短信登录 */}
                <div className="mb-4">
                  <div className="flex items-center border border-[#e5e5e5] rounded-lg px-4 py-3 mb-4">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#999] mr-2">
                      <path d="M10 10C12.0711 10 13.75 8.32107 13.75 6.25C13.75 4.17893 12.0711 2.5 10 2.5C7.92893 2.5 6.25 4.17893 6.25 6.25C6.25 8.32107 7.92893 10 10 10Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M16.25 17.5C16.25 14.6066 13.3934 12.5 10 12.5C6.60661 12.5 3.75 14.6066 3.75 17.5" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    <input 
                      type="tel" 
                      placeholder="请输入手机号" 
                      className="flex-1 outline-none text-[15px]" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center border border-[#e5e5e5] rounded-lg px-4 py-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#999] mr-2">
                      <rect x="2.5" y="5" width="15" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M6.25 10H13.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M10 6.25V13.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <input 
                      type="text" 
                      placeholder="请输入验证码" 
                      className="flex-1 outline-none text-[15px]" 
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <div className="ml-2">
                      {isCountingDown ? (
                        <span className="text-[#999] text-sm">{countdown}秒后重发</span>
                      ) : (
                        <button 
                          type="button" 
                          className="text-[#0066ff] text-sm font-medium"
                          onClick={handleSendVerificationCode}
                        >
                          获取验证码
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 验证码展示区域 - 仅用于演示 */}
            {activeTab === 'sms' && (
              <div className="flex items-center justify-between mb-4 px-4">
                <span className="text-[#999] text-sm">验证码:</span>
                <span className="text-[#4caf50] text-xl font-bold tracking-widest">3n3D</span>
              </div>
            )}

            {/* 登录按钮 */}
            <button 
              type="submit" 
              className="w-full bg-[#0066ff] text-white font-medium py-3 rounded-lg mb-4"
            >
              登录
            </button>

            {/* 跳过登录选项 - 只有在不是从专家页面跳转来的情况下才显示 */}
            {!redirectUrl.includes('/ask-expert/') && (
              <div className="text-center mb-4">
                <button 
                  type="button" 
                  className="text-[#0066ff] text-sm font-medium"
                  onClick={handleSkipLogin}
                >
                  跳过登录，直接进入
                </button>
              </div>
            )}

            {/* 协议提示 */}
            <div className="text-xs text-[#999] text-center">
              登录即表示您同意并遵守本应用的<Link href="/terms" className="text-[#0066ff]">用户协议</Link>。
            </div>
          </form>
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
        <Link href="/ask-expert" className="flex flex-col items-center pt-1.5 pb-1 px-4 text-[#999]">
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