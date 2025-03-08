"use client"

import { useState } from "react"

// 预览页面组件
export default function PreviewTab() {
  // 模拟已配置的数据
  const configData = {
    grade: "七年级",
    semester: "下学期",
    subject: "数学",
    textbookVersion: "人教版",
    content: [
      {
        chapter: "第五章 相交线与平行线",
        section: "5.1 相交线"
      },
      {
        chapter: "第五章 相交线与平行线", 
        section: "5.2 平行线"
      }
    ]
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold mb-6 text-center">
          {configData.grade}{configData.semester}{configData.subject}教学设计
        </h1>
        
        <div className="border-t border-b py-4 space-y-3">
          <div className="flex">
            <div className="w-24 text-gray-500">所教年级：</div>
            <div>{configData.grade}</div>
          </div>
          <div className="flex">
            <div className="w-24 text-gray-500">学期：</div>
            <div>{configData.semester}</div>
          </div>
          <div className="flex">
            <div className="w-24 text-gray-500">所教学科：</div>
            <div>{configData.subject}</div>
          </div>
          <div className="flex">
            <div className="w-24 text-gray-500">教材版本：</div>
            <div>{configData.textbookVersion}</div>
          </div>
          <div className="flex">
            <div className="w-24 text-gray-500">教学内容：</div>
            <div>
              {configData.content.map((item, index) => (
                <div key={index} className="mb-1">
                  {item.chapter} - {item.section}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 示例内容预览 */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-1 h-5 bg-blue-500 rounded-sm mr-2"></div>
          <h2 className="text-lg font-bold">教学目标</h2>
        </div>
        
        <div className="pl-4 space-y-2 text-sm">
          <p>1. 理解相交线的概念及其性质</p>
          <p>2. 掌握平行线的判定方法和性质</p>
          <p>3. 能够运用相交线与平行线的知识解决简单的几何问题</p>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-1 h-5 bg-blue-500 rounded-sm mr-2"></div>
          <h2 className="text-lg font-bold">教学重难点</h2>
        </div>
        
        <div className="pl-4 space-y-2 text-sm">
          <div>
            <p className="font-medium">重点：</p>
            <p>1. 理解相交线的概念</p>
            <p>2. 掌握平行线的判定方法</p>
          </div>
          <div>
            <p className="font-medium">难点：</p>
            <p>1. 运用平行线的性质解决问题</p>
            <p>2. 正确使用数学语言表达几何关系</p>
          </div>
        </div>
      </div>
      
      {/* 按钮区域 */}
      <div className="flex justify-center mt-8 space-x-4">
        <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors">
          返回修改
        </button>
        <button className="px-8 py-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
          确认生成
        </button>
      </div>
    </div>
  );
} 