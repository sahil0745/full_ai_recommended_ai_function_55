"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Filter, Plus, MoreHorizontal } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface Issue {
  id: string
  title: string
  status: "open" | "in-progress" | "closed"
  priority: "critical" | "high" | "medium" | "low"
  assignee: string
  dueDate: string
  labels: string[]
  comments: number
  updated: string
}

const mockIssues: Issue[] = [
  {
    id: "DEVFLOW-2401",
    title: "Implement real-time collaboration for issue comments with WebSocket support",
    status: "in-progress",
    priority: "critical",
    assignee: "Sarah Chen",
    dueDate: "Nov 3, 2025",
    labels: ["backend", "websocket"],
    comments: 5,
    updated: "2 hours ago",
  },
  {
    id: "DEVFLOW-2398",
    title: "Add AI-powered issue triage system using natural language processing",
    status: "open",
    priority: "high",
    assignee: "Marcus Johnson",
    dueDate: "Nov 6, 2025",
    labels: ["ai", "feature"],
    comments: 12,
    updated: "4 hours ago",
  },
  {
    id: "DEVFLOW-2395",
    title: "Create analytics dashboard with real-time metrics and team insights",
    status: "open",
    priority: "high",
    assignee: "Alex Rivera",
    dueDate: "Nov 8, 2025",
    labels: ["analytics", "dashboard"],
    comments: 3,
    updated: "6 hours ago",
  },
  {
    id: "DEVFLOW-2392",
    title: "Optimize database queries for issue search performance",
    status: "in-progress",
    priority: "medium",
    assignee: "Jordan Liu",
    dueDate: "Nov 5, 2025",
    labels: ["performance", "database"],
    comments: 8,
    updated: "1 day ago",
  },
  {
    id: "DEVFLOW-2388",
    title: "Fix mobile responsiveness on dashboard layout",
    status: "open",
    priority: "medium",
    assignee: "Casey Torres",
    dueDate: "Nov 4, 2025",
    labels: ["frontend", "mobile"],
    comments: 2,
    updated: "2 days ago",
  },
  {
    id: "DEVFLOW-2385",
    title: "Update documentation for new API endpoints",
    status: "closed",
    priority: "low",
    assignee: "Morgan Smith",
    dueDate: "Oct 28, 2025",
    labels: ["docs"],
    comments: 1,
    updated: "3 days ago",
  },
]

