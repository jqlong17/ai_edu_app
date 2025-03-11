"use client"

import { AppLayout } from "@/components/layout"
import { Brain, ArrowLeft, Upload, Download, RefreshCw, FileText, Table } from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"

interface AnalysisResult {
  id: string
  title: string
  authors: string
  year: string
  coreIdeas: string[]
  methodology: string[]
  status: "analyzing" | "completed"
  progress: number
}

// 模拟分析结果数据
const defaultAnalysisResults: AnalysisResult[] = [
  {
    id: "1",
    title: "基于深度学习的个性化教学研究",
    authors: "张明, 李华",
    year: "2023",
    coreIdeas: [
      "利用深度学习技术构建学生知识图谱",
      "基于学习行为数据的个性化推荐算法",
      "自适应学习路径生成方法"
    ],
    methodology: [
      "知识追踪模型的改进与应用",
      "基于注意力机制的学习行为分析",
      "多模态数据融合的学习评估方法"
    ],
    status: "completed",
    progress: 100
  },
  {
    id: "2",
    title: "教育大数据驱动的智慧课堂设计",
    authors: "王芳, 刘伟",
    year: "2023",
    coreIdeas: [
      "实时课堂数据采集与分析框架",
      "教学行为模式挖掘与应用",
      "智能教学反馈系统设计"
    ],
    methodology: [
      "多源异构数据整合方法",
      "基于强化学习的教学策略优化",
      "课堂互动效果评估模型"
    ],
    status: "completed",
    progress: 100
  },
  {
    id: "3",
    title: "人工智能辅助教学效果评估研究",
    authors: "陈静, 周明",
    year: "2023",
    coreIdeas: [
      "AI辅助教学效果评估指标体系",
      "教学质量智能诊断模型",
      "学习成效预测与干预方法"
    ],
    methodology: [
      "多维度教学评估数据分析",
      "基于机器学习的教学效果预测",
      "个性化学习建议生成算法"
    ],
    status: "completed",
    progress: 100
  }
]

export default function ThoughtExtractor() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>(defaultAnalysisResults)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setUploadedFiles(Array.from(files))
    }
  }
  
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }
  
  const handleAnalyze = () => {
    if (uploadedFiles.length === 0) return
    
    setIsAnalyzing(true)
    
    // 模拟分析过程
    setTimeout(() => {
      setAnalysisResults(defaultAnalysisResults)
      setIsAnalyzing(false)
    }, 3000)
  }
  
  const handleDownloadExcel = () => {
    // 模拟下载Excel文件
    console.log("Downloading Excel...")
  }

  return (
    <AppLayout>
      {/* 顶部渐变区域 */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-5 pb-6">
        <div className="flex items-center mb-2">
          <Link href="/ai-lab" className="mr-2 text-purple-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <Brain className="h-6 w-6 mr-2 text-purple-600" />
          <h1 className="text-2xl font-bold md:text-3xl">思维提取器</h1>
          <span className="ml-3 px-2 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded-full">Alpha</span>
        </div>
        <p className="text-sm text-gray-600 md:text-base">
          AI智能分析文献资料，提取核心思想和方法理念
        </p>
      </div>
      
      <div className="p-4 md:p-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          {/* 介绍模块 */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <h2 className="text-lg font-medium mb-4">什么是思维提取器？</h2>
            <p className="text-sm text-gray-600 mb-4">
              思维提取器是一个基于AI的智能分析工具，能够快速理解和提取文献资料中的核心思想和方法理念。它可以帮助教育工作者和研究人员快速把握文献精髓，激发创新思维。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">深度理解</h3>
                <p className="text-sm text-gray-600">
                  运用先进的自然语言处理技术，深入理解文献内容，准确提取核心观点和创新方法。
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">多维分析</h3>
                <p className="text-sm text-gray-600">
                  从思想理念、研究方法、应用价值等多个维度进行分析，形成全面的认知框架。
                </p>
              </div>
            </div>
          </div>

          {/* 上传区域 */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <h2 className="text-lg font-medium mb-4">上传文献资料</h2>
            
            <input 
              type="file" 
              accept=".pdf,.doc,.docx" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
            />
            
            {uploadedFiles.length === 0 ? (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-colors"
                onClick={handleUploadClick}
              >
                <Upload className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-500 mb-1">点击或拖拽文件到此处上传</p>
                <p className="text-xs text-gray-400">支持PDF、Word格式，可多选上传</p>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center py-2">
                      <FileText className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <button
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
                    onClick={handleUploadClick}
                  >
                    添加文件
                  </button>
                  
                  <button
                    className={`px-4 py-1.5 rounded-lg text-sm flex items-center ${
                      isAnalyzing 
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-1.5 animate-spin" />
                        分析中...
                      </>
                    ) : "开始分析"}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* 分析结果 */}
          {analysisResults.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-medium">分析结果</h2>
                
                <Button variant="outline" onClick={handleDownloadExcel}>
                  <Table className="h-4 w-4 mr-2" />
                  导出Excel
                </Button>
              </div>
              
              <div className="p-5">
                <div className="space-y-6">
                  {analysisResults.map(result => (
                    <div key={result.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium mb-1">{result.title}</h3>
                          <p className="text-sm text-gray-500">
                            {result.authors} · {result.year}
                          </p>
                        </div>
                        {result.status === "analyzing" && (
                          <div className="flex items-center">
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-purple-600 transition-all duration-500"
                                style={{ width: `${result.progress}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-500">{result.progress}%</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">核心思想</h4>
                          <ul className="space-y-1">
                            {result.coreIdeas.map((idea, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></span>
                                {idea}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">方法理念</h4>
                          <ul className="space-y-1">
                            {result.methodology.map((method, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-2"></span>
                                {method}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
} 