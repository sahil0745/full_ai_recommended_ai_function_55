"use client"

import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { AlertCircle, CheckCircle2, Users, Zap, Clock } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
const Sidebar = dynamic(
  () => import("@/components/sidebar").then((mod) => mod.Sidebar),
  { ssr: false },
)
import { IssueCard } from "@/components/issue-card"
import { StatsCard } from "@/components/stats-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const router = useRouter()

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-8">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Alex</h1>
              <p className="text-muted-foreground">Here's what's happening with your projects today</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                icon={AlertCircle}
                label="Open Issues"
                value={24}
                trend={{ direction: "down", percentage: 12 }}
                color="primary"
                onClick={() => router.push('/issues?status=open')}
              />
              <StatsCard
                icon={Clock}
                label="In Progress"
                value={8}
                trend={{ direction: "up", percentage: 3 }}
                color="accent"
                onClick={() => router.push('/issues?status=in-progress')}
              />
              <StatsCard
                icon={CheckCircle2}
                label="Completed"
                value={142}
                trend={{ direction: "up", percentage: 28 }}
                color="chart-2"
                onClick={() => router.push('/issues?status=closed')}
              />
              <StatsCard
                icon={Users}
                label="Team Members"
                value={12}
                trend={{ direction: "up", percentage: 2 }}
                color="chart-3"
                onClick={() => router.push('/team')}
              />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Issues Section */}
              <div className="lg:col-span-2 space-y-4">
                <Tabs defaultValue="all" className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-foreground">Recent Issues</h2>
                    <TabsList className="bg-muted">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="open">Open</TabsTrigger>
                      <TabsTrigger value="progress">In Progress</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="all" className="space-y-3 mt-0">
                    <IssueCard
                      id="DEVFLOW-2401"
                      title="Implement real-time collaboration for issue comments with WebSocket support"
                      status="in-progress"
                      priority="critical"
                      assignee="Sarah Chen"
                      dueDate="Due in 2 days"
                      comments={5}
                    />
                    <IssueCard
                      id="DEVFLOW-2398"
                      title="Add AI-powered issue triage system using natural language processing"
                      status="open"
                      priority="high"
                      assignee="Marcus Johnson"
                      dueDate="Due in 5 days"
                      comments={12}
                    />
                    <IssueCard
                      id="DEVFLOW-2395"
                      title="Create analytics dashboard with real-time metrics and team insights"
                      status="open"
                      priority="high"
                      comments={3}
                    />
                    <IssueCard
                      id="DEVFLOW-2392"
                      title="Optimize database queries for issue search performance"
                      status="in-progress"
                      priority="medium"
                      assignee="Alex Rivera"
                      comments={8}
                    />
                  </TabsContent>

                  <TabsContent value="open" className="space-y-3 mt-0">
                    <IssueCard
                      id="DEVFLOW-2398"
                      title="Add AI-powered issue triage system using natural language processing"
                      status="open"
                      priority="high"
                      assignee="Marcus Johnson"
                      dueDate="Due in 5 days"
                      comments={12}
                    />
                  </TabsContent>

                  <TabsContent value="progress" className="space-y-3 mt-0">
                    <IssueCard
                      id="DEVFLOW-2401"
                      title="Implement real-time collaboration for issue comments with WebSocket support"
                      status="in-progress"
                      priority="critical"
                      assignee="Sarah Chen"
                      dueDate="Due in 2 days"
                      comments={5}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar Widgets */}
              <div className="space-y-4">
                {/* AI Suggestions */}
                <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">AI Suggestions</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="text-muted-foreground">
                      <span className="text-primary font-medium">→</span> Automate triage for DEVFLOW-2398 based on
                      keywords
                    </li>
                    <li className="text-muted-foreground">
                      <span className="text-primary font-medium">→</span> Assign DEVFLOW-2395 to team lead for review
                    </li>
                    <li className="text-muted-foreground">
                      <span className="text-primary font-medium">→</span> Schedule follow-up for stalled issues
                    </li>
                  </ul>
                </Card>

                {/* Team Activity */}
                <Card className="p-4">
                  <h3 className="font-semibold text-foreground mb-3">Team Activity</h3>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="text-muted-foreground">
                        <span className="text-foreground font-medium">Sarah</span> closed DEVFLOW-2389
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                    <div className="text-sm border-t border-border pt-3">
                      <p className="text-muted-foreground">
                        <span className="text-foreground font-medium">Marcus</span> commented on DEVFLOW-2398
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">4 hours ago</p>
                    </div>
                    <div className="text-sm border-t border-border pt-3">
                      <p className="text-muted-foreground">
                        <span className="text-foreground font-medium">Alex</span> created DEVFLOW-2403
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">6 hours ago</p>
                    </div>
                  </div>
                </Card>

                {/* Quick Links */}
                <Card className="p-4 bg-muted/30">
                  <h3 className="font-semibold text-foreground mb-3">Quick Access</h3>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm text-primary hover:text-primary/80 transition-colors font-medium px-0"
                      onClick={() => router.push("/issues")}
                    >
                      → View all projects
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm text-primary hover:text-primary/80 transition-colors font-medium px-0"
                      onClick={() => router.push("/settings")}
                    >
                      → Team settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm text-primary hover:text-primary/80 transition-colors font-medium px-0"
                      onClick={() => router.push("/analytics")}
                    >
                      → Documentation
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
