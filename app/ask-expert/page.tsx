"use client"

import { ExpertCard } from "@/components/expert-card"
import { AppLayout } from "@/components/layout"
import { Users, Mail } from "lucide-react"

// 模拟专家数据
const experts = [
  {
    id: "1",
    name: "章老师",
    title: "数学教育专家",
    description: "从事数学教育20年，专注于数学思维培养和解题方法创新，善于化繁为简",
    specialties: ["数学思维", "解题技巧", "教学设计"],
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=math",
  },
  {
    id: "2",
    name: "朱老师",
    title: "德育专家",
    description: "致力于学生品德教育和心理健康指导，擅长处理学生成长过程中的各类问题",
    specialties: ["品德教育", "心理辅导", "班级管理"],
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=moral",
  },
  {
    id: "3",
    name: "韩老师",
    title: "英语教育专家",
    description: "具有丰富的英语教学经验，专注于英语学习方法研究和跨文化交际能力培养",
    specialties: ["英语教学", "口语训练", "考试辅导"],
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=english",
  },
  {
    id: "4",
    name: "李老师",
    title: "物理教育专家",
    description: "物理教育专家，擅长物理实验设计和科学思维培养，让物理学习更加生动有趣",
    specialties: ["物理实验", "概念讲解", "题目分析"],
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=physics",
  },
  // 可以添加更多专家...
]

export default function AskExpert() {
  return (
    <AppLayout>
      {/* 顶部蓝色渐变区域 */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-5 pb-6">
        <div className="flex items-center mb-2">
          <Users className="h-6 w-6 mr-2 text-blue-600" />
          <h1 className="text-2xl font-bold md:text-3xl">专家数字人</h1>
        </div>
        <p className="text-sm text-gray-600 md:text-base">
          与教育专家深度合作，复刻思想精髓，24小时在线解答教学疑问
        </p>
      </div>
      
      {/* 专家列表 */}
      <div className="grid grid-cols-2 gap-3 px-3 py-4">
        {experts.map((expert) => (
          <ExpertCard key={expert.id} expert={expert} />
        ))}
      </div>
      
      {/* 专家入驻说明 */}
      <div className="bg-white mx-3 p-4 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium text-center mb-3">如何入驻？</h3>
        <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed px-4">
          欢迎加入我们的专家团队！只需提供一段您的授课视频，以及相关的教学成果（如教材、课件或论文等），我们将为您打造专属的数字分身。通过先进的AI技术，我们不仅会还原您的教学风格，更会构建专属的专家知识模型，让您的教育理念能持续影响和帮助更多教师。诚挚期待与您合作！
        </p>
        <div className="flex flex-col items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-gray-500">合作咨询：</span>
            <a href="tel:010-82235960" className="text-blue-600 hover:underline">
              010-82235960
            </a>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500">服务热线：</span>
            <a href="tel:400-7799-010" className="text-blue-600 hover:underline">
              400-7799-010
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  )
} 