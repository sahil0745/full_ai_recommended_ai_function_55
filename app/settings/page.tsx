"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Settings, Bell, Lock, Palette, LogOut, Save } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [fullName, setFullName] = useState("Alex Chen")
  const [email, setEmail] = useState("alex.chen@devflow.io")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [slackNotifications, setSlackNotifications] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string>("")
  const fileRef = useRef<HTMLInputElement | null>(null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          setFullName(data.fullName ?? fullName)
          setEmail(data.email ?? email)
          setEmailNotifications(!!data.emailNotifications)
          setSlackNotifications(!!data.slackNotifications)
          setTwoFactor(!!data.twoFactor)
          setAvatarUrl(data.avatarUrl ?? '')
        }
      } catch {}
    })()
  }, [])

  const handleSaveProfile = async () => {
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, emailNotifications, slackNotifications, twoFactor }),
    })
    // simple UX feedback
    alert('Profile saved successfully!')
  }

  const handleUpload = async (file: File) => {
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ avatarDataUrl: dataUrl }),
    })
    if (res.ok) {
      const data = await res.json()
      setAvatarUrl(data.avatarUrl)
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
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-6 h-6 text-primary" />
                <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              </div>
              <p className="text-muted-foreground">Manage your account, preferences, and notifications</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="bg-muted mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Profile Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground mb-2 block">Full Name</Label>
                      <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-muted border-border"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-foreground mb-2 block">Email Address</Label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-muted border-border"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="pt-4">
                      <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={handleSaveProfile}>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Avatar Section */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Profile Picture</h2>
                  <div className="flex items-center gap-4">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="avatar" className="w-16 h-16 rounded-full object-cover border" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent" />
                    )}
                    <div>
                      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
                        const f = e.target.files?.[0]
                        if (f) handleUpload(f)
                      }} />
                      <Button variant="outline" onClick={() => fileRef.current?.click()}>Upload Photo</Button>
                      <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max 5MB</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Notification Preferences
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">Slack Notifications</p>
                        <p className="text-sm text-muted-foreground">Send alerts to Slack</p>
                      </div>
                      <Switch checked={slackNotifications} onCheckedChange={setSlackNotifications} />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    Display Preferences
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">Use dark theme</p>
                      </div>
                      <Switch checked={theme === 'dark'} onCheckedChange={(v) => setTheme(v ? 'dark' : 'light')} />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    Security Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Enable 2FA for your account</p>
                      </div>
                      <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                    </div>

                    <div className="pt-4">
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </div>
                </Card>

                {/* Logout Section */}
                <Card className="p-6 bg-destructive/5 border-destructive/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Log Out</p>
                      <p className="text-sm text-muted-foreground">Sign out from all devices</p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
