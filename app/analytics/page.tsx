"use client"

import { BarChart3, TrendingUp, Users, Zap, Download } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { TeamMetrics } from "@/components/team-metrics"
import { CustomReports } from "@/components/custom-reports"
import { TrendAnalysis } from "@/components/trend-analysis"

export default function AnalyticsPage() {
  function handleExport() {
    const data = {
      generatedAt: new Date().toISOString(),
      kpis: {
        totalIssues: 342,
        avgResolutionDays: 2.4,
        efficiencyPercent: 87,
        teamVelocityPts: 58,
      },
      note: "Sample analytics export",
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-report-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  <h1 className="text-3xl font-bold text-foreground">Analytics & Reporting</h1>
                </div>
                <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={handleExport}>
                  <Download className="w-4 h-4" />
                  Export Report
                </Button>
              </div>
              <p className="text-muted-foreground">
                Comprehensive insights into project performance and team productivity
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Issues</p>
                    <p className="text-2xl font-bold text-foreground mt-1">342</p>
                    <p className="text-xs text-green-400 mt-1">↓ 8% closed this week</p>
                  </div>
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Resolution Time</p>
                    <p className="text-2xl font-bold text-foreground mt-1">2.4d</p>
                    <p className="text-xs text-green-400 mt-1">↑ 0.5d improvement</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Team Efficiency</p>
                    <p className="text-2xl font-bold text-foreground mt-1">87%</p>
                    <p className="text-xs text-green-400 mt-1">↑ 4% from last week</p>
                  </div>
                  <Zap className="w-5 h-5 text-chart-2" />
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Team Velocity</p>
                    <p className="text-2xl font-bold text-foreground mt-1">58 pts</p>
                    <p className="text-xs text-green-400 mt-1">↑ 12% trending up</p>
                  </div>
                  <Users className="w-5 h-5 text-chart-3" />
                </div>
              </Card>
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="bg-muted mb-4">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="team">Team Metrics</TabsTrigger>
                <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
                <TabsTrigger value="reports">Custom Reports</TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-4">
                <AnalyticsDashboard />
              </TabsContent>

              {/* Team Metrics Tab */}
              <TabsContent value="team" className="space-y-4">
                <TeamMetrics />
              </TabsContent>

              {/* Trend Analysis Tab */}
              <TabsContent value="trends" className="space-y-4">
                <TrendAnalysis />
              </TabsContent>

              {/* Custom Reports Tab */}
              <TabsContent value="reports" className="space-y-4">
                <CustomReports />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
