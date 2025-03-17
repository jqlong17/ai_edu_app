"use client"

import { useState, useCallback } from "react"
import { useTeachingPlan } from '../utils/teaching-plan-store'
import { Loader2 } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// 预览页面组件
export default function PreviewTab() {
  console.log("PreviewTab 渲染");
  
  // 使用教学方案状态
  const { 
    input, 
    result, 
    isLoading, 
    isGenerated, 
    setIsGenerated,
    reset
  } = useTeachingPlan();

  // 处理返回修改 - 使用useCallback优化
  const handleBackToEdit = useCallback(() => {
    console.log("返回修改");
    setIsGenerated(false);
  }, [setIsGenerated]);

  // 处理确认生成 - 使用useCallback优化
  const handleConfirm = useCallback(() => {
    console.log("确认生成");
    // 这里可以添加保存或导出功能
    alert('教学方案已确认生成！');
  }, []);

  // 如果正在加载，显示加载状态
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin h-10 w-10 text-blue-500 mb-4" />
        <p className="text-gray-600">正在生成教学方案，请稍候...</p>
      </div>
    );
  }

  // 如果未生成，显示空状态
  if (!isGenerated || !result) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center text-gray-500">
          <p className="mb-2">请在左侧完成配置后点击"生成教学方案"</p>
          <p>生成的教学方案将在此处显示</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold mb-6 text-center">
          {input.grade === '' ? '' : `${input.grade}年级`}
          {input.semester === 1 ? '上学期' : '下学期'}
          {input.subject}教学设计
        </h1>
        
        <div className="border-t border-b py-4 space-y-3">
          <div className="flex">
            <div className="w-24 text-gray-500">所教年级：</div>
            <div>{input.grade === '' ? '未指定' : `${input.grade}年级`}</div>
          </div>
          <div className="flex">
            <div className="w-24 text-gray-500">学期：</div>
            <div>{input.semester === 1 ? '上学期' : '下学期'}</div>
          </div>
          <div className="flex">
            <div className="w-24 text-gray-500">所教学科：</div>
            <div>{input.subject}</div>
          </div>
          <div className="flex">
            <div className="w-24 text-gray-500">教材版本：</div>
            <div>{input.textbookVersion}</div>
          </div>
          <div className="flex">
            <div className="w-24 text-gray-500">教学内容：</div>
            <div>
              {input.selectedContent.map((item, index) => (
                <div key={index} className="mb-1">
                  {item.chapter} - {item.section}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 直接显示Dify返回的完整内容 */}
      <div className="mb-6">
        <div className="prose prose-lg max-w-none prose-headings:mt-6 prose-headings:mb-4 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:my-4 prose-p:leading-7 prose-li:my-2 prose-li:leading-7">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              // 自定义标题样式
              h1: ({node, ...props}) => (
                <h1 className="text-3xl font-bold border-b pb-2 mb-6" {...props} />
              ),
              h2: ({node, ...props}) => (
                <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />
              ),
              h3: ({node, ...props}) => (
                <h3 className="text-xl font-bold mt-6 mb-3" {...props} />
              ),
              // 自定义段落样式
              p: ({node, ...props}) => (
                <p className="text-gray-700 leading-7 my-4" {...props} />
              ),
              // 自定义列表样式
              ul: ({node, ...props}) => (
                <ul className="list-disc list-inside space-y-2 my-4" {...props} />
              ),
              ol: ({node, ...props}) => (
                <ol className="list-decimal list-inside space-y-2 my-4" {...props} />
              ),
              li: ({node, ...props}) => (
                <li className="text-gray-700 leading-7" {...props} />
              ),
              // 自定义强调样式
              strong: ({node, ...props}) => (
                <strong className="font-bold text-gray-900" {...props} />
              ),
              em: ({node, ...props}) => (
                <em className="text-gray-800 italic" {...props} />
              ),
              // 自定义引用样式
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-gray-200 pl-4 my-4 italic text-gray-700" {...props} />
              ),
              // 自定义代码样式
              code: ({children, className, ...props}: React.HTMLProps<HTMLElement>) => {
                const match = /language-(\w+)/.exec(className || '');
                return (
                  <code 
                    className={`${match ? 'bg-gray-100' : ''} rounded px-1 py-0.5 text-sm font-mono text-gray-800 ${className || ''}`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              // 自定义分隔线样式
              hr: ({node, ...props}) => (
                <hr className="my-8 border-t border-gray-200" {...props} />
              )
            }}
          >
            {result.rawAnswer}
          </ReactMarkdown>
        </div>
      </div>
      
      {/* 按钮区域 */}
      <div className="flex justify-center mt-8 space-x-4">
        <button 
          className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
          onClick={handleBackToEdit}
        >
          返回修改
        </button>
        <button 
          className="px-8 py-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          onClick={handleConfirm}
        >
          确认生成
        </button>
      </div>
    </div>
  );
} 