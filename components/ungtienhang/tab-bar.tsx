"use client"

import { cn } from "@/lib/utils"
import { Home, CreditCard, User } from "lucide-react"

type TabId = "home" | "advances" | "profile"

interface TabBarProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const tabs: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Trang chủ", icon: Home },
  { id: "advances", label: "Khoản ứng", icon: CreditCard },
  { id: "profile", label: "Tôi", icon: User },
]

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[64px] h-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[11px] font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
