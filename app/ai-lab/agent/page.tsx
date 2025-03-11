"use client"

import { AppLayout } from "@/components/layout"
import { Bot, ArrowLeft, Plus, Clock, CheckCircle, AlertCircle, RefreshCw, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// 任务类型
type Task = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "running" | "completed" | "failed";
  progress: number;
  createdAt: string;
  completedAt?: string;
  result?: string;
  error?: string;
}

export default function AgentAssistant() {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskDescription, setNewTaskDescription] = useState("")
  const [selectedTaskType, setSelectedTaskType] = useState("grading")
  
  // 模拟任务数据
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      title: "批改七年级数学作业",
      description: "批改35份学生作业并生成分析报告",
      status: "completed",
      progress: 100,
      createdAt: "2023-06-15 14:30",
      completedAt: "2023-06-15 14:45",
      result: "已完成35份作业批改，平均分83.5分，详细分析已生成"
    },
    {
      id: "task-2",
      title: "生成期中考试试卷",
      description: "根据教学大纲生成数学期中考试试卷",
      status: "running",
      progress: 65,
      createdAt: "2023-06-16 09:15"
    },
    {
      id: "task-3",
      title: "整理教学资料",
      description: "整理本学期教学资料并分类归档",
      status: "pending",
      progress: 0,
      createdAt: "2023-06-16 10:30"
    },
    {
      id: "task-4",
      title: "学生成绩分析",
      description: "分析上次测验的学生成绩并生成报告",
      status: "failed",
      progress: 30,
      createdAt: "2023-06-14 16:20",
      completedAt: "2023-06-14 16:25",
      error: "数据格式不兼容，请检查上传的成绩单格式"
    }
  ])
  
  // 任务类型选项
  const taskTypes = [
    { id: "grading", name: "作业批改", description: "自动批改学生作业并提供反馈" },
    { id: "exam", name: "试卷生成", description: "根据教学大纲和难度要求生成试卷" },
    { id: "organize", name: "资料整理", description: "整理教学资料并按主题分类" },
    { id: "analysis", name: "数据分析", description: "分析学生成绩和学习情况" }
  ]
  
  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) return
    
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      description: newTaskDescription || `执行${newTaskTitle}任务`,
      status: "pending",
      progress: 0,
      createdAt: new Date().toLocaleString('zh-CN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    setTasks([newTask, ...tasks])
    setNewTaskTitle("")
    setNewTaskDescription("")
    setShowNewTaskForm(false)
    
    // 模拟任务开始执行
    setTimeout(() => {
      setTasks(prev => prev.map(task => 
        task.id === newTask.id ? { ...task, status: "running" as const } : task
      ))
      
      // 模拟任务进度更新
      const progressInterval = setInterval(() => {
        setTasks(prev => {
          const updatedTasks = prev.map(task => {
            if (task.id === newTask.id && task.status === "running") {
              const newProgress = task.progress + 10
              
              if (newProgress >= 100) {
                clearInterval(progressInterval)
                return { 
                  ...task, 
                  progress: 100, 
                  status: "completed" as const,
                  completedAt: new Date().toLocaleString('zh-CN', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  }),
                  result: `已完成"${task.title}"任务，结果已生成`
                }
              }
              
              return { ...task, progress: newProgress }
            }
            return task
          })
          return updatedTasks
        })
      }, 1000)
    }, 1500)
  }
  
  const getStatusBadge = (status: Task["status"]) => {
    switch(status) {
      case "pending":
        return <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs flex items-center"><Clock className="h-3 w-3 mr-1" /> 等待中</span>
      case "running":
        return <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs flex items-center"><RefreshCw className="h-3 w-3 mr-1 animate-spin" /> 执行中</span>
      case "completed":
        return <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs flex items-center"><CheckCircle className="h-3 w-3 mr-1" /> 已完成</span>
      case "failed":
        return <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs flex items-center"><AlertCircle className="h-3 w-3 mr-1" /> 失败</span>
    }
  }
  
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }
  
  return (
    <AppLayout>
      {/* 顶部渐变区域 */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-5 pb-6">
        <div className="flex items-center mb-2">
          <Link href="/ai-lab" className="mr-2 text-indigo-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <Bot className="h-6 w-6 mr-2 text-indigo-600" />
          <h1 className="text-2xl font-bold md:text-3xl">Agent助手</h1>
        </div>
        <p className="text-sm text-gray-600 md:text-base">
          自动执行耗时任务，提高工作效率
        </p>
      </div>
      
      <div className="p-4 md:p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Agent介绍模块 */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <h2 className="text-lg font-medium mb-4">什么是Agent助手？</h2>
            <p className="text-sm text-gray-600 mb-4">
              Agent助手是一个智能代理系统，它能够自主执行复杂的任务序列，并根据任务进展做出智能决策。就像您的私人助理一样，它可以在后台持续工作，处理各种耗时的教学相关任务。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">自主决策</h3>
                <p className="text-sm text-gray-600">
                  根据任务目标和上下文，自动规划执行步骤，并在遇到问题时做出调整，无需人工干预。
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">持续执行</h3>
                <p className="text-sm text-gray-600">
                  可以在后台长期运行，处理批量任务，如批改作业、整理资料、生成报告等，大幅提升工作效率。
                </p>
              </div>
            </div>
          </div>

          {/* 创建新任务按钮 */}
          {!showNewTaskForm ? (
            <button 
              className="flex items-center justify-center w-full bg-white border border-dashed border-indigo-300 text-indigo-600 rounded-xl p-4 mb-6 hover:bg-indigo-50 transition-colors"
              onClick={() => setShowNewTaskForm(true)}
            >
              <Plus className="h-5 w-5 mr-2" />
              <span>创建新任务</span>
            </button>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
              <h2 className="text-lg font-medium mb-4">创建新任务</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">任务类型</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {taskTypes.map(type => (
                    <div 
                      key={type.id}
                      className={`border rounded-lg p-3 cursor-pointer ${
                        selectedTaskType === type.id 
                          ? "border-indigo-500 bg-indigo-50" 
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                      onClick={() => setSelectedTaskType(type.id)}
                    >
                      <div className="font-medium">{type.name}</div>
                      <div className="text-sm text-gray-500">{type.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-1">任务名称</label>
                <input
                  id="taskTitle"
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="输入任务名称"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-1">任务描述 (可选)</label>
                <textarea
                  id="taskDescription"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="输入任务详细描述"
                  rows={3}
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowNewTaskForm(false)}
                >
                  取消
                </button>
                <button 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300"
                  onClick={handleCreateTask}
                  disabled={!newTaskTitle.trim()}
                >
                  创建任务
                </button>
              </div>
            </div>
          )}
          
          {/* 任务列表 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-medium">任务列表</h2>
            </div>
            
            {tasks.length === 0 ? (
              <div className="p-5 text-center text-gray-500">
                暂无任务，点击上方按钮创建新任务
              </div>
            ) : (
              <div>
                {tasks.map((task) => (
                  <div key={task.id} className="border-b border-gray-100 last:border-b-0">
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-gray-500">{task.description}</p>
                        </div>
                        {getStatusBadge(task.status)}
                      </div>
                      
                      {task.status === "running" && (
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-indigo-600 h-2.5 rounded-full" 
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 text-right">{task.progress}%</div>
                        </div>
                      )}
                      
                      {task.status === "completed" && task.result && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg text-sm text-gray-700">
                          {task.result}
                        </div>
                      )}
                      
                      {task.status === "failed" && task.error && (
                        <div className="mt-3 p-3 bg-red-50 rounded-lg text-sm text-gray-700">
                          错误: {task.error}
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                        <div>创建时间: {task.createdAt}</div>
                        {task.completedAt && <div>完成时间: {task.completedAt}</div>}
                        <button 
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => deleteTask(task.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
} 