import { Metadata } from 'next'
import ExpertChatClient from './client'

// 模拟专家数据列表，用于生成静态路径
const experts = [
  { id: "1", name: "章建跃", title: "数学教育专家" },
  { id: "2", name: "李明", title: "语文教育专家" },
  { id: "3", name: "王华", title: "英语教育专家" },
  { id: "4", name: "张伟", title: "物理教育专家" }
]

// 为静态导出生成所有可能的专家ID路径
export function generateStaticParams() {
  return experts.map((expert) => ({
    expertId: expert.id,
  }))
}

// 生成元数据
export function generateMetadata({ params }: { params: { expertId: string } }): Metadata {
  // 找到对应的专家
  const expert = experts.find(e => e.id === params.expertId) || experts[0]
  
  return {
    title: `与${expert.name}对话 - ${expert.title}`,
    description: `与${expert.name}进行实时对话，获取专业的${expert.title}指导和建议。`
  }
}

// 服务器组件
export default function ExpertChatPage({ params }: { params: { expertId: string } }) {
  return <ExpertChatClient params={params} />
} 