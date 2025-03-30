"use client"

import { useState, useRef, useEffect } from "react"
import { AppLayout } from "@/components/layout"
import "./styles.css"
import { 
  Upload, Check, X, MessageSquare, Bookmark, Share2, 
  Pencil, ZoomIn, ZoomOut, RotateCcw, Search, Plus, 
  FileText, ListFilter, Star, ChevronDown, ChevronUp, 
  Users, Award, BarChart2, PenTool, Camera, ArrowLeft
} from "lucide-react"
import Link from "next/link"

// 模拟学生数据
const STUDENTS_DATA = [
  { id: 1, name: "张三", class: "三年级一班" },
  { id: 2, name: "李四", class: "三年级一班" },
  { id: 3, name: "王五", class: "三年级一班" },
  { id: 4, name: "赵六", class: "三年级一班" },
  { id: 5, name: "钱七", class: "三年级一班" },
  { id: 6, name: "孙八", class: "三年级一班" },
  { id: 7, name: "周九", class: "三年级一班" },
  { id: 8, name: "吴十", class: "三年级一班" },
  { id: 9, name: "郑十一", class: "三年级一班" },
  { id: 10, name: "王十二", class: "三年级一班" },
]

// 修改班级数据使其更丰富
const CLASS_STATS = {
  totalStudents: 28,
  completedGrading: 10,
  averageScore: 85.6,
  highestScore: 98,
  lowestScore: 62,
  passingRate: 90,
  excellentRate: 35,
  scoreDistribution: [
    { range: "0-60", count: 1, color: "#ff4d4f" },
    { range: "61-70", count: 2, color: "#ffa940" },
    { range: "71-80", count: 5, color: "#ffc53d" },
    { range: "81-90", count: 12, color: "#73d13d" },
    { range: "91-100", count: 8, color: "#52c41a" },
  ]
}

// 模拟收藏的试卷
const FAVORITE_PAPERS = [
  { id: 101, studentName: "张三", score: 98, reason: "解题思路清晰，格式规范" },
  { id: 102, studentName: "李四", score: 65, reason: "需要加强基础知识" },
]

