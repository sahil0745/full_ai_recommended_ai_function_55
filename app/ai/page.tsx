"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Sparkles, Send, Zap, Brain, Lightbulb, TrendingUp } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
const Sidebar = dynamic(() => import("@/components/sidebar").then(m => m.Sidebar), { ssr: false })
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SmartSuggestions } from "@/components/smart-suggestions"
import { AutomationRules } from "@/components/automation-rules"
import { AIInsights } from "@/components/ai-insights"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Message = { role: "user" | "assistant"; content: string; provider?: "perplexity" | "openai" | "mock" }

export default function AIPage() {
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI assistant. I can help you with issue triage, code review suggestions, team insights, and workflow automation. What would you like help with today?",
    },
  ])
  const [input, setInput] = useState("")
  const [provider, setProvider] = useState<"auto" | "perplexity" | "openai">("auto")
  const [model, setModel] = useState("sonar") // 👈 new model state
  const [modelInfo, setModelInfo] = useState<string>("")

  // ✅ Get environment info
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch("/api/assistant", { cache: "no-store" })
        if (!res.ok) return
        const data = await res.json()
        if (cancelled) return
        if (data?.providerDefault === "perplexity") setProvider("perplexity")
        setModelInfo(data?.perplexityModel ? String(data.perplexityModel) : "")
      } catch {}
    })()
    return () => {
      cancelled = true
    }
  }, [])

  // ✅ Handle chat message
  const handleSendMessage = async (message: string) => {
    const next: Message[] = [...chatMessages, { role: "user", content: message } as const]
    setChatMessages(next)
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next,
          provider: provider === "auto" ? undefined : provider,
          model, // 👈 send selected model
        }),
      })
      if (!res.ok) throw new Error("AI request failed")
      const data = await res.json()
      setChatMessages(prev => [
        ...prev,
        { role: "assistant", content: data.reply || "No reply", provider: data.provider },
      ])
    } catch {
      setChatMessages(prev => [
        ...prev,
        { role: "assistant", content: "AI is unavailable right now. Try again shortly." },
      ])
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <h1 className="text-3xl font-bold text-foreground">AI Assistant & Automation</h1>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Provider</span>
                <Select value={provider} onValueChange={(v: any) => setProvider(v)}>
                  <SelectTrigger size="sm" className="min-w-[140px]">
                    <SelectValue placeholder="Auto (env)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto (env)</SelectItem>
                    <SelectItem value="perplexity">Perplexity</SelectItem>
                    <SelectItem value="openai">OpenAI</SelectItem>
                  </SelectContent>
                </Select>

                {/* 👇 New Model Selector */}
                <span className="text-xs text-muted-foreground ml-4">Model</span>
                <Select value={model} onValueChange={(v: any) => setModel(v)}>
                  <SelectTrigger size="sm" className="min-w-[160px]">
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sonar">Sonar (Fast)</SelectItem>
                    <SelectItem value="sonar-pro">Sonar Pro (Smart)</SelectItem>
                  </SelectContent>
                </Select>

                {modelInfo && (
                  <span className="text-[10px] text-muted-foreground ml-2">Default: {modelInfo}</span>
                )}
              </div>
            </div>

            <p className="text-muted-foreground">
              Intelligent features to boost productivity and streamline workflows
            </p>

            {/* AI Features Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">AI Suggestions</p>
                    <p className="text-2xl font-bold text-foreground mt-1">12</p>
                    <p className="text-xs text-muted-foreground mt-1">Active this week</p>
                  </div>
                  <Brain className="w-5 h-5 text-primary" />
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Automations</p>
                    <p className="text-2xl font-bold text-foreground mt-1">8</p>
                    <p className="text-xs text-muted-foreground mt-1">Running smoothly</p>
                  </div>
                  <Zap className="w-5 h-5 text-accent" />
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Productivity Gain</p>
                    <p className="text-2xl font-bold text-foreground mt-1">34%</p>
                    <p className="text-xs text-muted-foreground mt-1">vs last month</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-chart-2" />
                </div>
              </Card>
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="assistant" className="w-full">
              <TabsList className="bg-muted mb-4">
                <TabsTrigger value="assistant">AI Chat Assistant</TabsTrigger>
                <TabsTrigger value="suggestions">Smart Suggestions</TabsTrigger>
                <TabsTrigger value="automation">Automation Rules</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
              </TabsList>

              {/* AI Chat Assistant */}
              <TabsContent value="assistant" className="space-y-4">
                <Card className="h-96 flex flex-col">
                  <div className="flex-1 overflow-auto p-4 space-y-4">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div>
                          <div
                            className={`max-w-md px-4 py-2 rounded-lg ${
                              msg.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground"
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                          </div>
                          {msg.role === "assistant" && msg.provider && (
                            <p className="text-[10px] mt-1 text-muted-foreground">
                              Provider: {msg.provider}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ask me anything about your project..."
                        className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && input.trim()) {
                            handleSendMessage(input.trim())
                            setInput("")
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => {
                          if (input.trim()) {
                            handleSendMessage(input.trim())
                            setInput("")
                          }
                        }}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Quick Actions */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Quick Commands</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="justify-start bg-transparent"
                      onClick={() => handleSendMessage("Summarize open issues")}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Summarize open issues
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start bg-transparent"
                      onClick={() => handleSendMessage("Find duplicate issues")}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Find duplicate issues
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start bg-transparent"
                      onClick={() => handleSendMessage("Assign to best team member")}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Assign to best team member
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start bg-transparent"
                      onClick={() => handleSendMessage("Estimate effort required")}
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Estimate effort required
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Smart Suggestions */}
              <TabsContent value="suggestions" className="space-y-4">
                <SmartSuggestions />
              </TabsContent>

              {/* Automation Rules */}
              <TabsContent value="automation" className="space-y-4">
                <AutomationRules />
              </TabsContent>

              {/* AI Insights */}
              <TabsContent value="insights" className="space-y-4">
                <AIInsights />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
