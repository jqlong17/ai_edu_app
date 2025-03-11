import Link from "next/link"
import { LayoutGrid, HelpCircle, User, Beaker } from "lucide-react"
import { usePathname } from "next/navigation"

interface LayoutProps {
  children: React.ReactNode
}

const navItems = [
  {
    path: "/",
    icon: LayoutGrid,
    label: "AI应用"
  },
  {
    path: "/ask-expert",
    icon: HelpCircle,
    label: "问专家"
  },
  {
    path: "/ai-lab",
    icon: Beaker,
    label: "AI实验室"
  },
  {
    path: "/profile",
    icon: User,
    label: "我的"
  }
]

export function AppLayout({ children }: LayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 侧边栏导航 - 在大屏幕显示 */}
      <div className="hidden md:flex flex-col w-60 bg-white border-r border-gray-100 p-4 sticky top-0 h-screen">
        <div className="text-xl font-bold mb-8">云小睿</div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            return (
              <Link 
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-blue-500 bg-blue-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* 主内容区域 */}
      <main className="flex-1 flex flex-col min-h-screen max-w-full">
        <div className="flex-1 pb-20 md:pb-0 overflow-x-hidden">
          {children}
        </div>

        {/* 底部导航栏 - 仅在移动端显示 */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-sm">
          <div className="flex justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path
              return (
                <Link 
                  key={item.path}
                  href={item.path}
                  className={`flex flex-col items-center p-2 ${
                    isActive ? "text-blue-500" : "text-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5 mb-0.5" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
} 