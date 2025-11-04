"use client"

import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  trend?: { direction: "up" | "down"; percentage: number }
  color: "primary" | "accent" | "chart-1" | "chart-2" | "chart-3"
  onClick?: () => void
}

export function StatsCard({ icon: Icon, label, value, trend, color, onClick }: StatsCardProps) {
  const colorMap = {
    primary: "from-primary/20 to-primary/5",
    accent: "from-accent/20 to-accent/5",
    "chart-1": "from-[hsl(var(--chart-1))]/20 to-[hsl(var(--chart-1))]/5",
    "chart-2": "from-[hsl(var(--chart-2))]/20 to-[hsl(var(--chart-2))]/5",
    "chart-3": "from-[hsl(var(--chart-3))]/20 to-[hsl(var(--chart-3))]/5",
  }

  return (
    <Card
      className={`p-6 bg-gradient-to-br ${colorMap[color]} border-border hover:border-primary/50 transition-colors ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Icon className="w-5 h-5 text-muted-foreground" />
          {trend && (
            <span className={`text-xs font-semibold ${trend.direction === "up" ? "text-green-400" : "text-red-400"}`}>
              {trend.direction === "up" ? "↑" : "↓"} {trend.percentage}%
            </span>
          )}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
        </div>
      </div>
    </Card>
  )
}
