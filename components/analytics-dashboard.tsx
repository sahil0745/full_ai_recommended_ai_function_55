"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const issueData = [
  { month: "Jan", open: 45, closed: 32, inProgress: 12 },
  { month: "Feb", open: 52, closed: 48, inProgress: 15 },
  { month: "Mar", open: 48, closed: 55, inProgress: 18 },
  { month: "Apr", open: 42, closed: 62, inProgress: 14 },
  { month: "May", open: 38, closed: 71, inProgress: 16 },
  { month: "Jun", open: 32, closed: 78, inProgress: 12 },
]

const priorityData = [
  { name: "Critical", value: 12, color: "hsl(var(--chart-1))" },
  { name: "High", value: 32, color: "hsl(var(--chart-2))" },
  { name: "Medium", value: 68, color: "hsl(var(--chart-3))" },
  { name: "Low", value: 230, color: "hsl(var(--chart-4))" },
]

const resolutionData = [
  { day: "Mon", critical: 4.2, high: 2.8, medium: 1.5 },
  { day: "Tue", critical: 3.8, high: 2.5, medium: 1.2 },
  { day: "Wed", critical: 3.5, high: 2.3, medium: 1.1 },
  { day: "Thu", critical: 3.2, high: 2.1, medium: 0.9 },
  { day: "Fri", critical: 2.9, high: 1.9, medium: 0.8 },
  { day: "Sat", critical: 3.1, high: 2.2, medium: 1.0 },
  { day: "Sun", critical: 3.4, high: 2.4, medium: 1.2 },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-4">
      {/* Issue Trend Over Time */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-4">Issue Activity Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={issueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
            <Legend />
            <Line type="monotone" dataKey="open" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Open" />
            <Line type="monotone" dataKey="closed" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Closed" />
            <Line
              type="monotone"
              dataKey="inProgress"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              name="In Progress"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Priority Distribution & Resolution Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4">Issues by Priority</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4">Avg Resolution Time by Priority (days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={resolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Bar dataKey="critical" fill="hsl(var(--chart-1))" name="Critical" />
              <Bar dataKey="high" fill="hsl(var(--chart-2))" name="High" />
              <Bar dataKey="medium" fill="hsl(var(--chart-3))" name="Medium" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary Stats */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-4">Key Performance Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-border rounded p-3">
            <p className="text-sm text-muted-foreground">Closure Rate</p>
            <p className="text-xl font-bold text-primary mt-1">78%</p>
            <p className="text-xs text-muted-foreground mt-1">of issues closed this month</p>
          </div>
          <div className="border border-border rounded p-3">
            <p className="text-sm text-muted-foreground">First Response Time</p>
            <p className="text-xl font-bold text-accent mt-1">2.3h</p>
            <p className="text-xs text-muted-foreground mt-1">average to first update</p>
          </div>
          <div className="border border-border rounded p-3">
            <p className="text-sm text-muted-foreground">Reopened Rate</p>
            <p className="text-xl font-bold text-chart-2 mt-1">5.2%</p>
            <p className="text-xs text-muted-foreground mt-1">issues reopened</p>
          </div>
          <div className="border border-border rounded p-3">
            <p className="text-sm text-muted-foreground">SLA Compliance</p>
            <p className="text-xl font-bold text-chart-3 mt-1">94.8%</p>
            <p className="text-xs text-muted-foreground mt-1">meeting response targets</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
