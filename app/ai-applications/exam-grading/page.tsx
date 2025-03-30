"use client"

import { useState, useRef, useEffect } from "react"
import { AppLayout } from "@/components/layout"
import "./styles.css"
import { 
  Upload, Check, X, MessageSquare, Bookmark, Share2, 
  Pencil, ZoomIn, ZoomOut, RotateCcw, Search, Plus, 
  FileText, ListFilter, Star, ChevronDown, ChevronUp, 
  Users, Award, BarChart2, PenTool, Camera, ArrowLeft, Layers, ClipboardList
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

// 班级数据
const classData = [
  { id: '1', name: '三年级一班', examCount: 5, studentCount: 38 },
  { id: '2', name: '三年级二班', examCount: 4, studentCount: 42 },
  { id: '3', name: '三年级三班', examCount: 3, studentCount: 39 },
];

// 考试数据
const examData = [
  { id: '1', classId: '1', name: '数学期中考试', date: '2023-10-15', completed: 38, total: 38 },
  { id: '2', classId: '1', name: '数学单元测试(一)', date: '2023-09-20', completed: 36, total: 38 },
  { id: '3', classId: '2', name: '数学期中考试', date: '2023-10-15', completed: 40, total: 42 },
];

export default function ExamGrading() {
  // 当前视图: classes(班级列表), exams(考试列表), papers(试卷列表), stats(成绩统计), favorites(收藏试卷)
  const [activeView, setActiveView] = useState<'classes' | 'exams' | 'papers' | 'stats' | 'favorites' | 'upload'>('classes');
  
  // 已选择的班级和考试
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  
  // 侧边栏和工具栏的显示状态
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toolbarOpen, setToolbarOpen] = useState(false);
  
  // 学生列表和切换班级的显示状态
  const [showClassSelector, setShowClassSelector] = useState(false);
  
  // 处理班级选择
  const handleClassSelect = (classId: string) => {
    setSelectedClass(classId);
    setActiveView('exams');
  };
  
  // 处理考试选择
  const handleExamSelect = (examId: string) => {
    setSelectedExam(examId);
    setActiveView('papers');
  };
  
  // 返回班级列表
  const handleBackToClasses = () => {
    setSelectedClass(null);
    setSelectedExam(null);
    setActiveView('classes');
  };
  
  // 返回考试列表
  const handleBackToExams = () => {
    setSelectedExam(null);
    setActiveView('exams');
  };

  // 状态管理
  const [activeTab, setActiveTab] = useState<'paper' | 'stats' | 'favorites'>('paper')
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null)
  const [currentScore, setCurrentScore] = useState<string>('')
  const [annotations, setAnnotations] = useState<Array<any>>([])
  const [activeTool, setActiveTool] = useState<'correct' | 'wrong' | 'comment' | null>(null)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [searchText, setSearchText] = useState<string>('')
  const [studentScores, setStudentScores] = useState<Record<number, number>>({
    1: 98, 2: 76, 3: 85, 4: 62, 5: 91
  })
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
        {/* 顶部导航 */}
        <div className="flex items-center justify-between p-4 border-b border-blue-200">
          <div className="flex items-center">
            <Link href="/" className="mr-3">
              <ArrowLeft className="h-6 w-6 text-blue-600" />
            </Link>
            <div>
              <h1 className="text-lg font-medium">阅卷助手</h1>
              <p className="text-sm text-gray-600 mt-1">高效批改试卷，智能统计分析</p>
            </div>
          </div>
        </div>

        {/* 功能切换标签页 */}
        <div className="bg-white border-b border-gray-200 flex overflow-x-auto">
          <div className="flex-1 flex">
            <button
              onClick={() => setActiveView('classes')}
              className={`px-4 py-3 text-sm font-medium relative whitespace-nowrap ${
                activeView === 'classes' 
                  ? 'text-blue-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Layers className="w-4 h-4 mr-1.5" />
                班级管理
              </div>
              {activeView === 'classes' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
              )}
            </button>
            <button
              onClick={() => setActiveView('upload')}
              className={`px-4 py-3 text-sm font-medium relative whitespace-nowrap ${
                activeView === 'upload' 
                  ? 'text-blue-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Upload className="w-4 h-4 mr-1.5" />
                上传试卷
              </div>
              {activeView === 'upload' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
              )}
            </button>
            <button
              onClick={() => setActiveView('papers')}
              className={`px-4 py-3 text-sm font-medium relative whitespace-nowrap ${
                activeView === 'papers' 
                  ? 'text-blue-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-1.5" />
                查看试卷
              </div>
              {activeView === 'papers' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
              )}
            </button>
            <button
              onClick={() => setActiveView('stats')}
              className={`px-4 py-3 text-sm font-medium relative whitespace-nowrap ${
                activeView === 'stats' 
                  ? 'text-blue-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <BarChart2 className="w-4 h-4 mr-1.5" />
                成绩统计
              </div>
              {activeView === 'stats' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
              )}
            </button>
            <button
              onClick={() => setActiveView('favorites')}
              className={`px-4 py-3 text-sm font-medium relative whitespace-nowrap ${
                activeView === 'favorites' 
                  ? 'text-blue-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1.5" />
                收藏试卷
              </div>
              {activeView === 'favorites' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
              )}
            </button>
          </div>
        </div>

        {/* 当前层级路径显示 */}
        {(selectedClass || selectedExam) && (
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center text-sm">
            <button 
              onClick={handleBackToClasses}
              className="text-blue-600 hover:underline"
            >
              班级列表
            </button>
            
            {selectedClass && (
              <>
                <span className="mx-2 text-gray-400">/</span>
                <button
                  onClick={handleBackToExams}
                  className={`${selectedExam ? 'text-blue-600 hover:underline' : 'text-gray-600'}`}
                >
                  {classData.find(c => c.id === selectedClass)?.name}
                </button>
              </>
            )}
            
            {selectedExam && (
              <>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-600">
                  {examData.find(e => e.id === selectedExam)?.name}
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* 主体内容区域 */}
      <div className="flex min-h-screen bg-gray-50 md:pb-0">
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
          <div className="flex-1 flex">
            {/* 中间试卷区域 */}
            <div className="flex-1 p-2 sm:p-4">
              {/* 试卷批改内容 */}
              {activeView === 'papers' && (
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
              {activeView === 'stats' && (
                <div className="space-y-6">
                  {/* 数据概览卡片 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="stats-card p-4">
                      <div className="text-gray-500 text-sm">总学生数</div>
                      <div className="text-2xl font-bold mt-1">119</div>
                    </div>
                    <div className="stats-card p-4">
                      <div className="text-gray-500 text-sm">已批改试卷</div>
                      <div className="text-2xl font-bold mt-1">342</div>
                    </div>
                    <div className="stats-card p-4">
                      <div className="text-gray-500 text-sm">平均分</div>
                      <div className="text-2xl font-bold mt-1">82.5</div>
                    </div>
                    <div className="stats-card p-4">
                      <div className="text-gray-500 text-sm">优秀率</div>
                      <div className="text-2xl font-bold mt-1">28%</div>
                    </div>
                  </div>
                  
                  {/* 班级成绩分析 */}
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-4">班级成绩分析</h3>
                    
                    {/* 班级选择器 */}
                    <div className="flex mb-4 border-b pb-4">
                      {classData.map(cls => (
                        <button 
                          key={cls.id}
                          className={`mr-4 px-3 py-1 rounded-full text-sm ${
                            selectedClass === cls.id 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          onClick={() => setSelectedClass(cls.id)}
                        >
                          {cls.name}
                        </button>
                      ))}
                    </div>
                    
                    {/* 分数分布图 */}
                    <div className="h-64 flex items-end space-x-2 mb-6">
                      {[
                        {range: '0-59', count: 3, color: 'bg-red-400'},
                        {range: '60-69', count: 8, color: 'bg-orange-400'},
                        {range: '70-79', count: 12, color: 'bg-yellow-400'},
                        {range: '80-89', count: 14, color: 'bg-blue-400'},
                        {range: '90-100', count: 7, color: 'bg-green-400'}
                      ].map((item, i) => {
                        const height = (item.count / 15) * 100;
                        return (
                          <div key={i} className="flex flex-col items-center flex-1">
                            <div 
                              className={`score-chart-column w-full ${item.color}`}
                              style={{height: `${height}%`}}
                            >
                              <div className="invisible group-hover:visible absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2">
                                {item.count}人
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">{item.range}</div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* 成绩对比 */}
                    <div className="border-t pt-4">
                      <h4 className="text-base font-medium mb-3">考试成绩趋势</h4>
                      <div className="text-sm text-gray-500 mb-2">该班级近5次考试平均分趋势</div>
                      <div className="h-40 bg-gray-50 rounded flex items-center justify-center">
                        <p className="text-gray-400">图表区域：展示成绩趋势线</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* 个人成绩分析 */}
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-4">个人成绩分析</h3>
                    <div className="text-sm text-gray-500 mb-4">选择学生查看历史成绩趋势</div>
                    
                    <div className="relative mb-4">
                      <input
                        type="text"
                        className="bg-white rounded-lg border border-gray-200 px-4 py-2 text-sm w-full pl-8"
                        placeholder="搜索学生"
                      />
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                    
                    <div className="h-40 bg-gray-50 rounded flex items-center justify-center">
                      <p className="text-gray-400">请先选择学生以查看个人成绩分析</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* 收藏试卷内容 */}
              {activeView === 'favorites' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-medium mb-4">收藏试卷</h2>
                  
                  {/* 筛选选项 */}
                  <div className="bg-white p-4 rounded-lg shadow mb-4">
                    <div className="flex flex-wrap gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">班级</label>
                        <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-32">
                          <option value="">全部班级</option>
                          {classData.map(cls => (
                            <option key={cls.id} value={cls.id}>{cls.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">考试</label>
                        <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-40">
                          <option value="">全部考试</option>
                          {examData.map(exam => (
                            <option key={exam.id} value={exam.id}>{exam.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">收藏原因</label>
                        <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-32">
                          <option value="">全部原因</option>
                          <option value="excellent">优秀范例</option>
                          <option value="common_mistake">常见错误</option>
                          <option value="improvement">进步明显</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {/* 收藏列表 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="relative">
                          <div className="h-40 bg-gray-100 flex items-center justify-center">
                            <FileText className="h-12 w-12 text-gray-400" />
                          </div>
                          <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 text-xs">
                            {['优秀范例', '常见错误', '进步明显'][i % 3]}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium">学生 {i + 1} 的试卷</h3>
                          <div className="text-sm text-gray-500 mt-1">
                            三年级一班 - 数学期中考试
                          </div>
                          <div className="text-sm mt-2">
                            <span className="text-blue-600 font-medium">92</span> 分
                          </div>
                          <div className="flex justify-between mt-3 pt-3 border-t">
                            <button className="text-sm text-blue-500">查看详情</button>
                            <button className="text-sm text-gray-500">取消收藏</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* 右侧工具栏 */}
            {activeView === 'papers' && (
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
    </AppLayout>
  )
} 