export default function ExamGrading() {
  // 状态管理
  const [activeTab, setActiveTab] = useState<'paper' | 'stats' | 'favorites'>('paper')
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null)
  const [currentScore, setCurrentScore] = useState<string>('')
  const [annotations, setAnnotations] = useState<Array<any>>([])
  const [activeTool, setActiveTool] = useState<'correct' | 'wrong' | 'comment' | null>(null)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [showClassSelector, setShowClassSelector] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [studentScores, setStudentScores] = useState<Record<number, number>>({
    1: 98, 2: 76, 3: 85, 4: 62, 5: 91
  })
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [toolbarOpen, setToolbarOpen] = useState<boolean>(false)
  const [showFunctionSelector, setShowFunctionSelector] = useState<boolean>(false)

  const paperRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // 根据搜索过滤学生
  const filteredStudents = STUDENTS_DATA.filter(
    student => student.name.includes(searchText) || student.id.toString().includes(searchText)
  )

  // 处理图片上传
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 这里会处理真实的上传逻辑
    // 为了示例，我们只是假设上传了图片
    if (e.target.files && e.target.files[0]) {
      alert("试卷上传成功！请选择学生进行批改。")
    }
  }

  // 处理添加标注
  const handleAddAnnotation = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!activeTool || !paperRef.current) return
    
    const rect = paperRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / zoomLevel
    const y = (e.clientY - rect.top) / zoomLevel
    
    const newAnnotation = {
      id: Date.now(),
      type: activeTool,
      x,
      y,
      content: activeTool === 'comment' ? "添加评论" : ""
    }
    
    setAnnotations([...annotations, newAnnotation])
  }

  // 处理分数保存
  const handleSaveScore = () => {
    if (!selectedStudent || !currentScore) return
    
    const score = parseFloat(currentScore)
    if (isNaN(score) || score < 0 || score > 100) {
      alert("请输入0-100之间的有效分数")
      return
    }
    
    setStudentScores({
      ...studentScores,
      [selectedStudent]: score
    })
    
    alert(`已保存${STUDENTS_DATA.find(s => s.id === selectedStudent)?.name}的分数：${score}分`)
  }

  // 处理分享功能
  const handleShare = () => {
    alert("已生成分享链接，家长可以通过该链接查看学生成绩和试卷")
  }

  // 渲染分数统计图表
  const renderScoreChart = () => {
    const maxCount = Math.max(...CLASS_STATS.scoreDistribution.map(d => d.count))
    
    return (
      <div className="mt-4">
        <div className="flex items-end h-48 gap-4">
          {CLASS_STATS.scoreDistribution.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="flex flex-col items-center w-full">
                <div className="text-xs mb-1 text-gray-500">{item.count}人</div>
                <div 
                  className="w-full rounded-t-sm score-chart-column" 
                  style={{ 
                    height: `${(item.count / maxCount) * 180}px`,
                    backgroundColor: item.color
                  }}
                  title={`${item.range}分: ${item.count}人`}
                />
                <div className="text-xs mt-2">{item.range}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <AppLayout>
      {/* 顶部导航栏 */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200">
        {/* 移动端顶部导航 */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-blue-200">
          <div className="flex items-center">
            <Link href="/ai-applications" className="mr-3">
              <ArrowLeft className="h-6 w-6 text-blue-600" />
            </Link>
            <h1 className="text-lg font-medium">阅卷助手</h1>
          </div>
          <button 
            className="text-blue-600"
            onClick={() => setShowFunctionSelector(!showFunctionSelector)}
          >
            {activeTab === 'paper' && '试卷批改'}
            {activeTab === 'stats' && '成绩统计'}
            {activeTab === 'favorites' && '收藏试卷'}
            <ChevronDown className="inline-block ml-1 h-4 w-4" />
          </button>
        </div>

        {/* 桌面端顶部信息 */}
        <div className="hidden md:block p-4">
          <div className="flex items-center">
            <Link href="/ai-applications" className="mr-3">
              <ArrowLeft className="h-6 w-6 text-blue-600" />
            </Link>
            <div>
              <h1 className="text-xl font-bold flex items-center">
                <FileText className="h-6 w-6 mr-2 text-blue-600" />
                阅卷助手
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                高效批改试卷，智能统计分析，一键分享成绩报告
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 移动端功能切换菜单 */}
      {showFunctionSelector && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-20" onClick={() => setShowFunctionSelector(false)} />
          <div className="absolute top-16 left-4 right-4 bg-white rounded-lg shadow-xl">
            <div 
              className={`p-4 border-b border-gray-100 flex items-center ${activeTab === 'paper' ? 'text-blue-600' : ''}`}
              onClick={() => {
                setActiveTab('paper');
                setShowFunctionSelector(false);
              }}
            >
              <FileText className={`h-5 w-5 mr-3 ${activeTab === 'paper' ? 'text-blue-600' : 'text-gray-400'}`} />
              试卷批改
            </div>
            <div 
              className={`p-4 border-b border-gray-100 flex items-center ${activeTab === 'stats' ? 'text-blue-600' : ''}`}
              onClick={() => {
                setActiveTab('stats');
                setShowFunctionSelector(false);
              }}
            >
              <BarChart2 className={`h-5 w-5 mr-3 ${activeTab === 'stats' ? 'text-blue-600' : 'text-gray-400'}`} />
              成绩统计
            </div>
            <div 
              className={`p-4 flex items-center ${activeTab === 'favorites' ? 'text-blue-600' : ''}`}
              onClick={() => {
                setActiveTab('favorites');
                setShowFunctionSelector(false);
              }}
            >
              <Bookmark className={`h-5 w-5 mr-3 ${activeTab === 'favorites' ? 'text-blue-600' : 'text-gray-400'}`} />
              收藏试卷
            </div>
          </div>
        </div>
      )}

      {/* 批改班级区域 */}
      <div className="bg-white border-b border-gray-200 p-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-700 font-medium mr-2">批改班级</span>
            <span className="text-sm text-gray-500 hidden sm:inline">三年级一班 数学期中考试</span>
            <span className="text-sm text-gray-500 sm:hidden">三年级一班</span>
          </div>
          <button 
            className="text-xs text-blue-500 flex items-center"
            onClick={() => setShowClassSelector(!showClassSelector)}
          >
            切换班级
            {showClassSelector ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />}
          </button>
        </div>
        
        {showClassSelector && (
          <div className="bg-gray-50 p-2 rounded-md mt-2">
            <div className="text-sm font-medium mb-1">三年级一班</div>
            <div className="text-sm text-gray-500">三年级二班</div>
            <div className="text-sm text-gray-500">三年级三班</div>
          </div>
        )}
      </div>

      {/* 主体内容区域 */}
      <div className="flex min-h-screen bg-gray-50 md:pb-0 pb-16">
        {/* 左侧边栏：学生列表 */}
        <div className={`${sidebarOpen ? 'fixed inset-0 z-40' : 'hidden'} md:block md:relative md:z-auto md:w-64 md:inset-auto`}>
          {sidebarOpen && (
            <div className="absolute inset-0 bg-black bg-opacity-20 md:hidden" onClick={() => setSidebarOpen(false)} />
          )}
          <div className="relative h-full bg-white border-r border-gray-200">
            <div className="md:hidden absolute right-3 top-3">
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-full bg-gray-100">
                <X size={18} />
              </button>
            </div>
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索学生"
                  className="w-full pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-md"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Search className="absolute left-2 top-2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            
            <div className="p-2 border-b border-gray-200 flex justify-between items-center">
              <div className="text-sm font-medium">学生列表</div>
              <div className="text-xs text-gray-500">{filteredStudents.length}人</div>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(100vh-210px)] md:max-h-[calc(100vh-210px)] max-h-[calc(100vh-150px)]">
              {filteredStudents.map(student => (
                <div 
                  key={student.id}
                  className={`px-3 py-2 border-b border-gray-100 student-list-item flex justify-between items-center ${
                    selectedStudent === student.id ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setSelectedStudent(student.id);
                    setSidebarOpen(false);
                  }}
                >
                  <div>
                    <div className="text-sm font-medium">{student.name}</div>
                    <div className="text-xs text-gray-500">学号: {student.id}</div>
                  </div>
                  {studentScores[student.id] !== undefined && (
                    <div className={`text-sm font-bold ${
                      studentScores[student.id] >= 90 ? 'text-green-500' : 
                      studentScores[student.id] >= 60 ? 'text-orange-500' : 'text-red-500'
                    }`}>
                      {studentScores[student.id]}分
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 主内容区域 */}
        <div className="flex-1 flex flex-col">
          {/* 标签页导航 */}
          <div className="bg-white border-b border-gray-200 md:flex hidden">
            <div className="flex-1 flex">
              <button
                onClick={() => setActiveTab('paper')}
                className={`px-4 py-3 text-sm font-medium relative ${
                  activeTab === 'paper' 
                    ? 'text-blue-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                试卷批改
                {activeTab === 'paper' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-4 py-3 text-sm font-medium relative ${
                  activeTab === 'stats' 
                    ? 'text-blue-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                成绩统计
                {activeTab === 'stats' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-4 py-3 text-sm font-medium relative ${
                  activeTab === 'favorites' 
                    ? 'text-blue-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                收藏试卷
                {activeTab === 'favorites' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                )}
              </button>
            </div>
          </div>
          
          <div className="flex-1 flex">
            {/* 中间试卷区域 */}
            <div className="flex-1 p-2 sm:p-4">
              {/* 试卷批改内容 */}
              {activeTab === 'paper' && (
                <div className="h-full flex flex-col">
                  {/* 试卷展示区域 */}
                  <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
                    {selectedStudent ? (
                      <div 
                        ref={paperRef}
                        className="relative w-full h-full overflow-auto cursor-crosshair"
                        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center top' }}
                        onClick={handleAddAnnotation}
                      >
                        {/* 示例试卷图片 */}
                        <div className="bg-gray-100 w-full min-h-[500px] md:min-h-[800px] flex items-center justify-center">
                          <div className="text-gray-400">
                            {studentScores[selectedStudent] !== undefined ? (
                              <div className="text-center">
                                <div className="text-xl mb-2">
                                  {STUDENTS_DATA.find(s => s.id === selectedStudent)?.name}的试卷
                                </div>
                                <div>
                                  <span className="text-3xl font-bold text-blue-500">{studentScores[selectedStudent]}</span>
                                  <span className="text-gray-500"> / 100分</span>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center">
                                <FileText size={48} className="mx-auto mb-2" />
                                <div>点击"上传试卷"按钮上传图片</div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* 渲染标注 */}
                        {annotations.map(annotation => (
                          <div 
                            key={annotation.id}
                            className={`marker ${annotation.type}`}
                            style={{ left: `${annotation.x}px`, top: `${annotation.y}px` }}
                          >
                            {annotation.type === 'correct' && <Check className="text-green-500" />}
                            {annotation.type === 'wrong' && <X className="text-red-500" />}
                            {annotation.type === 'comment' && (
                              <div className="bg-blue-50 border border-blue-200 p-1 rounded text-xs min-w-[100px]">
                                {annotation.content}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-center text-gray-400">
                        <div>
                          <Users size={48} className="mx-auto mb-3" />
                          <div className="text-lg mb-1">请选择学生</div>
                          <div className="text-sm">选择学生后可以查看、批改试卷</div>
                          <button 
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md text-sm md:hidden"
                            onClick={() => setSidebarOpen(true)}
                          >
                            选择学生
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* 分数输入区域 */}
                  {selectedStudent && (
                    <div className="bg-white p-3 rounded-lg shadow-sm mt-3">
                      <div className="flex items-center mb-2">
                        <div className="font-medium flex-1 text-sm sm:text-base">
                          {STUDENTS_DATA.find(s => s.id === selectedStudent)?.name} - 分数评定
                        </div>
                        <button 
                          className="text-xs text-white bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600"
                          onClick={handleSaveScore}
                        >
                          保存分数
                        </button>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <div className="flex items-center mb-2 sm:mb-0">
                          <input 
                            type="number" 
                            className="w-20 border border-gray-200 rounded-md px-2 py-1 text-sm"
                            placeholder="分数"
                            min="0"
                            max="100"
                            value={currentScore}
                            onChange={(e) => setCurrentScore(e.target.value)}
                          />
                          <span className="text-sm ml-1">/100分</span>
                        </div>
                        
                        <div className="sm:ml-4 flex-1">
                          <input 
                            type="text" 
                            className="w-full border border-gray-200 rounded-md px-2 py-1 text-sm"
                            placeholder="添加评语"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* 成绩统计内容 */}
              {activeTab === 'stats' && (
                <div>
                  {/* 整体统计卡片 */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                      <div className="text-xs sm:text-sm text-gray-500 mb-1">总人数</div>
                      <div className="text-xl sm:text-2xl font-bold">{CLASS_STATS.totalStudents}人</div>
                      <div className="text-xs text-gray-400 mt-1">已批改: {CLASS_STATS.completedGrading}人</div>
                    </div>
                    
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                      <div className="text-xs sm:text-sm text-gray-500 mb-1">平均分</div>
                      <div className="text-xl sm:text-2xl font-bold">{CLASS_STATS.averageScore}分</div>
                      <div className="text-xs text-gray-400 mt-1">满分: 100分</div>
                    </div>
                    
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                      <div className="text-xs sm:text-sm text-gray-500 mb-1">最高/最低分</div>
                      <div className="text-xl sm:text-2xl font-bold">{CLASS_STATS.highestScore}/{CLASS_STATS.lowestScore}</div>
                      <div className="text-xs text-gray-400 mt-1">分差: {CLASS_STATS.highestScore - CLASS_STATS.lowestScore}分</div>
                    </div>
                    
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                      <div className="text-xs sm:text-sm text-gray-500 mb-1">及格率/优秀率</div>
                      <div className="text-xl sm:text-2xl font-bold">{CLASS_STATS.passingRate}%/{CLASS_STATS.excellentRate}%</div>
                      <div className="text-xs text-gray-400 mt-1">优秀: ≥90分, 及格: ≥60分</div>
                    </div>
                  </div>
                  
                  {/* 班级成绩详细统计 */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-sm sm:text-base font-medium mb-2">班级成绩分布</h3>
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                      <div className="text-sm sm:text-base font-medium mb-3 sm:mb-4">分数分布</div>
                      <div className="text-xs text-gray-500 mb-2 sm:mb-3">点击柱状图可查看详细信息</div>
                      <div className="overflow-x-auto pb-2">
                        <div className="min-w-[450px]">
                          {renderScoreChart()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 智能分析报告 */}
                  <div>
                    <h3 className="text-sm sm:text-base font-medium mb-2">智能分析报告</h3>
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-2 sm:p-3 rounded-r-md mb-3 sm:mb-4">
                        <div className="text-xs sm:text-sm font-medium text-blue-700 mb-1">整体情况</div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          班级整体成绩良好，平均分{CLASS_STATS.averageScore}分。优秀率{CLASS_STATS.excellentRate}%，及格率{CLASS_STATS.passingRate}%。
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-2 sm:p-3 rounded-r-md mb-3 sm:mb-4">
                        <div className="text-xs sm:text-sm font-medium text-yellow-700 mb-1">问题分析</div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          有3名学生得分低于70分，建议重点关注。班级整体在应用题方面的掌握较弱，可加强此方面训练。
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border-l-4 border-green-500 p-2 sm:p-3 rounded-r-md">
                        <div className="text-xs sm:text-sm font-medium text-green-700 mb-1">教学建议</div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          1. 针对计算题，学生掌握较好，可以适当增加难度<br/>
                          2. 针对应用题，建议增加训练和讲解<br/>
                          3. 对于分数低于70分的学生，建议进行单独辅导
                        </div>
                      </div>
                      
                      <button className="mt-4 w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                        <FileText size={16} className="mr-1" />
                        <span>导出完整报告</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* 收藏试卷内容 */}
              {activeTab === 'favorites' && (
                <div>
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <h3 className="text-sm sm:text-base font-medium">收藏的试卷</h3>
                    <div className="flex items-center">
                      <button className="text-xs sm:text-sm flex items-center text-gray-500 mr-2 sm:mr-3">
                        <ListFilter size={14} className="mr-1" />
                        <span className="hidden sm:inline">筛选</span>
                      </button>
                      <button className="text-xs sm:text-sm flex items-center text-blue-500">
                        <Plus size={14} className="mr-1" />
                        <span className="hidden sm:inline">添加收藏</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* 收藏试卷列表 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {FAVORITE_PAPERS.map(paper => (
                      <div key={paper.id} className="bg-white p-3 sm:p-4 rounded-lg shadow-sm relative paper-card">
                        <div className="favorite-tag">
                          <Star size={12} className="inline-block mr-1" />
                          <span>收藏</span>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-gray-100 w-16 sm:w-20 h-24 sm:h-28 rounded-md flex items-center justify-center mr-2 sm:mr-3">
                            <FileText className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium text-sm sm:text-base">{paper.studentName}的试卷</div>
                                <div className="text-xs text-gray-500 mt-1">三年级一班 · 数学期中考试</div>
                              </div>
                              <div className={`text-base sm:text-lg font-bold ${
                                paper.score >= 90 ? 'text-green-500' : 
                                paper.score >= 60 ? 'text-orange-500' : 'text-red-500'
                              }`}>
                                {paper.score}分
                              </div>
                            </div>
                            
                            <div className="mt-2 text-xs sm:text-sm text-gray-600">
                              <div className="font-medium mb-1">收藏原因:</div>
                              <div>{paper.reason}</div>
                            </div>
                            
                            <div className="mt-2 flex flex-wrap gap-2">
                              <button className="text-xs text-blue-500 border border-blue-500 px-2 py-1 rounded">
                                查看详情
                              </button>
                              <button className="text-xs text-blue-500 border border-blue-500 px-2 py-1 rounded">
                                取消收藏
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* 空白收藏卡片 */}
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-dashed border-gray-300 flex items-center justify-center h-[130px] sm:h-[152px] cursor-pointer hover:bg-gray-50">
                      <div className="text-center text-gray-400">
                        <Plus size={20} className="mx-auto mb-1" />
                        <div className="text-xs sm:text-sm">添加收藏</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* 右侧工具栏 */}
            {activeTab === 'paper' && (
              <div className={`${toolbarOpen ? 'fixed inset-0 z-40' : 'hidden'} md:block md:relative md:z-auto md:w-56`}>
                {toolbarOpen && (
                  <div className="absolute inset-0 bg-black bg-opacity-20 md:hidden" onClick={() => setToolbarOpen(false)} />
                )}
                <div className="relative h-full bg-white border-l border-gray-200 p-3">
                  <div className="md:hidden absolute right-3 top-3">
                    <button onClick={() => setToolbarOpen(false)} className="p-1 rounded-full bg-gray-100">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="mb-5">
                    <button 
                      className="w-full flex items-center justify-center px-3 py-2 text-sm border rounded-md mb-2 bg-blue-500 text-white"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera size={16} className="mr-1" />
                      <span>上传试卷</span>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </button>
                  </div>

                  <div className="border-t border-gray-200 pt-3 mb-3">
                    <div className="text-xs text-gray-500 mb-2">批改工具</div>
                    <div className="space-y-2">
                      <button 
                        className={`w-full flex items-center px-3 py-2 text-sm border rounded-md annotation-tool ${activeTool === 'correct' ? 'active' : ''}`}
                        onClick={() => {
                          setActiveTool(activeTool === 'correct' ? null : 'correct');
                          setToolbarOpen(false);
                        }}
                      >
                        <Check size={16} className="mr-2 text-green-500" />
                        <span>正确</span>
                      </button>
                      
                      <button 
                        className={`w-full flex items-center px-3 py-2 text-sm border rounded-md annotation-tool ${activeTool === 'wrong' ? 'active' : ''}`}
                        onClick={() => {
                          setActiveTool(activeTool === 'wrong' ? null : 'wrong');
                          setToolbarOpen(false);
                        }}
                      >
                        <X size={16} className="mr-2 text-red-500" />
                        <span>错误</span>
                      </button>
                      
                      <button 
                        className={`w-full flex items-center px-3 py-2 text-sm border rounded-md annotation-tool ${activeTool === 'comment' ? 'active' : ''}`}
                        onClick={() => {
                          setActiveTool(activeTool === 'comment' ? null : 'comment');
                          setToolbarOpen(false);
                        }}
                      >
                        <MessageSquare size={16} className="mr-2 text-blue-500" />
                        <span>评论</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mb-3">
                    <div className="text-xs text-gray-500 mb-2">视图调整</div>
                    <div className="space-y-2">
                      <button 
                        className="w-full flex items-center px-3 py-2 text-sm border rounded-md annotation-tool"
                        onClick={() => {
                          setZoomLevel(prev => Math.min(prev + 0.1, 2));
                          setToolbarOpen(false);
                        }}
                      >
                        <ZoomIn size={16} className="mr-2" />
                        <span>放大</span>
                      </button>
                      
                      <button 
                        className="w-full flex items-center px-3 py-2 text-sm border rounded-md annotation-tool"
                        onClick={() => {
                          setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
                          setToolbarOpen(false);
                        }}
                      >
                        <ZoomOut size={16} className="mr-2" />
                        <span>缩小</span>
                      </button>
                      
                      <button 
                        className="w-full flex items-center px-3 py-2 text-sm border rounded-md annotation-tool"
                        onClick={() => {
                          setAnnotations([]);
                          setToolbarOpen(false);
                        }}
                      >
                        <RotateCcw size={16} className="mr-2" />
                        <span>清除标记</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="text-xs text-gray-500 mb-2">操作</div>
                    <div className="space-y-2">
                      <button 
                        className="w-full flex items-center px-3 py-2 text-sm border rounded-md annotation-tool"
                        onClick={() => {
                          if (selectedStudent) {
                            alert(`已收藏${STUDENTS_DATA.find(s => s.id === selectedStudent)?.name}的试卷`);
                            setToolbarOpen(false);
                          } else {
                            alert("请先选择学生");
                          }
                        }}
                      >
                        <Bookmark size={16} className="mr-2" />
                        <span>收藏</span>
                      </button>
                      
                      <button 
                        className="w-full flex items-center px-3 py-2 text-sm border rounded-md annotation-tool"
                        onClick={() => {
                          handleShare();
                          setToolbarOpen(false);
                        }}
                      >
                        <Share2 size={16} className="mr-2" />
                        <span>分享</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 移动端底部导航栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-2 z-30 md:hidden">
        <button 
          className="flex flex-col items-center justify-center p-2" 
          onClick={() => {setSidebarOpen(!sidebarOpen); setToolbarOpen(false);}}
        >
          <Users size={20} className={`${sidebarOpen ? 'text-blue-500' : 'text-gray-600'}`} />
          <span className="text-xs mt-1">学生</span>
        </button>
        <button 
          className="flex flex-col items-center justify-center p-2"
          onClick={() => setActiveTab('paper')}
        >
          <FileText size={20} className={`${activeTab === 'paper' ? 'text-blue-500' : 'text-gray-600'}`} />
          <span className="text-xs mt-1">批改</span>
        </button>
        <button 
          className="flex flex-col items-center justify-center p-2"
          onClick={() => setActiveTab('stats')}
        >
          <BarChart2 size={20} className={`${activeTab === 'stats' ? 'text-blue-500' : 'text-gray-600'}`} />
          <span className="text-xs mt-1">统计</span>
        </button>
        <button 
          className="flex flex-col items-center justify-center p-2"
          onClick={() => setActiveTab('favorites')}
        >
          <Bookmark size={20} className={`${activeTab === 'favorites' ? 'text-blue-500' : 'text-gray-600'}`} />
          <span className="text-xs mt-1">收藏</span>
        </button>
        {activeTab === 'paper' && (
          <button 
            className="flex flex-col items-center justify-center p-2"
            onClick={() => {setToolbarOpen(!toolbarOpen); setSidebarOpen(false);}}
          >
            <PenTool size={20} className={`${toolbarOpen ? 'text-blue-500' : 'text-gray-600'}`} />
            <span className="text-xs mt-1">工具</span>
          </button>
        )}
      </div>
    </AppLayout>
  )
} 