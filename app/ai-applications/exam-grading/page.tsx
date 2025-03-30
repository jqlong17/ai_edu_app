"use client"

import { useState, useRef } from "react"
import { AppLayout } from "@/components/layout"
import "./styles.css"
import { 
  Upload, Check, X, MessageSquare, 
  FileText, Search, Plus, ArrowLeft,
  PenTool, Camera
} from "lucide-react"
import Link from "next/link"

// 试卷数据类型
type ExamPaper = {
  id: string
  name: string
  uploadTime: string
  status: 'pending' | 'grading' | 'completed'
  score?: number
  comments?: string
}

// 模拟试卷数据
const EXAM_PAPERS: ExamPaper[] = [
  { 
    id: '1', 
    name: '数学期中考试-张三',
    uploadTime: '2024-03-20 14:30',
    status: 'completed',
    score: 92,
    comments: '计算准确，解题思路清晰'
  },
  { 
    id: '2', 
    name: '数学期中考试-李四',
    uploadTime: '2024-03-20 14:35',
    status: 'grading'
  },
  { 
    id: '3', 
    name: '数学期中考试-王五',
    uploadTime: '2024-03-20 14:40',
    status: 'pending'
  }
]

export default function ExamGrading() {
  // 状态管理
  const [activeView, setActiveView] = useState<'list' | 'detail'>('list')
  const [selectedPaper, setSelectedPaper] = useState<ExamPaper | null>(null)
  const [searchText, setSearchText] = useState('')
  const [currentScore, setCurrentScore] = useState('')
  const [currentComment, setCurrentComment] = useState('')
  const [annotations, setAnnotations] = useState<Array<any>>([])
  const [activeTool, setActiveTool] = useState<'correct' | 'wrong' | 'comment' | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const paperRef = useRef<HTMLDivElement>(null)

  // 处理试卷上传
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      alert("试卷上传成功！")
    }
  }

  // 处理添加标注
  const handleAddAnnotation = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!activeTool || !paperRef.current) return
    
    const rect = paperRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newAnnotation = {
      id: Date.now(),
      type: activeTool,
      x,
      y,
      content: activeTool === 'comment' ? "添加评论" : ""
    }
    
    setAnnotations([...annotations, newAnnotation])
  }

  // 处理保存评分
  const handleSaveGrade = () => {
    if (!selectedPaper || !currentScore) return
    
    const score = parseFloat(currentScore)
    if (isNaN(score) || score < 0 || score > 100) {
      alert("请输入0-100之间的有效分数")
      return
    }
    
    alert(`已保存分数：${score}分`)
  }

  return (
    <AppLayout>
      {/* 顶部导航栏 */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200">
        <div className="flex items-center justify-between p-4 border-b border-blue-200">
          <div className="flex items-center">
            <Link href="/" className="mr-3">
              <ArrowLeft className="h-6 w-6 text-blue-600" />
            </Link>
            <div>
              <h1 className="text-lg font-medium">阅卷助手</h1>
              <p className="text-sm text-gray-600 mt-1">快速批改试卷，记录成绩和评语</p>
            </div>
          </div>
        </div>
      </div>

      {/* 主体内容区域 */}
      <div className="p-4 bg-gray-50 min-h-screen">
        {activeView === 'list' ? (
          <div className="space-y-4">
            {/* 上传和搜索区域 */}
            <div className="flex justify-between items-center">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg"
                  placeholder="搜索试卷"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                上传试卷
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleUpload}
              />
            </div>

            {/* 试卷列表 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">试卷名称</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">上传时间</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">状态</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">分数</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {EXAM_PAPERS.map((paper) => (
                      <tr key={paper.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm">{paper.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-500">{paper.uploadTime}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            paper.status === 'completed' ? 'bg-green-100 text-green-800' :
                            paper.status === 'grading' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {paper.status === 'completed' ? '已完成' :
                             paper.status === 'grading' ? '批改中' : '待批改'}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm">
                            {paper.score ? `${paper.score}分` : '-'}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <button 
                            onClick={() => {
                              setSelectedPaper(paper);
                              setActiveView('detail');
                            }}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            {paper.status === 'completed' ? '查看' : '批改'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 返回按钮和试卷信息 */}
            <div className="flex justify-between items-center">
              <button 
                onClick={() => {
                  setActiveView('list');
                  setSelectedPaper(null);
                }}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                返回列表
              </button>
              <div className="text-sm text-gray-500">
                {selectedPaper?.name} - {selectedPaper?.uploadTime}
              </div>
            </div>

            {/* 试卷预览和批改区域 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* 试卷预览 */}
              <div className="md:col-span-3 bg-white rounded-lg shadow">
                <div 
                  ref={paperRef}
                  className="relative w-full min-h-[600px] cursor-crosshair"
                  onClick={handleAddAnnotation}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <FileText className="w-12 h-12 mx-auto mb-2" />
                      <div className="text-sm">试卷预览区域</div>
                    </div>
                  </div>

                  {/* 标注 */}
                  {annotations.map(annotation => (
                    <div 
                      key={annotation.id}
                      className={`absolute marker ${annotation.type}`}
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
              </div>

              {/* 批改工具栏 */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium mb-4">批改工具</h3>
                
                {/* 工具按钮 */}
                <div className="space-y-2 mb-6">
                  <button 
                    className={`w-full flex items-center px-3 py-2 text-sm border rounded-md ${
                      activeTool === 'correct' ? 'bg-green-50 border-green-200' : ''
                    }`}
                    onClick={() => setActiveTool(activeTool === 'correct' ? null : 'correct')}
                  >
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    <span>正确</span>
                  </button>
                  
                  <button 
                    className={`w-full flex items-center px-3 py-2 text-sm border rounded-md ${
                      activeTool === 'wrong' ? 'bg-red-50 border-red-200' : ''
                    }`}
                    onClick={() => setActiveTool(activeTool === 'wrong' ? null : 'wrong')}
                  >
                    <X className="w-4 h-4 mr-2 text-red-500" />
                    <span>错误</span>
                  </button>
                  
                  <button 
                    className={`w-full flex items-center px-3 py-2 text-sm border rounded-md ${
                      activeTool === 'comment' ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    onClick={() => setActiveTool(activeTool === 'comment' ? null : 'comment')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2 text-blue-500" />
                    <span>评论</span>
                  </button>
                </div>

                {/* 分数和评语 */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">分数</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                      placeholder="0-100"
                      value={currentScore}
                      onChange={(e) => setCurrentScore(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">评语</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                      rows={3}
                      placeholder="输入评语..."
                      value={currentComment}
                      onChange={(e) => setCurrentComment(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={handleSaveGrade}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                  >
                    保存评分
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
} 