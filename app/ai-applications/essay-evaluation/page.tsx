"use client"

import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"
import '../styles.css'
import './styles.css'
import ResponsiveLayout from '@/components/layout/ResponsiveLayout'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

// 定义评价角度类型
type EvaluationAspect = {
  id: string
  name: string
  description: string
  prompt: string
}

// 配置页面组件
function ConfigTab() {
  // 评价角度数据状态
  const [evaluationAspects, setEvaluationAspects] = useState<EvaluationAspect[]>([])
  const [loading, setLoading] = useState(true)
  // 选中的评价角度
  const [selectedAspect, setSelectedAspect] = useState<string>('comprehensive')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 获取评价角度数据
  useEffect(() => {
    fetch('/api/evaluation-aspects')
      .then(res => res.json())
      .then(data => {
        // 确保data是数组
        const aspectsArray = Array.isArray(data) ? data : []
        setEvaluationAspects(aspectsArray)
        if (aspectsArray.length > 0) {
          setSelectedAspect(aspectsArray[0].id)
        }
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching evaluation aspects:', error)
        setEvaluationAspects([])
        setLoading(false)
      })
  }, [])

  // 获取选中的提示词
  const getSelectedPrompt = () => {
    const aspect = evaluationAspects.find(a => a.id === selectedAspect)
    return aspect?.prompt || ''
  }

  // 处理文件拖放
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    handleFile(droppedFile)
  }, [])

  // 处理文件选择
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFile(selectedFile)
    }
  }, [])

  // 处理文件验证和预览
  const handleFile = useCallback((file: File) => {
    setError(null)
    
    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      setError('请上传图片文件')
      return
    }
    
    // 验证文件大小（最大10MB）
    if (file.size > 10 * 1024 * 1024) {
      setError('文件大小不能超过10MB')
      return
    }
    
    setFile(file)
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  // 移除文件
  const handleRemoveFile = useCallback(() => {
    setFile(null)
    setPreview(null)
    setError(null)
  }, [])

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* 上传作文区域 */}
      <div className="mb-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 ${
            error ? 'border-red-300 bg-red-50' : 'border-blue-200'
          } ${!file ? 'hover:border-blue-300 hover:bg-blue-50' : ''} transition-colors`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {!file ? (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                <Upload className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-base text-gray-600 mb-2">点击或拖拽上传作文图片</p>
              <p className="text-sm text-gray-400">支持jpg、png格式</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
              >
                选择文件
              </label>
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={handleRemoveFile}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={preview!}
                  alt="作文预览"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 评价角度 */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-1 h-5 bg-blue-500 rounded-sm mr-2"></div>
          <h2 className="text-lg font-bold">评价角度</h2>
        </div>
        <div className="space-y-3">
          {evaluationAspects.map(aspect => (
            <label
              key={aspect.id}
              className="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50"
            >
              <div className="relative w-5 h-5 mr-3">
                <input
                  type="radio"
                  name="evaluation_aspect"
                  value={aspect.id}
                  checked={selectedAspect === aspect.id}
                  onChange={(e) => setSelectedAspect(e.target.value)}
                  className="opacity-0 absolute w-full h-full cursor-pointer"
                />
                <div className={`border ${selectedAspect === aspect.id ? 'border-blue-500' : 'border-gray-300'} rounded-full w-full h-full flex items-center justify-center`}>
                  {selectedAspect === aspect.id && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-700">{aspect.name}</div>
                <div className="text-sm text-gray-500">{aspect.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* 补充信息 */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-1 h-5 bg-blue-500 rounded-sm mr-2"></div>
          <h2 className="text-lg font-bold">补充信息</h2>
        </div>
        <textarea
          className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[120px] text-sm"
          placeholder="请输入..."
        ></textarea>
      </div>

      {/* 按钮区域 */}
      <div className="flex justify-center mt-6">
        <button 
          className={`w-full max-w-md p-3 rounded-lg text-base font-medium transition-colors ${
            file ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          onClick={() => {
            if (!file) return
            const prompt = getSelectedPrompt()
            console.log('Selected prompt:', prompt)
            // TODO: 处理文件上传和评价请求
          }}
          disabled={!file}
        >
          开始评价
        </button>
      </div>
    </div>
  )
}

// 预览页面组件
function PreviewTab() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-center h-[200px] text-gray-400">
        评价结果将在这里显示
      </div>
    </div>
  )
}

export default function EssayEvaluation() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>返回首页</span>
        </Link>
        <h1 className="text-2xl font-bold mt-4">语文作文评价</h1>
      </div>
      
      <ResponsiveLayout
        configPanel={<ConfigTab />}
        previewPanel={<PreviewTab />}
        configTitle="配置"
        previewTitle="预览"
      />
    </div>
  )
} 