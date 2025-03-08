import Link from "next/link"
import { cn } from "@/lib/utils"
import { Pi, FileText, BookOpen, GraduationCap, 
         Brain, MessageSquare, FileBarChart, Database, 
         LineChart, BarChart, PenTool, Settings } from "lucide-react"

interface AIApp {
  id: string
  name: string
  title: string
  description: string
  categories: string[]
  icon: string
  path?: string // 添加路径属性
}

interface AIAppCardProps {
  app: AIApp
  className?: string
}

// 获取随机背景色
function getIconBgColor(appId: string) {
  const colors = [
    "bg-blue-100 text-blue-600", // 蓝色
    "bg-orange-100 text-orange-600", // 橙色
    "bg-green-100 text-green-600", // 绿色
    "bg-violet-100 text-violet-600", // 紫色
    "bg-pink-100 text-pink-600", // 粉色
    "bg-cyan-100 text-cyan-600", // 青色
  ];
  
  const colorIndex = parseInt(appId) % colors.length;
  return colors[colorIndex];
}

// 图标映射函数
function getIconByName(iconPath: string, appId: string) {
  // 根据应用ID或名称选择适当的图标
  const iconMap: Record<string, any> = {
    "app-icon1.png": BookOpen,
    "app-icon2.png": FileText,
    "app-icon3.png": Pi,
    "app-icon4.png": GraduationCap,
  };
  
  // 从路径中提取文件名
  const fileName = iconPath.split('/').pop() || "";
  
  // 返回匹配的图标或默认图标
  const IconComponent = iconMap[fileName] || Brain;
  
  // 返回一个图标列表，用于在找不到匹配时随机选择
  const iconList = [
    BookOpen, FileText, Pi, GraduationCap, 
    Brain, MessageSquare, FileBarChart, Database, 
    LineChart, BarChart, PenTool, Settings
  ];
  
  // 如果没有找到匹配，则根据ID随机选择一个图标
  if (!iconMap[fileName]) {
    const iconIndex = parseInt(appId) % iconList.length;
    return iconList[iconIndex];
  }
  
  return IconComponent;
}

export function AIAppCard({ app, className }: AIAppCardProps) {
  const IconComponent = getIconByName(app.icon, app.id);
  const bgColorClass = getIconBgColor(app.id);
  const [bgClass, textClass] = bgColorClass.split(" ");
  
  // 获取应用的正确路径
  const appPath = app.path || `/ai-applications/${app.id}`;
  
  return (
    <Link href={appPath}>
      <div className={cn(
        "flex flex-col h-full p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow",
        className
      )}>
        {/* 内容区域 */}
        <div className="flex flex-col h-full">
          {/* 图标区域 */}
          <div className={`self-start p-2 rounded-lg ${bgClass} mb-3`}>
            <IconComponent className={`h-5 w-5 ${textClass}`} />
          </div>
          
          {/* 标题 */}
          <h3 className="text-base font-medium mb-1">{app.name}</h3>
          
          {/* 描述 */}
          <p className="text-xs text-gray-500 line-clamp-2">
            {app.description}
          </p>
        </div>
      </div>
    </Link>
  )
} 