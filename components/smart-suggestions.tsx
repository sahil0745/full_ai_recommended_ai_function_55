"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle, Users, Zap } from "lucide-react"

interface Suggestion {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  action: string
  icon: React.ReactNode
}

const suggestions: Suggestion[] = [
  {
    id: "1",
    title: "Triage Recommended Issues",
    description: "DEVFLOW-2398 and DEVFLOW-2395 should be marked as 'critical' based on user feedback sentiment",
    impact: "high",
    action: "Apply Triage",
    icon: <AlertCircle className="w-5 h-5 text-red-400" />,
  },
  {
    id: "2",
    title: "Reassign for Better Distribution",
    description: "Sarah Chen has 8 open issues. Consider moving DEVFLOW-2392 to James Park to balance workload",
    impact: "high",
    action: "Reassign",
    icon: <Users className="w-5 h-5 text-purple-400" />,
  },
  {
    id: "3",
    title: "Duplicate Detection",
    description: "DEVFLOW-2403 appears to be related to DEVFLOW-2389. Merge to reduce duplicates?",
    impact: "medium",
    action: "Review",
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
  },
  {
    id: "4",
    title: "Effort Estimation",
    description: "DEVFLOW-2401 estimated at 5-8 hours based on similar completed issues in database",
    impact: "medium",
    action: "Update Estimate",
    icon: <CheckCircle2 className="w-5 h-5 text-green-400" />,
  },
]

export function SmartSuggestions() {
  return (
    <div className="space-y-3">
      {suggestions.map((suggestion) => (
        <Card key={suggestion.id} className="p-4 hover:border-primary transition-colors">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">{suggestion.icon}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{suggestion.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    suggestion.impact === "high"
                      ? "bg-red-500/20 text-red-300"
                      : suggestion.impact === "medium"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-blue-500/20 text-blue-300"
                  }`}
                >
                  {suggestion.impact.charAt(0).toUpperCase() + suggestion.impact.slice(1)} Impact
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  {suggestion.action}
                </Button>
                <Button size="sm" variant="outline">
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
