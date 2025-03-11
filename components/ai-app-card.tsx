import Link from "next/link"
import { cn } from "@/lib/utils"
import { 
  BookOpen, 
  FileText, 
  PenTool, 
  GraduationCap,
  Brain,
  BarChart2,
  Languages,
  Presentation,
  School,
  Calculator,
  LineChart,
  ClipboardCheck,
  PieChart,
  Compass,
  BookCheck,
  ActivitySquare,
  Lightbulb,
  ChartBar
} from "lucide-react"
import type { AIApplication } from '@/app/api/types'
import { toast } from 'sonner'

interface AIAppCardProps {
  app: AIApplication
}

// 图标映射函数
function getIconComponent(appId: string) {
  const iconMap: Record<string, any> = {
    "1": BookOpen,      // 数学单元教学设计
    "2": PenTool,      // 教学设计润色
    "3": FileText,     // 语文作文评价
    "4": Presentation, // PPT转教案
    "5": School,       // 数学项目式学习
    "6": Calculator,   // 数学概念教学
    "7": LineChart,    // 函数图像分析
    "8": Compass,      // 几何证明助手
    "9": Languages,    // 英语写作评价
    "10": ActivitySquare, // 课堂互动工具
    "11": PieChart,    // 学情分析助手
    "12": ClipboardCheck, // 试题解析工具
    "13": Lightbulb,   // 其他可能的应用
    "14": BookCheck,   // 其他可能的应用
    "15": ChartBar,    // 其他可能的应用
  };

  return iconMap[appId] || Brain;
}

// 获取图标背景色
function getIconStyle(appId: string) {
  const styles = [
    "bg-blue-50 text-blue-500",
    "bg-purple-50 text-purple-500",
    "bg-green-50 text-green-500",
    "bg-orange-50 text-orange-500",
    "bg-pink-50 text-pink-500",
    "bg-cyan-50 text-cyan-500",
  ];
  
  return styles[(parseInt(appId) - 1) % styles.length];
}

export function AIAppCard({ app }: AIAppCardProps) {
  const IconComponent = getIconComponent(app.id);
  const iconStyle = getIconStyle(app.id);

  const handleClick = () => {
    if (!app.enabled) {
      toast.info('该功能正在开发中，敬请期待...')
      return
    }
  }

  const CardContent = () => (
    <div className={`bg-white rounded-xl md:rounded-2xl p-4 h-full flex flex-col ${!app.enabled ? 'opacity-60' : ''}`}>
      <div className="flex justify-center mb-3 md:mb-4">
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl ${iconStyle} flex items-center justify-center`}>
          <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
        </div>
      </div>
      <h3 className="font-medium text-sm md:text-base mb-1 md:mb-1.5 line-clamp-1 text-center">{app.name}</h3>
      <p className="text-xs md:text-sm text-gray-500 flex-1 line-clamp-3 leading-snug text-center">{app.description}</p>
    </div>
  )

  if (!app.enabled) {
    return (
      <div onClick={handleClick} className="cursor-pointer">
        <CardContent />
      </div>
    )
  }

  return (
    <Link href={app.path || '#'} className="block">
      <CardContent />
    </Link>
  )
} 