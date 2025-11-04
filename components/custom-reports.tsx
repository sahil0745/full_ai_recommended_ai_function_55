"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Plus, Clock, Users, TrendingUp } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface Report {
  id: string
  name: string
  type: string
  lastGenerated: string
  frequency: string
  recipients: number
}

const initialReports: Report[] = [
  {
    id: "1",
    name: "Weekly Sprint Summary",
    type: "Performance",
    lastGenerated: "2 days ago",
    frequency: "Weekly",
    recipients: 12,
  },
  {
    id: "2",
    name: "Team Capacity Report",
    type: "Resource",
    lastGenerated: "4 days ago",
    frequency: "Bi-weekly",
    recipients: 8,
  },
  {
    id: "3",
    name: "Quality Metrics Dashboard",
    type: "Quality",
    lastGenerated: "1 day ago",
    frequency: "Daily",
    recipients: 6,
  },
  {
    id: "4",
    name: "Monthly Business Review",
    type: "Executive",
    lastGenerated: "10 days ago",
    frequency: "Monthly",
    recipients: 4,
  },
  {
    id: "5",
    name: "Customer Impact Analysis",
    type: "Customer",
    lastGenerated: "5 days ago",
    frequency: "Monthly",
    recipients: 3,
  },
]

const reportTemplates = [
  { name: "Executive Summary", icon: TrendingUp, description: "High-level overview for leadership" },
  { name: "Team Performance", icon: Users, description: "Individual and team metrics" },
  { name: "Project Timeline", icon: Clock, description: "Schedule and milestone tracking" },
  { name: "Quality Report", icon: FileText, description: "Defects and quality metrics" },
]

export function CustomReports() {
  const [reports, setReports] = useState<Report[]>([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Report | null>(null)
  const [name, setName] = useState("")
  const [type, setType] = useState("Performance")
  const [frequency, setFrequency] = useState("Weekly")
  const [recipients, setRecipients] = useState(5)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Try API first, fallback to localStorage, then seed defaults
    let cancelled = false
    async function load() {
      try {
        const res = await fetch('/api/reports', { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          if (!cancelled && Array.isArray(data) && data.length) {
            setReports(data)
            return
          }
        }
      } catch {}
      if (cancelled) return
      const raw = typeof window !== 'undefined' ? localStorage.getItem('reports') : null
      setReports(raw ? JSON.parse(raw) : initialReports)
    }
    load()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    localStorage.setItem('reports', JSON.stringify(reports))
  }, [reports])

  function openNew() {
    setEditing(null)
    setName("")
    setType("Performance")
    setFrequency("Weekly")
    setRecipients(5)
    setOpen(true)
  }

  function openEdit(r: Report) {
    setEditing(r)
    setName(r.name)
    setType(r.type)
    setFrequency(r.frequency)
    setRecipients(r.recipients)
    setOpen(true)
  }

  async function saveReport() {
    if (!name.trim()) return
    setLoading(true)
    try {
      if (editing) {
        const res = await fetch(`/api/reports/${editing.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, type, frequency, recipients }),
        })
        if (res.ok) {
          const updated = await res.json()
          setReports(reports.map(r => r.id === editing.id ? updated : r))
          toast({ title: 'Report updated', description: name })
        } else {
          // Local fallback
          setReports(reports.map(r => r.id === editing.id ? { ...editing, name, type, frequency, recipients } : r))
          toast({ title: 'Updated locally (offline)', description: name })
        }
      } else {
        const res = await fetch('/api/reports', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, type, frequency, recipients, lastGenerated: 'just now' }),
        })
        if (res.ok) {
          const created = await res.json()
          setReports([created, ...reports])
          toast({ title: 'Report created', description: name })
        } else {
          const id = Date.now().toString()
          setReports([{ id, name, type, lastGenerated: 'just now', frequency, recipients }, ...reports])
          toast({ title: 'Created locally (offline)', description: name })
        }
      }
    } catch {
      if (editing) {
        setReports(reports.map(r => r.id === editing.id ? { ...editing, name, type, frequency, recipients } : r))
        toast({ title: 'Updated locally (offline)', description: name })
      } else {
        const id = Date.now().toString()
        setReports([{ id, name, type, lastGenerated: 'just now', frequency, recipients }, ...reports])
        toast({ title: 'Created locally (offline)', description: name })
      }
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  function exportCSV(r: Report) {
    const headers = ['id','name','type','lastGenerated','frequency','recipients']
    const values = headers.map(h => (r as any)[h])
    const csv = headers.join(',') + '\n' + values.join(',')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${r.name.replace(/\s+/g,'_')}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  function exportPDF() {
    // Fallback to print dialog as a simple PDF export of the current view
    window.print()
  }

  async function shareLink(r: Report) {
    const link = `${location.origin}/analytics#report-${r.id}`
    try {
      await navigator.clipboard.writeText(link)
      toast({ title: 'Share link copied', description: link })
    } catch {
      toast({ title: 'Share link', description: link })
    }
  }

  function scheduleEmail(r: Report) {
    toast({ title: 'Email schedule set', description: `${r.name} will be emailed ${r.frequency.toLowerCase()}` })
  }
  return (
    <div className="space-y-4">
      {/* Create Report Section */}
      <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">Create Custom Report</h3>
            <p className="text-sm text-muted-foreground mt-1">Generate insights tailored to your needs</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90" onClick={openNew}>
            <Plus className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </div>
      </Card>

      {/* Report Templates */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Popular Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {reportTemplates.map((template) => {
            const Icon = template.icon
            return (
              <Card key={template.name} className="p-4 hover:border-primary cursor-pointer transition-colors group">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                  <h4 className="font-medium text-foreground text-sm">{template.name}</h4>
                </div>
                <p className="text-xs text-muted-foreground">{template.description}</p>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Existing Reports */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Scheduled Reports</h3>
        <div className="space-y-2">
          {reports.map((report) => (
            <Card key={report.id} className="p-4 hover:border-primary transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{report.name}</h4>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">{report.type}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {report.frequency}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="w-3 h-3" /> {report.recipients} recipients
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Last generated: {report.lastGenerated}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(report)}>
                    View
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => openEdit(report)}>
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Export & Sharing</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Button variant="outline" className="justify-start bg-transparent" onClick={exportPDF}>
            <FileText className="w-4 h-4 mr-2" />
            Export as PDF
          </Button>
          <Button variant="outline" className="justify-start bg-transparent" onClick={() => reports[0] && exportCSV(reports[0])}>
            <FileText className="w-4 h-4 mr-2" />
            Export as CSV
          </Button>
          <Button variant="outline" className="justify-start bg-transparent" onClick={() => reports[0] && scheduleEmail(reports[0])}>
            Export Email Schedule
          </Button>
          <Button variant="outline" className="justify-start bg-transparent" onClick={() => reports[0] && shareLink(reports[0])}>
            Share Link
          </Button>
        </div>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Report' : 'Create Report'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-sm block mb-1">Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Report name" />
            </div>
            <div>
              <label className="text-sm block mb-1">Type</label>
              <Input value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm block mb-1">Frequency</label>
                <Input value={frequency} onChange={(e) => setFrequency(e.target.value)} placeholder="e.g. Weekly" />
              </div>
              <div>
                <label className="text-sm block mb-1">Recipients</label>
                <Input type="number" value={recipients} onChange={(e) => setRecipients(parseInt(e.target.value || '0'))} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
              <Button onClick={saveReport} disabled={loading}>{editing ? (loading ? 'Saving...' : 'Save') : (loading ? 'Creating...' : 'Create')}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
