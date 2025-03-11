"use client"

import { AIAppCard } from "@/components/ai-app-card"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from 'react'
import type { AIApplication } from './api/types'
import { AppLayout } from "@/components/layout"

// 分类标签
const categories = ["全部", "教学设计", "教学工具", "数学教学", "语文教学", "英语教学", "试题解析", "教学评估", "学情分析"]
const ITEMS_PER_PAGE = 20

export default function Home() {
  const [applications, setApplications] = useState<AIApplication[]>([])
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // 加载应用数据
  useEffect(() => {
    fetchApplications(selectedCategory)
  }, [selectedCategory])

  // 获取应用数据
  const fetchApplications = async (category: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/applications?category=${encodeURIComponent(category)}`)
      const data = await response.json()
      setApplications(data)
    } catch (error) {
      console.error('Error fetching applications:', error)
      setApplications([])
    }
    setLoading(false)
  }

  // 过滤搜索结果
  const filteredApps = applications.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // 计算总页数
  const totalPages = Math.ceil(filteredApps.length / ITEMS_PER_PAGE)

  // 获取当前页的应用
  const getCurrentPageApps = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredApps.slice(startIndex, endIndex)
  }

  // 页码变化处理
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AppLayout>
      {/* 顶部蓝色渐变区域 */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-5 pb-6">
        <h1 className="text-2xl font-bold mb-2 md:hidden">云小睿</h1>
        <p className="text-sm text-gray-600">
          远择专业的教学人助手，开启智能教学之旅
        </p>
        
        {/* 搜索框 */}
        <div className="relative mt-4">
          <input
            type="text"
            className="w-full bg-white rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none shadow-sm"
            placeholder="请输入搜索关键字"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>
      
      {/* 分类标签 */}
      <div className="flex overflow-x-auto px-3 py-3 md:py-4 gap-2 no-scrollbar bg-white sticky top-0 z-10 border-b border-gray-100">
        {categories.map((category) => (
          <div 
            key={category} 
            className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm cursor-pointer ${
              category === selectedCategory
                ? "bg-blue-500 text-white" 
                : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>
      
      {/* 应用列表 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3 md:gap-4 md:p-4 mx-auto w-full bg-gray-50">
        {loading ? (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 text-center py-8 text-gray-500">
            加载中...
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 text-center py-8 text-gray-500">
            没有找到相关应用
          </div>
        ) : (
          getCurrentPageApps().map((app) => (
            <AIAppCard key={app.id} app={app} />
          ))
        )}
      </div>

      {/* 分页控制 */}
      {!loading && filteredApps.length > 0 && (
        <div className="flex justify-center items-center gap-2 pb-8 px-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </AppLayout>
  )
}
