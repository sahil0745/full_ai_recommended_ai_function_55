"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const teamPerformance = [
  { member: "Sarah Chen", completed: 24, inProgress: 3, avgResolution: 2.1, efficiency: 92 },
  { member: "Marcus Johnson", completed: 19, inProgress: 5, avgResolution: 2.8, efficiency: 85 },
  { member: "Alex Rivera", completed: 21, inProgress: 2, avgResolution: 2.3, efficiency: 88 },
  { member: "Emma Wilson", completed: 18, inProgress: 4, avgResolution: 3.1, efficiency: 82 },
  { member: "James Park", completed: 15, inProgress: 1, avgResolution: 2.5, efficiency: 80 },
  { member: "Lisa Anderson", completed: 22, inProgress: 3, avgResolution: 2.2, efficiency: 90 },
]

const skillDistribution = [
  { skill: "Frontend", count: 45, activeMembers: 4 },
  { skill: "Backend", count: 38, activeMembers: 3 },
  { skill: "DevOps", count: 12, activeMembers: 2 },
  { skill: "QA", count: 28, activeMembers: 2 },
  { skill: "Design", count: 15, activeMembers: 1 },
]

export function TeamMetrics() {
  return (
    <div className="space-y-4">
      {/* Team Performance */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-4">Team Member Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-medium text-muted-foreground">Member</th>
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">Completed</th>
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">In Progress</th>
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">Avg Resolution</th>
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {teamPerformance.map((member) => (
                <tr key={member.member} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-2 text-foreground">{member.member}</td>
                  <td className="text-right py-3 px-2 text-foreground font-semibold">{member.completed}</td>
                  <td className="text-right py-3 px-2 text-foreground">{member.inProgress}</td>
                  <td className="text-right py-3 px-2 text-muted-foreground">{member.avgResolution}d</td>
                  <td className="text-right py-3 px-2">
                    <span className="inline-block px-2 py-1 rounded bg-green-500/20 text-green-300 text-xs font-semibold">
                      {member.efficiency}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Workload Distribution */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-4">Issues Completed by Team Member</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={teamPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="member" stroke="hsl(var(--muted-foreground))" angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
            <Legend />
            <Bar dataKey="completed" fill="hsl(var(--chart-1))" name="Completed" />
            <Bar dataKey="inProgress" fill="hsl(var(--chart-3))" name="In Progress" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Skill Distribution */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-4">Skill Distribution & Coverage</h3>
        <div className="space-y-3">
          {skillDistribution.map((skill) => (
            <div key={skill.skill}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{skill.skill}</span>
                <span className="text-xs text-muted-foreground">
                  {skill.count} issues • {skill.activeMembers} members
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                  style={{ width: `${(skill.count / 45) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
