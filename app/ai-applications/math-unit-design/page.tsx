"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import dynamic from 'next/dynamic'
import '../styles.css'
import ResponsiveLayout from '@/components/layout/ResponsiveLayout'

// 创建一个无SSR的配置组件
const ConfigTabNoSSR = dynamic(() => import('./components/ConfigTab'), { 
  ssr: false,
  loading: () => (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-6">加载中...</h2>
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
})

// 创建一个无SSR的预览组件
const PreviewTabNoSSR = dynamic(() => import('./components/PreviewTab'), { 
  ssr: false,
  loading: () => (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-6">加载中...</h2>
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
})

// 主页面组件
export default function MathUnitDesign() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>返回首页</span>
        </Link>
        <h1 className="text-2xl font-bold mt-4">数学单元教学设计</h1>
      </div>
      
      <ResponsiveLayout
        configPanel={<ConfigTabNoSSR />}
        previewPanel={<PreviewTabNoSSR />}
        configTitle="配置"
        previewTitle="预览"
      />
    </div>
  );
} 