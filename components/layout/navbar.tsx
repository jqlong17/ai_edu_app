"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Cpu, Users, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    name: "AI应用",
    href: "/",
    icon: Cpu,
  },
  {
    name: "问专家",
    href: "/ask-expert",
    icon: Users,
  },
  {
    name: "我的",
    href: "/profile",
    icon: User,
  },
]

export function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-white">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center space-y-1"
          >
            <item.icon className={cn(
              "h-6 w-6",
              isActive ? "text-blue-500" : "text-gray-400"
            )} />
            <span className={cn(
              "text-xs",
              isActive ? "text-blue-500" : "text-gray-400"
            )}>
              {item.name}
              {isActive && (
                <span className="absolute -mt-1 ml-1 h-1 w-1 rounded-full bg-blue-500"></span>
              )}
            </span>
          </Link>
        );
      })}
    </nav>
  )
} 