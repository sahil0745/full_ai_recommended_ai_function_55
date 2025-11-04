"use client"

import { useRouter } from "next/navigation"
import { Bell, Search, Settings, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function DashboardHeader() {
  const router = useRouter()
  const { toast } = useToast()

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search issues, features..."
              className="pl-10 bg-muted/50 border-border focus:border-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => toast({ title: "Notifications", description: "You're all caught up!" })}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </Button>

          <Button variant="ghost" size="icon" onClick={() => router.push("/settings")}>
            <Settings className="w-5 h-5" />
          </Button>

          <Button variant="ghost" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
