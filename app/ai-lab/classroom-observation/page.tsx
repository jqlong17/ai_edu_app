"use client"

import { AppLayout } from "@/components/layout"
import { Video, ArrowLeft, Upload, Play, Pause, BarChart, FileText, Clock, MessageCircle, Users, Lightbulb, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"

// 模拟测试视频数据
const testVideo = {
  url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  name: "测试课堂视频.mp4",
  size: 15.7 // MB
}

export default function ClassroomObservation() {
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(new File([], testVideo.name))
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(100)
  const [analysisComplete, setAnalysisComplete] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(["basicStats", "qaAnalysis", "lessonPhases", "teachingSuggestions"])
  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // 模拟分析结果数据
  const analysisResults = {
    basicStats: {
      teacherTalkTime: 68, // 百分比
      studentEngagement: 72, // 百分比
      questionCount: 14,
      interactionPoints: 23
    },
    
    // 师生问答总结
    qaAnalysis: {
      totalQuestions: 14,
      questionTypes: [
        { type: "知识回顾", count: 3 },
        { type: "概念理解", count: 5 },
        { type: "应用分析", count: 4 },
        { type: "开放讨论", count: 2 }
      ],
      studentResponses: {
        activeParticipants: 18, // 参与回答的学生数
        averageResponseTime: 8.5, // 秒
        responseQuality: 76 // 百分比
      },
      questionDistribution: [
        { time: "0-10分钟", count: 2 },
        { time: "11-20分钟", count: 5 },
        { time: "21-30分钟", count: 4 },
        { time: "31-40分钟", count: 3 }
      ]
    },
    
    // 课堂环节分析
    lessonPhases: [
      {
        phase: "课前准备",
        duration: "0-3分钟",
        activities: ["组织纪律", "复习前置知识"],
        evaluation: "高效完成",
        suggestion: "可以增加简短的课程目标介绍"
      },
      {
        phase: "新知识讲解",
        duration: "4-20分钟",
        activities: ["概念引入", "示例讲解", "互动提问"],
        evaluation: "节奏适中，学生参与度高",
        suggestion: "建议增加更多生活化的例子"
      },
      {
        phase: "练习与巩固",
        duration: "21-35分钟",
        activities: ["个人练习", "小组讨论", "难点解答"],
        evaluation: "时间分配合理",
        suggestion: "可以增加分层练习"
      },
      {
        phase: "总结与反馈",
        duration: "36-40分钟",
        activities: ["知识总结", "布置作业"],
        evaluation: "略显仓促",
        suggestion: "建议预留更多时间进行总结"
      }
    ],
    
    // 教学建议
    teachingSuggestions: [
      {
        aspect: "提问策略",
        strength: "问题层次分明，能够照顾到不同层次的学生",
        improvement: "可以增加追问环节，深化学生思考",
        actionItems: [
          "设计系列递进式问题",
          "给予学生更多思考时间",
          "鼓励学生之间的互相补充"
        ]
      },
      {
        aspect: "互动方式",
        strength: "课堂气氛活跃，学生参与度高",
        improvement: "部分学生参与度不够均衡",
        actionItems: [
          "采用随机提问与点名相结合的方式",
          "设计需要全员参与的互动环节",
          "对安静的学生给予更多关注和鼓励"
        ]
      },
      {
        aspect: "时间管理",
        strength: "整体节奏把控得当",
        improvement: "个别环节时间控制欠佳",
        actionItems: [
          "制定更详细的教学环节时间规划",
          "设置课堂计时器",
          "为重点难点预留缓冲时间"
        ]
      },
      {
        aspect: "板书设计",
        strength: "结构清晰，层次分明",
        improvement: "可以增加图示的使用",
        actionItems: [
          "增加思维导图等可视化工具",
          "使用不同颜色突出重点内容",
          "设计学生参与的互动板书环节"
        ]
      }
    ]
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setUploadedVideo(files[0])
      setAnalysisComplete(false)
      setAnalysisProgress(0)
    }
  }
  
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }
  
  const handleUseTestVideo = () => {
    setUploadedVideo(new File([], testVideo.name))
    setAnalysisComplete(false)
    setAnalysisProgress(0)
  }
  
  const handleAnalyzeVideo = () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    
    // 模拟分析进度
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setAnalysisComplete(true)
          return 100
        }
        return prev + 2
      })
    }, 200)
  }
  
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }
  
  const isSectionExpanded = (section: string) => expandedSections.includes(section)
  
  return (
    <AppLayout>
      {/* 顶部渐变区域 */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-5 pb-6">
        <div className="flex items-center mb-2">
          <Link href="/ai-lab" className="mr-2 text-indigo-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <Video className="h-6 w-6 mr-2 text-indigo-600" />
          <h1 className="text-2xl font-bold md:text-3xl">课堂观察</h1>
        </div>
        <p className="text-sm text-gray-600 md:text-base">
          基于AI的课堂视频分析，提供教学改进建议
        </p>
      </div>
      
      <div className="p-4 md:p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* 功能介绍 */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <h2 className="text-lg font-medium mb-4">什么是AI课堂观察？</h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              AI课堂观察是一个智能教学分析工具，通过对课堂视频的深度分析，帮助教师更好地理解和改进教学实践。
              它能够自动识别课堂中的关键环节，分析师生互动模式，并提供个性化的教学建议。
            </p>
            
            <h3 className="font-medium mb-3 text-gray-700">主要功能</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">教学行为分析</h4>
                  <p className="mt-1 text-sm text-gray-500">自动识别教师讲解、提问、互动等教学行为，计算各类行为的时间占比</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">学生参与度评估</h4>
                  <p className="mt-1 text-sm text-gray-500">通过AI视觉分析，评估学生的注意力集中度和课堂参与情况</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">课堂环节分析</h4>
                  <p className="mt-1 text-sm text-gray-500">识别课堂各个环节的时间分配，评估教学节奏的合理性</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">个性化教学建议</h4>
                  <p className="mt-1 text-sm text-gray-500">基于分析结果，提供针对性的教学改进建议和具体的行动方案</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 上传区域 */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <h2 className="text-lg font-medium mb-4">上传课堂视频</h2>
            
            <input 
              type="file" 
              accept="video/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            
            {!uploadedVideo ? (
              <div>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors mb-4"
                  onClick={handleUploadClick}
                >
                  <Upload className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-500 mb-1">点击或拖拽文件到此处上传</p>
                  <p className="text-xs text-gray-400">支持MP4、MOV、AVI格式，最大文件大小500MB</p>
                </div>
                
                <div className="text-center">
                  <span className="text-gray-400 mx-2">或</span>
                  <button
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                    onClick={handleUseTestVideo}
                  >
                    使用测试视频
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="relative rounded-lg overflow-hidden mb-4 bg-gray-100">
                  <video 
                    ref={videoRef}
                    className="w-full h-auto"
                    src={uploadedVideo.name === testVideo.name ? testVideo.url : URL.createObjectURL(uploadedVideo)}
                    onEnded={() => setIsPlaying(false)}
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 rounded-full p-2 cursor-pointer" onClick={togglePlayPause}>
                    {isPlaying ? (
                      <Pause className="h-6 w-6 text-white" />
                    ) : (
                      <Play className="h-6 w-6 text-white" />
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{uploadedVideo.name}</p>
                    <p className="text-sm text-gray-500">
                      {uploadedVideo.name === testVideo.name ? testVideo.size : (uploadedVideo.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
                      onClick={handleUploadClick}
                    >
                      更换视频
                    </button>
                    
                    <button
                      className={`px-4 py-1.5 rounded-lg text-sm ${
                        isAnalyzing 
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                      onClick={handleAnalyzeVideo}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? "分析中..." : "开始分析"}
                    </button>
                  </div>
                </div>
                
                {/* 分析进度条 */}
                {isAnalyzing && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>正在分析视频内容...</span>
                      <span>{analysisProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-200" 
                        style={{ width: `${analysisProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* 分析结果 */}
          {analysisComplete && (
            <div className="space-y-6">
              {/* 基础统计 */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-lg font-medium mb-4">课堂数据概览</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-indigo-600 mr-2" />
                      <h3 className="font-medium">教师讲解时间</h3>
                    </div>
                    <div className="flex items-end">
                      <span className="text-3xl font-bold text-indigo-600">{analysisResults.basicStats.teacherTalkTime}%</span>
                      <span className="text-sm text-gray-500 ml-2 mb-1">的课堂时间</span>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Users className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-medium">学生参与度</h3>
                    </div>
                    <div className="flex items-end">
                      <span className="text-3xl font-bold text-green-600">{analysisResults.basicStats.studentEngagement}%</span>
                      <span className="text-sm text-gray-500 ml-2 mb-1">的注意力集中</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 师生问答分析 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div 
                  className="px-5 py-4 border-b border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleSection('qa')}
                >
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 text-indigo-600 mr-2" />
                    <h2 className="font-medium">师生问答分析</h2>
                  </div>
                  {isSectionExpanded('qa') ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                
                {isSectionExpanded('qa') && (
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* 问题类型分布 */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">问题类型分布</h3>
                        <div className="space-y-2">
                          {analysisResults.qaAnalysis.questionTypes.map(type => (
                            <div key={type.type} className="flex items-center">
                              <div className="w-32 text-sm text-gray-600">{type.type}</div>
                              <div className="flex-1">
                                <div className="h-4 bg-indigo-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-indigo-600 rounded-full"
                                    style={{ width: `${(type.count / analysisResults.qaAnalysis.totalQuestions) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="w-12 text-right text-sm text-gray-600">{type.count}次</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* 学生回答情况 */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">学生回答情况</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>参与回答学生</span>
                              <span>{analysisResults.qaAnalysis.studentResponses.activeParticipants}人</span>
                            </div>
                            <div className="h-2 bg-green-100 rounded-full">
                              <div 
                                className="h-full bg-green-600 rounded-full"
                                style={{ width: "60%" }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>平均回答时间</span>
                              <span>{analysisResults.qaAnalysis.studentResponses.averageResponseTime}秒</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>回答质量评分</span>
                              <span>{analysisResults.qaAnalysis.studentResponses.responseQuality}分</span>
                            </div>
                            <div className="h-2 bg-blue-100 rounded-full">
                              <div 
                                className="h-full bg-blue-600 rounded-full"
                                style={{ width: `${analysisResults.qaAnalysis.studentResponses.responseQuality}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 问题时间分布 */}
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">问题时间分布</h3>
                      <div className="flex items-end space-x-4 h-32">
                        {analysisResults.qaAnalysis.questionDistribution.map((item, index) => (
                          <div key={item.time} className="flex-1 flex flex-col items-center">
                            <div className="flex-1 w-full flex items-end">
                              <div 
                                className="w-full bg-indigo-100 rounded-t"
                                style={{ height: `${(item.count / Math.max(...analysisResults.qaAnalysis.questionDistribution.map(d => d.count))) * 100}%` }}
                              >
                                <div className="text-center text-xs text-indigo-600 py-1">{item.count}</div>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">{item.time}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 课堂环节分析 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div 
                  className="px-5 py-4 border-b border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleSection('phases')}
                >
                  <div className="flex items-center">
                    <BarChart className="h-5 w-5 text-indigo-600 mr-2" />
                    <h2 className="font-medium">课堂环节分析</h2>
                  </div>
                  {isSectionExpanded('phases') ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                
                {isSectionExpanded('phases') && (
                  <div className="p-5">
                    <div className="space-y-6">
                      {analysisResults.lessonPhases.map((phase, index) => (
                        <div key={phase.phase} className="relative pl-8">
                          {/* 时间轴 */}
                          <div className="absolute left-0 top-0 bottom-0 w-6 flex items-center justify-center">
                            <div className="h-full w-0.5 bg-gray-200"></div>
                            <div className="absolute w-4 h-4 rounded-full bg-indigo-600 border-2 border-white shadow"></div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium">{phase.phase}</h3>
                              <span className="text-sm text-gray-500">{phase.duration}</span>
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="space-y-3">
                                <div>
                                  <div className="text-sm font-medium text-gray-700 mb-1">主要活动</div>
                                  <div className="flex flex-wrap gap-2">
                                    {phase.activities.map(activity => (
                                      <span key={activity} className="px-2 py-1 bg-white rounded text-sm text-gray-600">
                                        {activity}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="text-sm font-medium text-gray-700 mb-1">评价</div>
                                  <p className="text-sm text-gray-600">{phase.evaluation}</p>
                                </div>
                                
                                <div>
                                  <div className="text-sm font-medium text-gray-700 mb-1">建议</div>
                                  <p className="text-sm text-gray-600">{phase.suggestion}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* 教学建议 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div 
                  className="px-5 py-4 border-b border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleSection('suggestions')}
                >
                  <div className="flex items-center">
                    <Lightbulb className="h-5 w-5 text-indigo-600 mr-2" />
                    <h2 className="font-medium">教学建议</h2>
                  </div>
                  {isSectionExpanded('suggestions') ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                
                {isSectionExpanded('suggestions') && (
                  <div className="p-5">
                    <div className="grid gap-6 md:grid-cols-2">
                      {analysisResults.teachingSuggestions.map(suggestion => (
                        <div key={suggestion.aspect} className="bg-gray-50 rounded-lg p-4">
                          <h3 className="font-medium mb-3">{suggestion.aspect}</h3>
                          
                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center text-green-600 mb-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-600 mr-2"></div>
                                <div className="text-sm font-medium">优点</div>
                              </div>
                              <p className="text-sm text-gray-600 pl-3.5">{suggestion.strength}</p>
                            </div>
                            
                            <div>
                              <div className="flex items-center text-orange-600 mb-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mr-2"></div>
                                <div className="text-sm font-medium">改进空间</div>
                              </div>
                              <p className="text-sm text-gray-600 pl-3.5">{suggestion.improvement}</p>
                            </div>
                            
                            <div>
                              <div className="flex items-center text-indigo-600 mb-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-2"></div>
                                <div className="text-sm font-medium">行动建议</div>
                              </div>
                              <ul className="text-sm text-gray-600 pl-3.5 space-y-1">
                                {suggestion.actionItems.map((item, index) => (
                                  <li key={index} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
} 