"use client"

import { useRef, useState } from "react"
import { Users, MessageSquare, FolderOpen, Clock, Image as ImageIcon, Paperclip, Smile } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TeamMemberCard } from "@/components/team-member-card"
import { MessageThread } from "@/components/message-thread"
import { WorkspaceCard } from "@/components/workspace-card"
import { CollaborationActivity } from "@/components/collaboration-activity"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function TeamPage() {
  const conversations = [
    { name: 'Sarah Chen', messages: [
      { from: 'them', text: "Hey, how's the new feature coming along?", at: '2:45 PM' },
      { from: 'me', text: 'Almost done! Just finishing unit tests', at: '2:48 PM' },
      { from: 'them', text: "Great! Let me review once it's ready", at: '2:50 PM' },
    ]},
    { name: 'Marcus Johnson', messages: [
      { from: 'them', text: 'Can we sync about the roadmap?', at: '9:12 AM' },
    ]},
    { name: 'Team Standup', isGroup: true, messages: [
      { from: 'them', text: 'Standup in 5 minutes', at: '8:55 AM' },
    ]},
  ] as any[]

  const [active, setActive] = useState(conversations[0])
  const [draft, setDraft] = useState("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Team Collaboration Hub</h1>
              <p className="text-muted-foreground">Manage your team, communicate, and collaborate on shared projects</p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Team Members</p>
                    <p className="text-2xl font-bold text-foreground mt-1">12</p>
                  </div>
                  <Users className="w-5 h-5 text-primary" />
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Chats</p>
                    <p className="text-2xl font-bold text-foreground mt-1">8</p>
                  </div>
                  <MessageSquare className="w-5 h-5 text-accent" />
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Shared Workspaces</p>
                    <p className="text-2xl font-bold text-foreground mt-1">5</p>
                  </div>
                  <FolderOpen className="w-5 h-5 text-chart-2" />
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Recent Activities</p>
                    <p className="text-2xl font-bold text-foreground mt-1">24</p>
                  </div>
                  <Clock className="w-5 h-5 text-chart-3" />
                </div>
              </Card>
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="members" className="w-full">
              <TabsList className="bg-muted mb-4">
                <TabsTrigger value="members">Team Members</TabsTrigger>
                <TabsTrigger value="messaging">Messages</TabsTrigger>
                <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              {/* Team Members Tab */}
              <TabsContent value="members" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <TeamMemberCard
                    name="Sarah Chen"
                    role="Senior Developer"
                    status="online"
                    avatar="SC"
                    projects={3}
                    issues={5}
                  />
                  <TeamMemberCard
                    name="Marcus Johnson"
                    role="Product Manager"
                    status="online"
                    avatar="MJ"
                    projects={2}
                    issues={8}
                  />
                  <TeamMemberCard
                    name="Alex Rivera"
                    role="Design Lead"
                    status="away"
                    avatar="AR"
                    projects={4}
                    issues={3}
                  />
                  <TeamMemberCard
                    name="Emma Wilson"
                    role="QA Engineer"
                    status="online"
                    avatar="EW"
                    projects={2}
                    issues={12}
                  />
                  <TeamMemberCard
                    name="James Park"
                    role="DevOps Engineer"
                    status="offline"
                    avatar="JP"
                    projects={1}
                    issues={2}
                  />
                  <TeamMemberCard
                    name="Lisa Anderson"
                    role="Full Stack Developer"
                    status="online"
                    avatar="LA"
                    projects={3}
                    issues={6}
                  />
                </div>
              </TabsContent>

              {/* Messaging Tab */}
              <TabsContent value="messaging" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Message List */}
                  <div className="lg:col-span-1">
                    <Card className="divide-y divide-border">
                      <div className="p-4 space-y-2">
                        <h3 className="font-semibold text-foreground mb-4">Recent Conversations</h3>
                        <MessageThread
                          name="Sarah Chen"
                          preview="Sure, I'll review the PR today"
                          unread={false}
                          avatar="SC"
                          onClick={() => setActive(conversations.find(c => c.name==='Sarah Chen'))}
                        />
                        <MessageThread
                          name="Team Standup"
                          preview="You: Thanks everyone for the update"
                          unread={false}
                          avatar="TS"
                          isGroup
                          onClick={() => setActive(conversations.find(c => c.name==='Team Standup'))}
                        />
                        <MessageThread
                          name="Marcus Johnson"
                          preview="Can we sync about the roadmap?"
                          unread={true}
                          avatar="MJ"
                          onClick={() => setActive(conversations.find(c => c.name==='Marcus Johnson'))}
                        />
                        <MessageThread
                          name="Design Review"
                          preview="Alex: New mockups are ready for review"
                          unread={true}
                          avatar="DR"
                          isGroup
                        />
                      </div>
                    </Card>
                  </div>

                  {/* Chat Window */}
                  <div className="lg:col-span-2">
                    <Card className="h-96 flex flex-col">
                      <div className="p-4 border-b border-border">
                        <h3 className="font-semibold text-foreground">{active?.name}</h3>
                        <p className="text-xs text-muted-foreground">{active?.isGroup ? 'Group' : 'Online now'}</p>
                      </div>

                      <div className="flex-1 overflow-auto p-4 space-y-4">
                        {active?.messages?.map((m: any, i: number) => (
                          <div key={i} className={m.from === 'me' ? 'text-right' : 'text-left'}>
                            <div className={m.from === 'me' ? 'inline-block bg-primary text-primary-foreground rounded-lg px-4 py-2' : 'inline-block bg-muted rounded-lg px-4 py-2'}>
                              <p className="text-sm">{m.text}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{m.at}</p>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 border-t border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <input ref={fileInputRef} type="file" multiple className="hidden" />
                          <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}>
                            <Paperclip className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}>
                            <ImageIcon className="w-4 h-4" />
                          </Button>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Smile className="w-4 h-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 grid grid-cols-6 gap-1">
                              {['😀','😂','👍','🙏','🚀','🎉','❤️','🔥','✨','💡','✅','🙌'].map(e => (
                                <button key={e} className="text-xl" onClick={() => setDraft((d: string) => d + e)}>{e}</button>
                              ))}
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="flex gap-2">
                          <input
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && draft.trim()) {
                                const msg = { from: 'me', text: draft.trim(), at: new Date().toLocaleTimeString() }
                                setActive((prev: any) => ({ ...prev, messages: [...prev.messages, msg] }))
                                setDraft('')
                              }
                            }}
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                          />
                          <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => {
                            if (!draft.trim()) return
                            const msg = { from: 'me', text: draft.trim(), at: new Date().toLocaleTimeString() }
                            setActive((prev: any) => ({ ...prev, messages: [...prev.messages, msg] }))
                            setDraft('')
                          }}>
                            Send
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Workspaces Tab */}
              <TabsContent value="workspaces" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <WorkspaceCard
                    name="Frontend Development"
                    description="Main frontend codebase and UI components"
                    members={5}
                    files={342}
                    lastUpdated="2 hours ago"
                  />
                  <WorkspaceCard
                    name="Backend API"
                    description="REST API and database schema"
                    members={4}
                    files={156}
                    lastUpdated="30 mins ago"
                  />
                  <WorkspaceCard
                    name="Design System"
                    description="Shared design tokens and component library"
                    members={3}
                    files={89}
                    lastUpdated="5 hours ago"
                  />
                  <WorkspaceCard
                    name="DevOps & Infrastructure"
                    description="Deployment configs and monitoring"
                    members={2}
                    files={54}
                    lastUpdated="1 day ago"
                  />
                  <WorkspaceCard
                    name="QA Test Suite"
                    description="Automated tests and test documentation"
                    members={2}
                    files={127}
                    lastUpdated="3 hours ago"
                  />
                  <Card className="p-6 flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors">
                    <Button variant="outline">Create New Workspace</Button>
                    <p className="text-xs text-muted-foreground mt-2">or invite your team to collaborate</p>
                  </Card>
                </div>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-4">
                <CollaborationActivity />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
