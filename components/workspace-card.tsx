"use client"

import { useRouter } from "next/navigation"
import { FolderOpen, Users, FileText, Clock, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface WorkspaceCardProps {
  name: string
  description: string
  members: number
  files: number
  lastUpdated: string
}

export function WorkspaceCard({ name, description, members, files, lastUpdated }: WorkspaceCardProps) {
  const router = useRouter()
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  return (
    <Card className="p-4 hover:border-primary transition-colors group cursor-pointer">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-chart-2/20 to-chart-2/5 flex items-center justify-center flex-shrink-0">
              <FolderOpen className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-muted/50 rounded p-2">
            <p className="text-muted-foreground flex items-center gap-1">
              <Users className="w-3 h-3" /> {members}
            </p>
          </div>
          <div className="bg-muted/50 rounded p-2">
            <p className="text-muted-foreground flex items-center gap-1">
              <FileText className="w-3 h-3" /> {files}
            </p>
          </div>
          <div className="bg-muted/50 rounded p-2">
            <p className="text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">{lastUpdated}</p>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => router.push(`/workspace/${slug}`)}>
            Open
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
