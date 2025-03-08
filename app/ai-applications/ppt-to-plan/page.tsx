"use client"

import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"
import '../styles.css'
import './styles.css'
import ResponsiveLayout from '@/components/layout/ResponsiveLayout'
import { useState, useCallback } from 'react'

// 配置页面组件
function ConfigTab() {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [additionalInfo, setAdditionalInfo] = useState('')

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

  // 处理文件验证
  const handleFile = useCallback((file: File) => {
    setError(null)
    
    // 验证文件类型
    const validTypes = [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ]
    if (!validTypes.includes(file.type)) {
      setError('请上传PPT文件（.ppt或.pptx格式）')
      return
    }
    
    // 验证文件大小（最大20MB）
    if (file.size > 20 * 1024 * 1024) {
      setError('文件大小不能超过20MB')
      return
    }
    
    setFile(file)
  }, [])

  // 移除文件
  const handleRemoveFile = useCallback(() => {
    setFile(null)
    setError(null)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* 上传PPT区域 */}
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
              <p className="text-base text-gray-600 mb-2">点击或拖拽上传PPT文件</p>
              <p className="text-sm text-gray-400">支持ppt、pptx格式</p>
              <input
                type="file"
                accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
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
            <div className="relative p-4 bg-gray-50 rounded-lg">
              <button
                onClick={handleRemoveFile}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Upload className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 教案要求 */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-1 h-5 bg-blue-500 rounded-sm mr-2"></div>
          <h2 className="text-lg font-bold">教案要求</h2>
        </div>
        <textarea
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[120px] text-sm"
          placeholder="请输入教案的具体要求，例如：&#13;&#10;1. 教案格式要求&#13;&#10;2. 重点关注的教学环节&#13;&#10;3. 特殊的教学要求"
        />
      </div>

      {/* 按钮区域 */}
      <div className="flex justify-center mt-6">
        <button 
          className={`w-full max-w-md p-3 rounded-lg text-base font-medium transition-colors ${
            file ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          onClick={() => {
            if (!file) return
            // TODO: 处理文件上传和转换请求
            console.log('File:', file)
            console.log('Additional Info:', additionalInfo)
          }}
          disabled={!file}
        >
          开始转换
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
        转换结果将在这里显示
      </div>
    </div>
  )
}

export default function PptToPlan() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>返回首页</span>
        </Link>
        <h1 className="text-2xl font-bold mt-4">PPT转教案</h1>
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