"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, MessageSquare, Users, FileText, Zap } from "lucide-react"

interface Activity {
  id: string
  user: string
  action: string
  target: string
  timestamp: string
  type: "completed" | "commented" | "assigned" | "updated" | "created"
}

const activities: Activity[] = [
  {
    id: "1",
    user: "Sarah Chen",
    action: "completed",
    target: "DEVFLOW-2401",
    timestamp: "Just now",
    type: "completed",
  },
  {
    id: "2",
    user: "Marcus Johnson",
    action: "commented on",
    target: "Design System Components",
    timestamp: "5 minutes ago",
    type: "commented",
  },
  {
    id: "3",
    user: "Alex Rivera",
    action: "assigned",
    target: "DEVFLOW-2395 to Emma Wilson",
    timestamp: "15 minutes ago",
    type: "assigned",
  },
  {
    id: "4",
    user: "Emma Wilson",
    action: "updated",
    target: "Test Suite - E2E Tests",
    timestamp: "30 minutes ago",
    type: "updated",
  },
  {
    id: "5",
    user: "James Park",
    action: "created",
    target: "Production Deployment Pipeline",
    timestamp: "1 hour ago",
    type: "created",
  },
  {
    id: "6",
    user: "Lisa Anderson",
    action: "completed",
    target: "DEVFLOW-2398",
    timestamp: "2 hours ago",
    type: "completed",
  },
]

const iconMap = {
  completed: CheckCircle2,
  commented: MessageSquare,
  assigned: Users,
  updated: FileText,
  created: Zap,
}

const colorMap = {
  completed: "text-green-400",
  commented: "text-blue-400",
  assigned: "text-purple-400",
  updated: "text-yellow-400",
  created: "text-pink-400",
}

export function CollaborationActivity() {
  return (
    <Card className="divide-y divide-border overflow-hidden">
      {activities.map((activity) => {
        const Icon = iconMap[activity.type]
        const color = colorMap[activity.type]

        return (
          <div key={activity.id} className="p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className={`mt-1 p-2 rounded-lg bg-muted/50`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold text-primary">{activity.user}</span> {activity.action}{" "}
                    <span className="font-medium text-foreground">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </Card>
  )
}
