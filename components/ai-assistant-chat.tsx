"use client"

import { Card } from "@/components/ui/card"

export function AIAssistantChat() {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-2">Recent Chats</h3>
        <div className="space-y-2">
          <button className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors border border-border">
            <p className="text-sm text-foreground">How should I prioritize this sprint?</p>
            <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
          </button>
          <button className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors border border-border">
            <p className="text-sm text-foreground">Analyze team velocity trends</p>
            <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
          </button>
        </div>
      </Card>
    </div>
  )
}
