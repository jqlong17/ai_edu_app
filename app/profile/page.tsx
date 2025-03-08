import Link from "next/link"
import { Settings, History, BookmarkIcon, LogOut, User, 
         FileText, MessageSquare, HelpCircle, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

// 模拟用户数据
const user = {
  name: "张三",
  email: "zhangsan@example.com",
}

const menuItems = [
  {
    name: "文件空间",
    href: "/profile/files",
    icon: FileText,
    description: "管理您的教学文件和资源",
  },
  {
    name: "历史对话",
    href: "/profile/chats",
    icon: MessageSquare,
    description: "查看与AI助手的历史对话记录",
  },
  {
    name: "收藏",
    href: "/profile/bookmarks",
    icon: BookmarkIcon,
    description: "您收藏的教学资源和工具",
  },
  {
    name: "通知中心",
    href: "/profile/notifications",
    icon: Bell,
    description: "查看系统通知和更新",
  },
  {
    name: "设置",
    href: "/profile/settings",
    icon: Settings,
    description: "账户设置和偏好",
  },
  {
    name: "帮助中心",
    href: "/profile/help",
    icon: HelpCircle,
    description: "获取使用帮助和支持",
  },
]

export default function Profile() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 顶部蓝色渐变区域 */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl m-2 p-4">
        <h1 className="text-2xl font-bold mb-2">我的</h1>
        <p className="text-sm text-gray-600">
          个人中心和设置
        </p>
      </div>
      
      {/* 用户信息卡片 */}
      <div className="bg-white rounded-xl m-2 p-4 flex items-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mr-4">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg font-medium">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      
      {/* 菜单列表 */}
      <div className="grid grid-cols-1 gap-3 m-2 mb-16">
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className="flex items-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-50 mr-4">
              <item.icon className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          </Link>
        ))}
        
        {/* 退出登录按钮 */}
        <button className="flex items-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow text-red-500">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-red-50 mr-4">
            <LogOut className="h-5 w-5 text-red-500" />
          </div>
          <div className="flex-1">
            <div className="font-medium">退出登录</div>
            <p className="text-xs text-gray-500">退出当前账号</p>
          </div>
        </button>
      </div>
    </div>
  )
} 