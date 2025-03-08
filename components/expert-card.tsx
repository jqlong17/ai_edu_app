import Link from "next/link"
import { cn } from "@/lib/utils"
import { User, GraduationCap, BookOpen, Brain, School } from "lucide-react"

interface Expert {
  id: string
  name: string
  title: string
  description: string
  specialties: string[]
  avatar: string
}

interface ExpertCardProps {
  expert: Expert
  className?: string
}

// 获取随机背景色
function getAvatarBgColor(expertId: string) {
  const colors = [
    "bg-blue-100", // 蓝色
    "bg-purple-100", // 紫色
    "bg-green-100", // 绿色
    "bg-orange-100", // 橙色
    "bg-pink-100", // 粉色
    "bg-cyan-100", // 青色
  ];
  
  const colorIndex = parseInt(expertId) % colors.length;
  return colors[colorIndex];
}

// 获取专家图标
function getExpertIcon(expertId: string) {
  const icons = [
    GraduationCap,
    BookOpen,
    Brain,
    School,
    User
  ];
  
  const iconIndex = parseInt(expertId) % icons.length;
  return icons[iconIndex];
}

export function ExpertCard({ expert, className }: ExpertCardProps) {
  const ExpertIcon = getExpertIcon(expert.id);
  const bgColor = getAvatarBgColor(expert.id);
  
  return (
    <Link href={`/ask-expert/${expert.id}`}>
      <div className={cn(
        "flex flex-col items-center p-4 rounded-xl bg-white shadow-sm",
        className
      )}>
        {/* 头像图标 */}
        <div className={`flex items-center justify-center h-16 w-16 rounded-full ${bgColor} mb-2`}>
          <ExpertIcon className="h-8 w-8 text-gray-700" />
        </div>
        
        {/* 姓名 */}
        <h3 className="text-base font-medium mb-1">{expert.name}</h3>
        
        {/* 描述 */}
        <p className="text-xs text-gray-500 text-center mb-2 line-clamp-2">
          {expert.description}
        </p>
        
        {/* 专长标签 */}
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          {expert.specialties.map((specialty) => (
            <span 
              key={specialty} 
              className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
        
        {/* 底部按钮区域 */}
        <div className="flex gap-2 mt-1">
          <span className="text-xs text-blue-500 px-2 py-0.5">
            教学设计
          </span>
          <span className="text-xs text-blue-500 px-2 py-0.5">
            试题解析
          </span>
        </div>
        <div className="mt-1">
          <span className="text-xs text-blue-500 px-2 py-0.5">
            概念讲解
          </span>
        </div>
      </div>
    </Link>
  )
} 