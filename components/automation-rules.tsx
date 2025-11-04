"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { MoreVertical, Plus } from "lucide-react"

interface AutomationRule {
  id: string
  name: string
  trigger: string
  action: string
  isActive: boolean
  lastRun: string
}

const rules: AutomationRule[] = [
  {
    id: "1",
    name: "Auto-triage by Keywords",
    trigger: "Issue created with 'critical' keywords",
    action: "Mark as high priority & notify team lead",
    isActive: true,
    lastRun: "5 minutes ago",
  },
  {
    id: "2",
    name: "Duplicate Detection",
    trigger: "New issue matches existing issue description",
    action: "Flag for review and suggest merge",
    isActive: true,
    lastRun: "Yesterday",
  },
  {
    id: "3",
    name: "Auto-assign by Skills",
    trigger: "Issue requires specific skill tags",
    action: "Assign to best available team member",
    isActive: true,
    lastRun: "2 hours ago",
  },
  {
    id: "4",
    name: "Stalled Issue Alert",
    trigger: "Issue in progress for >3 days without update",
    action: "Send reminder to assignee",
    isActive: false,
    lastRun: "3 days ago",
  },
  {
    id: "5",
    name: "Daily Standup Summary",
    trigger: "Scheduled daily at 9:00 AM",
    action: "Send team digest with status updates",
    isActive: true,
    lastRun: "Today",
  },
]

export function AutomationRules() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create New Rule
        </Button>
      </div>

      <div className="space-y-3">
        {rules.map((rule) => (
          <Card key={rule.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{rule.name}</h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">When:</span> {rule.trigger}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Then:</span> {rule.action}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Last run: {rule.lastRun}</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={rule.isActive} />
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
