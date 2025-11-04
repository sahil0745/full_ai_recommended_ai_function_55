"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const velocityData = [
  { week: "W1", velocity: 45, forecast: 48 },
  { week: "W2", velocity: 52, forecast: 50 },
  { week: "W3", velocity: 48, forecast: 52 },
  { week: "W4", velocity: 58, forecast: 56 },
]

const burndownData = [
  { day: "Mon", planned: 100, actual: 95 },
  { day: "Tue", planned: 85, actual: 82 },
  { day: "Wed", planned: 70, actual: 68 },
  { day: "Thu", planned: 55, actual: 60 },
  { day: "Fri", planned: 40, actual: 35 },
]

export function AIInsights() {
  return (
    <div className="space-y-4">
      {/* Insights Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-2">Prediction: Sprint Completion</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">92%</span>
            <span className="text-sm text-green-400">↑ 8% above target</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Based on current velocity and issue patterns</p>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-2">Team Health Score</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-chart-2">8.5/10</span>
            <span className="text-sm text-yellow-400">↓ 2% risk</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Workload distribution and velocity tracking</p>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-2">Bottleneck Detection</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-orange-400">Code Review</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Average review time: 8h (target: 4h)</p>
        </Card>
      </div>

      {/* Charts */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-4">Team Velocity Forecast</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={velocityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
            <Line type="monotone" dataKey="velocity" stroke="hsl(var(--primary))" strokeWidth={2} name="Actual" />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Forecast"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-4">Sprint Burndown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={burndownData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
            <Bar dataKey="planned" fill="hsl(var(--muted))" name="Planned" />
            <Bar dataKey="actual" fill="hsl(var(--primary))" name="Actual" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* AI-Generated Recommendations */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">AI Recommendations</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold">•</span>
            <span className="text-muted-foreground">
              Increase code review capacity by adding 1-2 reviewers to reduce bottleneck
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold">•</span>
            <span className="text-muted-foreground">Schedule technical debt sprint after Q2 to maintain velocity</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold">•</span>
            <span className="text-muted-foreground">
              Consider parallel workflow for independent features to boost throughput
            </span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
