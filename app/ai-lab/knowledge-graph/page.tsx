"use client"

import { AppLayout } from "@/components/layout"
import { Database, ArrowLeft, Upload, Search, ZoomIn, ZoomOut, Download, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

export default function KnowledgeGraph() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [graphGenerated, setGraphGenerated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [zoomLevel, setZoomLevel] = useState(100)
  const [windowWidth, setWindowWidth] = useState(800)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    // 初始化窗口宽度
    setWindowWidth(window.innerWidth)
    
    // 添加resize事件监听
    window.addEventListener('resize', handleResize)
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  // 修改状态变量名称和默认值
  const [knowledgeInput, setKnowledgeInput] = useState("函数")
  const [isGeneratingKnowledge, setIsGeneratingKnowledge] = useState(false)
  const [knowledgeGraphGenerated, setKnowledgeGraphGenerated] = useState(true)
  
  // 函数知识点数据
  const functionKnowledgePoints = [
    { 
      id: "f1", 
      name: "函数", 
      category: "函数类型",
      level: 0,
      connections: ["f2", "f3", "f4"] 
    },
    { 
      id: "f2", 
      name: "一次函数", 
      category: "函数类型",
      level: 1,
      connections: ["f5", "f6"] 
    },
    { 
      id: "f3", 
      name: "二次函数", 
      category: "函数类型",
      level: 1,
      connections: ["f7", "f8"] 
    },
    { 
      id: "f4", 
      name: "指数函数", 
      category: "函数类型",
      level: 1,
      connections: ["f9"] 
    },
    { 
      id: "f5", 
      name: "斜率", 
      category: "函数要素",
      level: 2,
      connections: [] 
    },
    { 
      id: "f6", 
      name: "截距", 
      category: "函数要素",
      level: 2,
      connections: [] 
    },
    { 
      id: "f7", 
      name: "顶点", 
      category: "关键点",
      level: 2,
      connections: [] 
    },
    { 
      id: "f8", 
      name: "对称轴", 
      category: "图像特征",
      level: 2,
      connections: [] 
    },
    { 
      id: "f9", 
      name: "底数", 
      category: "函数要素",
      level: 2,
      connections: [] 
    }
  ]
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setUploadedFile(files[0])
      setGraphGenerated(false)
    }
  }
  
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }
  
  const handleGenerateGraph = () => {
    if (!uploadedFile) return
    
    setIsGenerating(true)
    
    // 模拟生成过程
    setTimeout(() => {
      setIsGenerating(false)
      setGraphGenerated(true)
    }, 3000)
  }
  
  const handleZoomIn = () => {
    if (zoomLevel < 200) {
      setZoomLevel(zoomLevel + 20)
    }
  }
  
  const handleZoomOut = () => {
    if (zoomLevel > 40) {
      setZoomLevel(zoomLevel - 20)
    }
  }
  
  const handleGenerateKnowledge = () => {
    if (!knowledgeInput.trim()) return
    
    setIsGeneratingKnowledge(true)
    
    // 模拟生成过程
    setTimeout(() => {
      setIsGeneratingKnowledge(false)
      setKnowledgeGraphGenerated(true)
    }, 2000)
  }
  
  const filteredPoints = searchQuery 
    ? functionKnowledgePoints.filter(point => 
        point.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        point.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : functionKnowledgePoints
  
  // 获取知识点分类颜色
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "函数类型": return "#4F46E5"; // indigo
      case "图像特征": return "#059669"; // emerald
      case "函数要素": return "#D97706"; // amber
      case "函数表示": return "#DC2626"; // red
      case "关键点": return "#7C3AED"; // purple
      default: return "#6B7280"; // gray
    }
  }
  
  // 获取知识点位置
  const getNodePosition = (point: typeof functionKnowledgePoints[0], totalPoints: number) => {
    const levelCounts = functionKnowledgePoints.reduce((acc, p) => {
      acc[p.level] = (acc[p.level] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const maxLevel = Math.max(...Object.keys(levelCounts).map(Number));
    const levelHeight = windowWidth < 768 ? 120 : 150;
    const y = 80 + point.level * levelHeight;

    const pointsAtLevel = functionKnowledgePoints.filter(p => p.level === point.level);
    const indexAtLevel = pointsAtLevel.findIndex(p => p.id === point.id);
    const levelWidth = windowWidth < 768 ? windowWidth - 40 : 800;
    const spacing = levelWidth / (pointsAtLevel.length + 1);
    const x = spacing * (indexAtLevel + 1);

    return { x, y };
  }
  
  return (
    <AppLayout>
      {/* 顶部渐变区域 */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-5 pb-6">
        <div className="flex items-center mb-2">
          <Link href="/ai-lab" className="mr-2 text-indigo-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <Database className="h-6 w-6 mr-2 text-indigo-600" />
          <h1 className="text-2xl font-bold md:text-3xl">知识图谱构建</h1>
        </div>
        <p className="text-sm text-gray-600 md:text-base">
          自动从教材内容中提取知识点，构建学科知识图谱
        </p>
      </div>
      
      <div className="p-4 md:p-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          {/* 知识图谱介绍模块 */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <h2 className="text-lg font-medium mb-4">什么是知识图谱？</h2>
            <p className="text-sm text-gray-600 mb-4">
              知识图谱是一种结构化的知识表示方式，它通过图的形式展示知识点之间的关系。在教育领域，知识图谱可以帮助教师和学生更好地理解知识体系，发现知识间的联系，优化学习路径。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">自动构建</h3>
                <p className="text-sm text-gray-600">
                  通过AI技术，自动从教材、课件等文本中提取知识点，识别它们之间的关系，构建完整的知识网络。
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">多维关联</h3>
                <p className="text-sm text-gray-600">
                  展示知识点之间的各种关系，如前置后继、包含被包含、相关联系等，帮助理解知识体系。
                </p>
              </div>
            </div>
          </div>

          {/* 知识图谱生成 */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <h2 className="text-lg font-medium mb-4">知识图谱生成</h2>
            <div className="mb-4">
              <label htmlFor="knowledgeInput" className="block text-sm font-medium text-gray-700 mb-1">
                输入知识点
              </label>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
                <input
                  id="knowledgeInput"
                  type="text"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="例如：函数、方程、几何"
                  value={knowledgeInput}
                  onChange={(e) => {
                    setKnowledgeInput(e.target.value);
                    setKnowledgeGraphGenerated(true);
                  }}
                />
                <button
                  className={`px-4 py-2 rounded-lg text-sm ${
                    isGeneratingKnowledge
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                  onClick={handleGenerateKnowledge}
                  disabled={isGeneratingKnowledge || !knowledgeInput.trim()}
                >
                  构建知识图谱
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                输入核心知识点，系统将自动构建相关的知识体系结构
              </p>
            </div>

            {knowledgeGraphGenerated && (
              <div className="border border-gray-200 rounded-lg bg-gray-50 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">知识体系结构</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-100"
                      onClick={handleZoomOut}
                      disabled={zoomLevel <= 40}
                    >
                      <ZoomOut className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="text-xs text-gray-600">{zoomLevel}%</span>
                    <button
                      className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-100"
                      onClick={handleZoomIn}
                      disabled={zoomLevel >= 200}
                    >
                      <ZoomIn className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div 
                  className="relative h-[400px] md:h-[500px] overflow-hidden"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "center center" }}
                >
                  <svg className="absolute top-0 left-0 w-full h-full">
                    {/* 连接线 */}
                    {functionKnowledgePoints.map(point => (
                      point.connections.map(connId => {
                        const connPoint = functionKnowledgePoints.find(p => p.id === connId);
                        if (!connPoint) return null;
                        
                        const source = getNodePosition(point, functionKnowledgePoints.length);
                        const target = getNodePosition(connPoint, functionKnowledgePoints.length);
                        
                        // 计算贝塞尔曲线的控制点
                        const midY = (source.y + target.y) / 2;
                        
                        return (
                          <g key={`${point.id}-${connId}`}>
                            <path
                              d={`M ${source.x} ${source.y} C ${source.x} ${midY}, ${target.x} ${midY}, ${target.x} ${target.y}`}
                              fill="none"
                              stroke="#CBD5E1"
                              strokeWidth="2"
                              markerEnd="url(#arrowhead)"
                              className={searchQuery && !filteredPoints.some(p => p.id === point.id || p.id === connId) ? "opacity-30" : ""}
                            />
                          </g>
                        );
                      })
                    ))}
                    
                    {/* 箭头定义 */}
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon
                          points="0 0, 10 3.5, 0 7"
                          fill="#CBD5E1"
                        />
                      </marker>
                    </defs>
                    
                    {/* 知识点节点 */}
                    {functionKnowledgePoints.map((point, index) => {
                      const position = getNodePosition(point, functionKnowledgePoints.length);
                      
                      return (
                        <g key={point.id}>
                          <circle
                            cx={position.x}
                            cy={position.y}
                            r={windowWidth < 768 ? 40 : 50}
                            fill={getCategoryColor(point.category)}
                            opacity="0.1"
                          />
                          <circle
                            cx={position.x}
                            cy={position.y}
                            r={windowWidth < 768 ? 40 : 50}
                            fill="none"
                            stroke={getCategoryColor(point.category)}
                            strokeWidth="2"
                          />
                          <text
                            x={position.x}
                            y={position.y}
                            textAnchor="middle"
                            className="text-sm font-medium"
                            fill={getCategoryColor(point.category)}
                          >
                            {point.name}
                          </text>
                          <text
                            x={position.x}
                            y={position.y + 16}
                            textAnchor="middle"
                            className="text-xs"
                            fill="#6B7280"
                          >
                            {point.category}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* 图例 */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <div className="text-sm font-medium text-gray-700">图例:</div>
                  {["函数类型", "图像特征", "函数要素", "关键点"].map(category => (
                    <div key={category} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-1.5"
                        style={{ backgroundColor: getCategoryColor(category) }}
                      ></div>
                      <span className="text-sm text-gray-600">{category}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 上传区域 */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <h2 className="text-lg font-medium mb-4">上传教材内容</h2>
            
            <input 
              type="file" 
              accept=".pdf,.docx,.txt" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            
            {!uploadedFile ? (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors"
                onClick={handleUploadClick}
              >
                <Upload className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-500 mb-1">点击或拖拽文件到此处上传</p>
                <p className="text-xs text-gray-400">支持PDF、Word、TXT格式，最大文件大小50MB</p>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
                    onClick={handleUploadClick}
                  >
                    更换文件
                  </button>
                  
                  <button
                    className={`px-4 py-1.5 rounded-lg text-sm ${
                      isGenerating 
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                    onClick={handleGenerateGraph}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <span className="flex items-center">
                        <RefreshCw className="h-4 w-4 mr-1.5 animate-spin" />
                        生成中...
                      </span>
                    ) : "生成知识图谱"}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* 知识图谱展示 */}
          {graphGenerated && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-medium">知识图谱</h2>
                
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      className="pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-48"
                      placeholder="搜索知识点"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button 
                      className="p-1.5 hover:bg-gray-100"
                      onClick={handleZoomOut}
                      disabled={zoomLevel <= 40}
                    >
                      <ZoomOut className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="text-xs text-gray-600 px-1">{zoomLevel}%</span>
                    <button 
                      className="p-1.5 hover:bg-gray-100"
                      onClick={handleZoomIn}
                      disabled={zoomLevel >= 200}
                    >
                      <ZoomIn className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <button className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-100">
                    <Download className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-5">
                {/* 知识图谱可视化 */}
                <div 
                  className="border border-gray-200 rounded-lg bg-gray-50 p-4 h-[500px] overflow-auto"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top left" }}
                >
                  <div className="relative w-full h-full">
                    {/* 连接线 */}
                    <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 1 }}>
                      {functionKnowledgePoints.map(point => (
                        point.connections.map(connId => {
                          const connPoint = functionKnowledgePoints.find(p => p.id === connId);
                          if (!connPoint) return null;
                          
                          const source = getNodePosition(point, functionKnowledgePoints.length);
                          const target = getNodePosition(connPoint, functionKnowledgePoints.length);
                          
                          // 计算贝塞尔曲线的控制点
                          const midY = (source.y + target.y) / 2;
                          
                          return (
                            <line 
                              key={`${point.id}-${connId}`}
                              x1={source.x}
                              y1={source.y}
                              x2={target.x}
                              y2={target.y}
                              stroke="#CBD5E1"
                              strokeWidth="2"
                              strokeDasharray={searchQuery && !filteredPoints.some(p => p.id === point.id || p.id === connId) ? "5,5" : "none"}
                              opacity={searchQuery && !filteredPoints.some(p => p.id === point.id || p.id === connId) ? 0.3 : 1}
                            />
                          );
                        })
                      ))}
                    </svg>
                    
                    {/* 知识点节点 */}
                    {functionKnowledgePoints.map((point, index) => {
                      const x = 100 + (index % 4) * 200;
                      const y = 100 + Math.floor(index / 4) * 150;
                      const isHighlighted = searchQuery ? filteredPoints.some(p => p.id === point.id) : true;
                      
                      return (
                        <div 
                          key={point.id}
                          className={`absolute rounded-lg p-3 shadow-sm transition-all duration-300 ${
                            isHighlighted 
                              ? "bg-white border-2" 
                              : "bg-gray-100 border opacity-40"
                          }`}
                          style={{ 
                            left: `${x}px`, 
                            top: `${y}px`, 
                            transform: "translate(-50%, -50%)",
                            borderColor: getCategoryColor(point.category),
                            zIndex: isHighlighted ? 10 : 2
                          }}
                        >
                          <div className="font-medium text-center">{point.name}</div>
                          <div 
                            className="text-xs mt-1 px-2 py-0.5 rounded-full text-white text-center"
                            style={{ backgroundColor: getCategoryColor(point.category) }}
                          >
                            {point.category}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* 图例 */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <div className="text-sm font-medium text-gray-700">图例:</div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#4F46E5] mr-1.5"></div>
                    <span className="text-sm text-gray-600">函数</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#059669] mr-1.5"></div>
                    <span className="text-sm text-gray-600">几何</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#D97706] mr-1.5"></div>
                    <span className="text-sm text-gray-600">方程</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#DC2626] mr-1.5"></div>
                    <span className="text-sm text-gray-600">代数</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
} 