const priorityConfig = {
  critical: { color: "bg-red-500/20 text-red-300 border-red-500/30", icon: "🔴" },
  high: { color: "bg-orange-500/20 text-orange-300 border-orange-500/30", icon: "🟠" },
  medium: { color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30", icon: "🟡" },
  low: { color: "bg-blue-500/20 text-blue-300 border-blue-500/30", icon: "🔵" },
}

const statusConfig = {
  open: { label: "Open", color: "bg-red-500/20 text-red-300" },
  "in-progress": { label: "In Progress", color: "bg-yellow-500/20 text-yellow-300" },
  closed: { label: "Closed", color: "bg-green-500/20 text-green-300" },
}

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>(mockIssues)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("recent")
  const [createOpen, setCreateOpen] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [viewIssue, setViewIssue] = useState<Issue | null>(null)
  const { toast } = useToast()

  const searchParams = useSearchParams()
  const statusParam = searchParams.get('status')
  useEffect(() => {
    if (statusParam && ['open','in-progress','closed'].includes(statusParam)) {
      setFilterStatus(statusParam)
    }
  }, [statusParam])

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || issue.status === filterStatus
    const matchesPriority = filterPriority === "all" || issue.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const sortedIssues = [...filteredIssues].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.updated).getTime() - new Date(a.updated).getTime()
    } else if (sortBy === "priority") {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
      return (
        priorityOrder[a.priority as keyof typeof priorityOrder] -
        priorityOrder[b.priority as keyof typeof priorityOrder]
      )
    }
    return 0
  })

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Issues</h1>
                <p className="text-muted-foreground mt-1">{sortedIssues.length} total issues</p>
              </div>
              <Button className="bg-gradient-to-r from-primary to-accent gap-2" onClick={() => setCreateOpen(true)}>
                <Plus className="w-4 h-4" />
                Create Issue
              </Button>
            </div>

            {/* Create Issue Dialog */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Issue</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  <Input placeholder="Issue title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
                    <Button onClick={() => {
                      const title = newTitle.trim()
                      if (!title) return
                      const nextIdNum = 2400 + issues.length + 1
                      const newIssue: Issue = {
                        id: `DEVFLOW-${nextIdNum}`,
                        title,
                        status: 'open',
                        priority: 'medium',
                        assignee: 'Unassigned',
                        dueDate: 'TBD',
                        labels: [],
                        comments: 0,
                        updated: 'just now',
                      }
                      setIssues([newIssue, ...issues])
                      setNewTitle("")
                      setCreateOpen(false)
                      toast({ title: 'Issue created', description: `${newIssue.id} created` })
                    }}>Create</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Filters and Search */}
            <Card className="p-4 bg-card/50 border-border">
              <div className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search issues by ID or title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-muted/50 border-border"
                  />
                </div>

                {/* Filters and Sort */}
                <div className="flex gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-40 bg-muted/50 border-border">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger className="w-40 bg-muted/50 border-border">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 bg-muted/50 border-border">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="priority">By Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Issues Table */}
            <Card className="border-border overflow-hidden">
              <div className="divide-y divide-border">
                {/* Table Header */}
                <div className="px-6 py-3 bg-muted/30 flex items-center gap-4 text-sm font-semibold text-muted-foreground">
                  <div className="w-32">ID</div>
                  <div className="flex-1">Title</div>
                  <div className="w-28">Status</div>
                  <div className="w-24">Priority</div>
                  <div className="w-32">Assignee</div>
                  <div className="w-24">Due</div>
                  <div className="w-12 text-center">Comments</div>
                  <div className="w-8"></div>
                </div>

                {/* Table Rows */}
                <div>
                  {sortedIssues.length > 0 ? (
                    sortedIssues.map((issue) => (
                      <div
                        key={issue.id}
                        className="px-6 py-4 hover:bg-muted/20 transition-colors flex items-center gap-4 border-b border-border last:border-0 cursor-pointer group"
                      >
                        <div className="w-32">
                          <p className="text-sm font-mono text-primary hover:underline">{issue.id}</p>
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {issue.title}
                          </p>
                          <div className="flex gap-1 mt-1">
                            {issue.labels.map((label) => (
                              <Badge key={label} variant="outline" className="text-xs">
                                {label}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="w-28">
                          <Badge
                            className={`${statusConfig[issue.status as keyof typeof statusConfig].color} border-0`}
                          >
                            {statusConfig[issue.status as keyof typeof statusConfig].label}
                          </Badge>
                        </div>

                        <div className="w-24">
                          <Badge
                            className={`${priorityConfig[issue.priority as keyof typeof priorityConfig].color} border`}
                          >
                            {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                          </Badge>
                        </div>

                        <div className="w-32">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent" />
                            <span className="text-sm text-muted-foreground">{issue.assignee}</span>
                          </div>
                        </div>

                        <div className="w-24">
                          <p className="text-sm text-muted-foreground">{issue.dueDate}</p>
                        </div>

                        <div className="w-12 text-center">
                          <p className="text-sm text-muted-foreground">{issue.comments}</p>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setViewIssue(issue)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setViewIssue(issue)}>Edit Issue</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setIssues(issues.map((it) => it.id === issue.id ? {
                                ...it,
                                status: it.status === 'open' ? 'in-progress' : it.status === 'in-progress' ? 'closed' : 'open',
                                updated: 'just now'
                              } : it))
                            }}>Change Status</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => {
                              setIssues(issues.filter((it) => it.id !== issue.id))
                              toast({ title: 'Issue deleted', description: `${issue.id} removed` })
                            }}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-12 text-center">
                      <p className="text-muted-foreground">No issues found matching your filters</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* View/Edit Issue Dialog */}
          <Dialog open={!!viewIssue} onOpenChange={(open) => { if (!open) setViewIssue(null) }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{viewIssue ? viewIssue.id : ''}</DialogTitle>
              </DialogHeader>
              {viewIssue && (
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Title</p>
                    <Input value={viewIssue.title} onChange={(e) => setViewIssue({ ...viewIssue, title: e.target.value })} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setViewIssue(null)}>Close</Button>
                    <Button onClick={() => {
                      setIssues(issues.map((it) => it.id === viewIssue.id ? { ...viewIssue, updated: 'just now' } : it))
                      setViewIssue(null)
                      toast({ title: 'Issue updated', description: `${viewIssue.id} saved` })
                    }}>Save</Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
}
