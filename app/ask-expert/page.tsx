import { ExpertCard } from "@/components/expert-card"

// 模拟专家数据
const experts = [
  {
    id: "1",
    name: "章建跃",
    title: "数学教育专家",
    description: "著名数学教育专家，教育部基础教育课程教材专家工作委员会委员",
    specialties: ["教学设计", "试题解析"],
    avatar: "/images/expert1.png",
  },
  {
    id: "2",
    name: "章建跃",
    title: "数学教育专家",
    description: "著名数学教育专家，教育部基础教育课程教材专家工作委员会委员",
    specialties: ["教学设计", "试题解析"],
    avatar: "/images/expert1.png",
  },
  {
    id: "3",
    name: "章建跃",
    title: "数学教育专家",
    description: "著名数学教育专家，教育部基础教育课程教材专家工作委员会委员",
    specialties: ["教学设计", "试题解析"],
    avatar: "/images/expert1.png",
  },
  {
    id: "4",
    name: "章建跃",
    title: "数学教育专家",
    description: "著名数学教育专家，教育部基础教育课程教材专家工作委员会委员",
    specialties: ["教学设计", "试题解析"],
    avatar: "/images/expert1.png",
  },
  // 可以添加更多专家...
]

export default function AskExpert() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 顶部蓝色渐变区域 */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-5 pb-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold mb-2">AI教学助手</h1>
        <p className="text-sm text-gray-600">
          远择专业的教学人助手，开启智能教学之旅
        </p>
      </div>
      
      {/* 专家列表 */}
      <div className="grid grid-cols-2 gap-3 px-3 py-4">
        {experts.map((expert) => (
          <ExpertCard key={expert.id} expert={expert} />
        ))}
      </div>
      
      {/* 更多专家提示 */}
      <div className="text-center text-gray-400 text-sm py-4">
        更多专家入驻中
      </div>
    </div>
  )
} 