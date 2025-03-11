"use client"

import { AppLayout } from "@/components/layout"
import { Sparkles, ArrowLeft, Send, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function TextGeneration() {
  const [prompt, setPrompt] = useState("")
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState("")
  
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!prompt.trim()) return
    
    setGenerating(true)
    setResult("")
    
    // 模拟API调用延迟
    setTimeout(() => {
      // 这里是模拟的生成结果，实际应用中应该调用后端API
      const generatedText = `基于您的提示"${prompt}"，以下是生成的内容：\n\n
这是一个关于${prompt}的教学设计方案。本方案适用于初中数学教学，旨在帮助学生更好地理解和掌握相关概念。

教学目标：
1. 理解${prompt}的基本概念和性质
2. 掌握${prompt}的应用方法和技巧
3. 能够解决与${prompt}相关的实际问题

教学重点：
- ${prompt}的定义和基本性质
- ${prompt}在实际问题中的应用

教学难点：
- 学生对${prompt}概念的抽象理解
- ${prompt}在复杂问题中的灵活运用

教学过程：
1. 导入新课（5分钟）：通过生活实例引入${prompt}概念
2. 讲解新知（20分钟）：系统讲解${prompt}的定义、性质和应用
3. 例题讲解（15分钟）：通过典型例题展示${prompt}的应用方法
4. 学生练习（15分钟）：学生独立完成练习，教师巡视指导
5. 总结归纳（5分钟）：归纳${prompt}的核心要点，布置作业

教学反思：
在教学${prompt}的过程中，应注重概念的直观理解，多使用图形和实例进行说明，帮助学生建立直观认识。同时，应注重培养学生的应用能力，通过多样化的练习，提高学生解决问题的能力。`;
      
      setResult(generatedText)
      setGenerating(false)
    }, 2000)
  }
  
  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* 顶部导航 */}
        <div className="bg-white p-4 border-b flex items-center">
          <Link href="/ai-lab" className="text-gray-600 mr-3">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center">
            <Sparkles className="h-5 w-5 text-indigo-600 mr-2" />
            <h1 className="font-medium text-lg">智能文本生成</h1>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600">
              Beta
            </span>
          </div>
        </div>
        
        {/* 主内容区域 */}
        <div className="flex-1 p-4 md:p-6 max-w-4xl mx-auto w-full">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-4 md:p-6">
              <h2 className="text-lg font-medium mb-2">教学内容生成</h2>
              <p className="text-sm text-gray-600 mb-4">
                输入您想要生成的教学内容主题或关键词，AI将为您生成相关的教学设计、教案或教学材料。
              </p>
              
              <form onSubmit={handleGenerate} className="mb-4">
                <div className="mb-4">
                  <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
                    提示词
                  </label>
                  <textarea
                    id="prompt"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="例如：二次函数的教学设计、分数加减法的教学案例、英语时态的教学方法..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={!prompt.trim() || generating}
                  className={`flex items-center justify-center px-4 py-2 rounded-lg ${
                    !prompt.trim() || generating
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      生成内容
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          {/* 生成结果 */}
          {result && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 md:p-6">
                <h2 className="text-lg font-medium mb-4">生成结果</h2>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line text-sm">
                  {result}
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(result);
                      alert("已复制到剪贴板");
                    }}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    复制内容
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
} 