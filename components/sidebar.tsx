"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Zap,
  BarChart3,
  Settings,
  ChevronDown,
  Plus,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: CheckSquare, label: "Issues", href: "/issues" },
  { icon: Users, label: "Team", href: "/team" },
  { icon: Sparkles, label: "AI Assistant", href: "/ai" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
]

export function Sidebar() {
  const [expanded, setExpanded] = useState(true)
  const router = useRouter()

  return (
    <aside className={`border-r border-border bg-sidebar transition-all duration-300 ${expanded ? "w-64" : "w-20"}`}>
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          {expanded && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-sidebar-foreground">DevFlow</span>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)} className="ml-auto">
            <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-90" : ""}`} />
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-3 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent/10 transition-colors group"
            >
              <item.icon className="w-5 h-5 text-sidebar-primary" />
              {expanded && (
                <span className="text-sm font-medium text-sidebar-foreground group-hover:text-sidebar-primary transition-colors">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Create New Button */}
        <div className="p-3 border-t border-sidebar-border">
          <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground gap-2" onClick={() => router.push("/issues") }>
            <Plus className="w-4 h-4" />
            {expanded && "Create"}
          </Button>
          {expanded && (
            <Button variant="ghost" className="w-full mt-2" onClick={() => router.push("/settings")}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          )}
        </div>
      </div>
    </aside>
  )
}
