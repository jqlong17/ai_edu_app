"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import '../styles.css'
import ResponsiveLayout from '@/components/layout/ResponsiveLayout'
import { TeachingPlanProvider } from './utils/teaching-plan-store'
import ConfigTab from './components/ConfigTab'
import PreviewTab from './components/PreviewTab'

// 主页面组件
export default function MathUnitDesign() {
  return (
    <TeachingPlanProvider>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>返回首页</span>
          </Link>
          <h1 className="text-2xl font-bold mt-4">数学单元教学设计</h1>
        </div>
        
        <ResponsiveLayout
          configPanel={<ConfigTab />}
          previewPanel={<PreviewTab />}
          configTitle="配置"
          previewTitle="预览"
        />
      </div>
    </TeachingPlanProvider>
  );
} 