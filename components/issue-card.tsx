"use client"

import { AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface IssueCardProps {
  id: string
  title: string
  status: "open" | "in-progress" | "closed"
  priority: "critical" | "high" | "medium" | "low"
  assignee?: string
  dueDate?: string
  comments: number
}

const statusConfig = {
  open: { icon: AlertCircle, label: "Open", color: "text-red-400" },
  "in-progress": { icon: Clock, label: "In Progress", color: "text-yellow-400" },
  closed: { icon: CheckCircle2, label: "Closed", color: "text-green-400" },
}

const priorityConfig = {
  critical: "bg-red-500/20 text-red-300 border-red-500/30",
  high: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  medium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  low: "bg-blue-500/20 text-blue-300 border-blue-500/30",
}

export function IssueCard({ id, title, status, priority, assignee, dueDate, comments }: IssueCardProps) {
  const StatusIcon = statusConfig[status].icon

  return (
    <Card className="p-4 hover:border-primary transition-colors cursor-pointer group">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">#{id}</p>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
          </div>
          <Badge variant="outline" className={`ml-2 ${priorityConfig[priority]}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </Badge>
        </div>

        {/* Status and Metadata */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <StatusIcon className={`w-4 h-4 ${statusConfig[status].color}`} />
            <span className="text-muted-foreground">{statusConfig[status].label}</span>
          </div>
          {comments > 0 && <span className="text-muted-foreground">{comments} comments</span>}
        </div>

        {/* Footer */}
        {(assignee || dueDate) && (
          <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
            {assignee && (
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent" />
                <span className="text-muted-foreground">{assignee}</span>
              </div>
            )}
            {dueDate && <span className="text-muted-foreground">{dueDate}</span>}
          </div>
        )}
      </div>
    </Card>
  )
}
