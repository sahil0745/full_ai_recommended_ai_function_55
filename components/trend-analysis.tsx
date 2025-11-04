"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const velocityTrend = [
  { week: "W1", velocity: 42, trend: 42 },
  { week: "W2", velocity: 48, trend: 45 },
  { week: "W3", velocity: 45, trend: 46 },
  { week: "W4", velocity: 52, trend: 48 },
  { week: "W5", velocity: 58, trend: 51 },
  { week: "W6", velocity: 62, trend: 54 },
]

const qualityTrend = [
  { week: "W1", defects: 12, reopened: 3, failedTests: 2 },
  { week: "W2", defects: 10, reopened: 2, failedTests: 1 },
  { week: "W3", defects: 8, reopened: 2, failedTests: 1 },
  { week: "W4", defects: 6, reopened: 1, failedTests: 0 },
  { week: "W5", defects: 5, reopened: 1, failedTests: 0 },
  { week: "W6", defects: 4, reopened: 0, failedTests: 0 },
]

export function TrendAnalysis() {
  return (
    <div className="space-y-4">
      {/* Velocity Trend */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-4">Team Velocity Trend (6-Week View)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={velocityTrend}>
            <defs>
              <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
            <Legend />
            <Area
              type="monotone"
              dataKey="velocity"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorVelocity)"
              name="Actual Velocity"
            />
            <Area
              type="monotone"
              dataKey="trend"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTrend)"
              name="Trend Line"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Quality Metrics Trend */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-4">Quality Metrics Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={qualityTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
            <Legend />
            <Line type="monotone" dataKey="defects" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Defects Found" />
            <Line
              type="monotone"
              dataKey="reopened"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              name="Issues Reopened"
            />
            <Line
              type="monotone"
              dataKey="failedTests"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              name="Failed Tests"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Trend Insights */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-4">Trend Insights & Forecasts</h3>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-sm font-medium text-green-300">Positive Trend</p>
            <p className="text-xs text-muted-foreground mt-1">
              Velocity has increased 48% over the past 6 weeks. Based on current trajectory, expect to reach 75
              points/week by end of Q2.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-sm font-medium text-green-300">Quality Improvement</p>
            <p className="text-xs text-muted-foreground mt-1">
              Defect rate down 67%. Reopened issues trending toward zero. Process improvements are yielding measurable
              results.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <p className="text-sm font-medium text-yellow-300">Forecast</p>
            <p className="text-xs text-muted-foreground mt-1">
              If current trends continue, the backlog will be cleared by week 12. Consider prioritizing strategic
              initiatives.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
