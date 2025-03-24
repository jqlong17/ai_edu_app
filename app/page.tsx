"use client"

import { AIAppCard } from "@/components/ai-app-card"
import { Search, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react"
import { useState, useEffect } from 'react'
import type { AIApplication } from './api/types'
import { AppLayout } from "@/components/layout"

// 分类标签
// 工作类型分类
const workCategories = [
  { id: "all", name: "全部" },
  { id: "teaching-design", name: "教学设计" },
  { id: "teaching-tools", name: "教学工具" },
  { id: "class-management", name: "班主任工作" },
  { id: "school-management", name: "学校管理" },
  { id: "teacher-development", name: "教师发展" },
  { id: "teaching-evaluation", name: "教学评估" },
  { id: "student-analysis", name: "学情分析" },
  { id: "moral-education", name: "德育工作" },
  { id: "research-activity", name: "教研活动" }
]

// 学科分类
const subjectCategories = [
  { id: "all-subjects", name: "全部学科" },
  { id: "math", name: "数学" },
  { id: "chinese", name: "语文" },
  { id: "english", name: "英语" },
  { id: "physics", name: "物理" },
  { id: "chemistry", name: "化学" },
  { id: "biology", name: "生物" },
  { id: "history", name: "历史" },
  { id: "geography", name: "地理" },
  { id: "politics", name: "政治" }
]

const ITEMS_PER_PAGE = 20

export default function Home() {
  const [applications, setApplications] = useState<AIApplication[]>([])
  const [selectedWorkCategory, setSelectedWorkCategory] = useState("all")
  const [selectedSubjectCategory, setSelectedSubjectCategory] = useState("all-subjects")
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState<'work' | 'subject'>('work') // 添加标签页切换状态

  // 加载应用数据
  useEffect(() => {
    fetchApplications()
  }, [selectedWorkCategory, selectedSubjectCategory])

  // 获取应用数据
  const fetchApplications = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/applications`)
      const data = await response.json()
      setApplications(data)
    } catch (error) {
      console.error('Error fetching applications:', error)
      setApplications([])
    }
    setLoading(false)
  }

  // 过滤搜索结果
  const filteredApps = applications.filter(app => {
    // 搜索过滤
    const matchesSearch = 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    // 工作类型过滤
    const matchesWorkCategory = 
      selectedWorkCategory === "all" || 
      app.categories.some(cat => {
        // 对应关系映射
        const categoryMapping: Record<string, string[]> = {
          "teaching-design": ["教学设计"],
          "teaching-tools": ["教学工具"],
          "class-management": ["班级管理", "班主任工作"],
          "school-management": ["学校管理"],
          "teacher-development": ["教师发展", "教师培训"],
          "teaching-evaluation": ["教学评估"],
          "student-analysis": ["学情分析"],
          "moral-education": ["德育工作"],
          "research-activity": ["教研活动", "课题研究"]
        }
        return categoryMapping[selectedWorkCategory]?.some(mappedCat => 
          cat.includes(mappedCat)
        ) || false
      })
    
    // 学科分类过滤
    const matchesSubjectCategory = 
      selectedSubjectCategory === "all-subjects" || 
      app.categories.some(cat => {
        // 对应关系映射
        const subjectMapping: Record<string, string[]> = {
          "math": ["数学"],
          "chinese": ["语文"],
          "english": ["英语"],
          "physics": ["物理"],
          "chemistry": ["化学"],
          "biology": ["生物"],
          "history": ["历史"],
          "geography": ["地理"],
          "politics": ["政治"]
        }
        return subjectMapping[selectedSubjectCategory]?.some(mappedSubject => 
          cat.includes(mappedSubject)
        ) || false
      })
    
    return matchesSearch && matchesWorkCategory && matchesSubjectCategory
  })

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
      {/* 顶部渐变区域 */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-5 pb-6">
        <div className="flex items-center mb-2">
          <LayoutGrid className="h-6 w-6 mr-2 text-blue-600" />
          <h1 className="text-2xl font-bold md:text-3xl">AI应用</h1>
        </div>
        <p className="text-sm text-gray-600 md:text-base">
          选择专业的教学助手，开启智能教学之旅
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
      
      {/* 分类标签切换 */}
      <div className="flex border-b border-gray-100">
        <button 
          className={`flex-1 py-2.5 text-center font-medium ${
            activeTab === 'work' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('work')}
        >
          按工作类型
        </button>
        <button 
          className={`flex-1 py-2.5 text-center font-medium ${
            activeTab === 'subject' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('subject')}
        >
          按学科分类
        </button>
      </div>
      
      {/* 分类标签 */}
      <div className="flex overflow-x-auto px-3 py-3 md:py-4 gap-2 no-scrollbar bg-white sticky top-0 z-10 border-b border-gray-100">
        {activeTab === 'work' ? (
          // 工作类型分类标签
          workCategories.map((category) => (
            <div 
              key={category.id} 
              className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm cursor-pointer ${
                category.id === selectedWorkCategory
                  ? "bg-blue-500 text-white" 
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedWorkCategory(category.id)}
            >
              {category.name}
            </div>
          ))
        ) : (
          // 学科分类标签
          subjectCategories.map((category) => (
            <div 
              key={category.id} 
              className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm cursor-pointer ${
                category.id === selectedSubjectCategory
                  ? "bg-blue-500 text-white" 
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedSubjectCategory(category.id)}
            >
              {category.name}
            </div>
          ))
        )}
      </div>
      
      {/* 当前筛选条件显示 */}
      {(selectedWorkCategory !== "all" || selectedSubjectCategory !== "all-subjects") && (
        <div className="bg-blue-50 px-4 py-2 flex items-center text-sm">
          <span className="text-gray-600 mr-2">当前筛选:</span>
          {selectedWorkCategory !== "all" && (
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs mr-2">
              {workCategories.find(c => c.id === selectedWorkCategory)?.name}
              <button 
                className="ml-1 text-blue-500 hover:text-blue-700"
                onClick={() => setSelectedWorkCategory("all")}
              >
                ×
              </button>
            </span>
          )}
          {selectedSubjectCategory !== "all-subjects" && (
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
              {subjectCategories.find(c => c.id === selectedSubjectCategory)?.name}
              <button 
                className="ml-1 text-blue-500 hover:text-blue-700"
                onClick={() => setSelectedSubjectCategory("all-subjects")}
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
      
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
