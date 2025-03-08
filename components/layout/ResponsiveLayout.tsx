"use client"

import { useState, useEffect, ReactNode } from "react"

interface ResponsiveLayoutProps {
  configPanel: ReactNode;
  previewPanel: ReactNode;
  configTitle?: string;
  previewTitle?: string;
  breakpoint?: number;
}

/**
 * 响应式布局组件
 * 在移动端显示为Tab切换,在Web端显示为左右布局
 */
export default function ResponsiveLayout({
  configPanel,
  previewPanel,
  configTitle = "配置",
  previewTitle = "预览",
  breakpoint = 1024
}: ResponsiveLayoutProps) {
  const [activeTab, setActiveTab] = useState<'config' | 'preview'>('config');
  const [isMobile, setIsMobile] = useState(false);

  // 检测设备类型
  useEffect(() => {
    const checkIsMobile = () => {
      const newIsMobile = window.innerWidth < breakpoint;
      setIsMobile(newIsMobile);
      console.log(`Window width: ${window.innerWidth}, breakpoint: ${breakpoint}, isMobile: ${newIsMobile}`);
    };
    
    // 初始检测
    checkIsMobile();
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkIsMobile);
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [breakpoint]);

  console.log(`Rendering ResponsiveLayout, isMobile: ${isMobile}, activeTab: ${activeTab}`);

  return (
    <div className="responsive-layout-container">
      {isMobile ? (
        // 移动端布局 - Tab切换
        <>
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="flex border-b">
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'config'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('config')}
              >
                {configTitle}
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'preview'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('preview')}
              >
                {previewTitle}
              </button>
            </div>
          </div>
          
          {activeTab === 'config' ? configPanel : previewPanel}
        </>
      ) : (
        // Web端布局 - 左右并排
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
              <h2 className="text-lg font-medium text-gray-700">{configTitle}</h2>
            </div>
            {configPanel}
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
              <h2 className="text-lg font-medium text-gray-700">{previewTitle}</h2>
            </div>
            {previewPanel}
          </div>
        </div>
      )}
    </div>
  );
} 