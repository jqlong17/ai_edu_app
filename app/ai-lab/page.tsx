"use client"

import { AppLayout } from "@/components/layout"
import { Beaker, Video, Bot, Database, Brain } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// 实验室项目数据
const labProjects = [
  {
    id: "1",
    name: "课堂观察",
    description: "基于对课堂视频、音频识别的AI智能分析，提供个性化的教学建议和改进方向",
    icon: Video,
    status: "beta",
    path: "/ai-lab/classroom-observation"
  },
  {
    id: "2",
    name: "Agent助手",
    description: "可在后台自动执行长时间任务，提高老师工作效率，支持批量处理和自动化工作流",
    icon: Bot,
    status: "alpha",
    path: "/ai-lab/agent"
  },
  {
    id: "3",
    name: "知识图谱构建",
    description: "自动从教材和课程内容中提取知识点，构建学科知识图谱，帮助教师理解知识结构",
    icon: Database,
    status: "beta",
    path: "/ai-lab/knowledge-graph"
  },
  {
    id: "4",
    name: "思维提取器",
    description: "AI智能分析文献资料，提取核心思想和方法理念，帮助快速把握文献精髓",
    icon: Brain,
    status: "alpha",
    path: "/ai-lab/thought-extractor"
  }
]

export default function AILab() {
  const [searchQuery, setSearchQuery] = useState("")
  
  // 过滤搜索结果
  const filteredProjects = labProjects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // 获取状态标签样式
  const getStatusStyle = (status: string) => {
    switch(status) {
      case "beta":
        return "bg-green-100 text-green-600";
      case "alpha":
        return "bg-orange-100 text-orange-600";
      case "coming":
      default:
        return "bg-gray-100 text-gray-600";
    }
  }
  
  // 获取状态标签文本
  const getStatusText = (status: string) => {
    switch(status) {
      case "beta":
        return "Beta 测试";
      case "alpha":
        return "Alpha 测试";
      case "coming":
      default:
        return "即将推出";
    }
  }
  
  return (
    <AppLayout>
      {/* 顶部蓝色渐变区域 */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-5 pb-6">
        <div className="flex items-center mb-2">
          <Beaker className="h-6 w-6 mr-2 text-indigo-600" />
          <h1 className="text-2xl font-bold md:text-3xl">AI实验室</h1>
        </div>
        <p className="text-sm text-gray-600 md:text-base">
          探索最新的AI教育技术，体验前沿的实验性功能
        </p>
        
        {/* 搜索框 */}
        <div className="relative mt-4">
          <input
            type="text"
            className="w-full bg-white rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none shadow-sm"
            placeholder="搜索实验项目"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {/* 项目列表 */}
      <div className="p-4 md:p-6 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-500">
              没有找到匹配的实验项目
            </div>
          ) : (
            filteredProjects.map((project) => {
              const IconComponent = project.icon;
              const statusStyle = getStatusStyle(project.status);
              const statusText = getStatusText(project.status);
              
              return (
                <Link 
                  key={project.id} 
                  href={project.path}
                  className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-5">
                    <div className="flex items-start mb-3">
                      <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg mr-3">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{project.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusStyle} inline-block mt-1`}>
                          {statusText}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </AppLayout>
  )
} 