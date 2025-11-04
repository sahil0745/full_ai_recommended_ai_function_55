"use client"

import { useParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"

export default function WorkspaceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold text-foreground">Workspace: {slug}</h1>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">This is a placeholder workspace view for "{slug}". You can add files, members, and activity here.</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
