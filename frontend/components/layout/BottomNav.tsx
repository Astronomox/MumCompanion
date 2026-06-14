"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageCircle, Calendar, UtensilsCrossed, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils/cn"

const tabs = [
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/journey", label: "Journey", icon: Calendar },
  { href: "/planner", label: "Planner", icon: UtensilsCrossed },
  { href: "/nutrition", label: "Nutrition", icon: BookOpen },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 pb-safe z-50">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-3 tap-target text-xs font-medium transition-colors",
                isActive ? "text-terracotta-500" : "text-stone-400"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "fill-terracotta-50")} />
              <span>{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
