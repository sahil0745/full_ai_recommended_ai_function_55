"use client"

import { Users } from "lucide-react"

interface MessageThreadProps {
  name: string
  preview: string
  unread: boolean
  avatar: string
  isGroup?: boolean
  onClick?: (name: string) => void
}

export function MessageThread({ name, preview, unread, avatar, isGroup, onClick }: MessageThreadProps) {
  return (
    <button
      className={`w-full text-left p-3 rounded-lg transition-colors ${
        unread ? "bg-primary/10 border border-primary/20 hover:bg-primary/15" : "hover:bg-muted/50"
      }`}
      onClick={() => onClick?.(name)}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          {isGroup ? (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-chart-2 to-chart-3 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-xs font-semibold text-primary-foreground">{avatar}</span>
            </div>
          )}
          {unread && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-background" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className={`font-medium ${unread ? "text-foreground" : "text-muted-foreground"}`}>{name}</p>
            {unread && <div className="w-2 h-2 bg-accent rounded-full" />}
          </div>
          <p className="text-xs text-muted-foreground truncate">{preview}</p>
        </div>
      </div>
    </button>
  )
}
