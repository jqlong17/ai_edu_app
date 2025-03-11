import Link from "next/link"
import { cn } from "@/lib/utils"
import { Bot } from "lucide-react"

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
    "bg-blue-50 text-blue-500", // 蓝色
    "bg-purple-50 text-purple-500", // 紫色
    "bg-green-50 text-green-500", // 绿色
    "bg-orange-50 text-orange-500", // 橙色
  ];
  
  const colorIndex = parseInt(expertId) % colors.length;
  return colors[colorIndex];
}

export function ExpertCard({ expert, className }: ExpertCardProps) {
  const bgColorClass = getAvatarBgColor(expert.id);
  
  return (
    <Link href={`/ask-expert/${expert.id}`}>
      <div className={cn(
        "flex flex-col items-center p-4 rounded-xl bg-white shadow-sm",
        className
      )}>
        {/* 头像图标 */}
        <div className={`flex items-center justify-center h-16 w-16 rounded-full ${bgColorClass} mb-2`}>
          <Bot className="h-8 w-8" />
        </div>
        
        {/* 姓名 */}
        <h3 className="text-base font-medium mb-1">{expert.name}</h3>
        
        {/* 描述 */}
        <p className="text-xs text-gray-500 text-center mb-2 line-clamp-2">
          {expert.description}
        </p>
        
        {/* 专长标签 */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {expert.specialties.map((specialty) => (
            <span 
              key={specialty} 
              className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
} 