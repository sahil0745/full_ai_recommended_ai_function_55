"use client"

import { useState } from "react"
import { MoreVertical } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface TeamMemberCardProps {
  name: string
  role: string
  status: "online" | "away" | "offline"
  avatar: string
  projects: number
  issues: number
}

export function TeamMemberCard({ name, role, status, avatar, projects, issues }: TeamMemberCardProps) {
  const [assigned, setAssigned] = useState(false)
  const [openChat, setOpenChat] = useState(false)
  const [messages, setMessages] = useState<Array<{ from: 'me' | 'them'; text: string; at: string }>>([
    { from: 'them', text: "Hey! Let's sync up when you're free.", at: new Date().toLocaleTimeString() },
  ])
  const [draft, setDraft] = useState("")
  const { toast } = useToast()
  const statusConfig = {
    online: { color: "bg-green-500", label: "Online" },
    away: { color: "bg-yellow-500", label: "Away" },
    offline: { color: "bg-gray-500", label: "Offline" },
  }

  const statusColor = statusConfig[status]

  function handleAssign() {
    setAssigned(true)
    toast({
      title: "Assigned",
      description: `${name} assigned`,
    })
  }

  function handleSend() {
    const text = draft.trim()
    if (!text) return
    const now = new Date().toLocaleTimeString()
    setMessages((prev) => [...prev, { from: 'me', text, at: now }])
    setDraft("")
    // Optional: simulate a quick reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: 'them', text: 'Got it! I\'ll get back to you shortly.', at: new Date().toLocaleTimeString() },
      ])
    }, 800)
  }

  return (
    <Card className="p-4 hover:border-primary transition-colors group">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">{avatar}</span>
              </div>
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 ${statusColor.color} rounded-full border-2 border-card`}
              />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-muted/50 rounded p-2">
            <p className="text-xs text-muted-foreground">Projects</p>
            <p className="font-semibold text-foreground">{projects}</p>
          </div>
          <div className="bg-muted/50 rounded p-2">
            <p className="text-xs text-muted-foreground">Issues</p>
            <p className="font-semibold text-foreground">{issues}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Dialog open={openChat} onOpenChange={setOpenChat}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="flex-1 bg-transparent" onClick={() => setOpenChat(true)}>
                Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Chat with {name}</DialogTitle>
              </DialogHeader>
              <div className="h-64 flex flex-col border rounded-md">
                <div className="flex-1 overflow-auto p-3 space-y-3">
                  {messages.map((m, i) => (
                    <div key={i} className={m.from === 'me' ? 'text-right' : 'text-left'}>
                      <div className={
                        m.from === 'me'
                          ? 'inline-block bg-primary text-primary-foreground rounded-md px-3 py-2'
                          : 'inline-block bg-muted rounded-md px-3 py-2 text-foreground'
                      }>
                        <p className="text-sm">{m.text}</p>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">{m.at}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t p-2 flex gap-2">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSend()
                    }}
                    placeholder={`Message ${name}...`}
                    className="flex-1 bg-muted border border-border rounded-md px-3 py-2 text-sm"
                  />
                  <Button size="sm" onClick={handleSend}>
                    Send
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {!assigned && (
            <Button size="sm" variant="outline" className="flex-1 bg-transparent" onClick={handleAssign}>
              Assign
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
