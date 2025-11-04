import { NextResponse } from 'next/server'

// Ensure Node.js runtime (needed for fs/path usage)
export const runtime = 'nodejs'
import { promises as fs } from 'fs'
import path from 'path'
import { prisma } from '@/lib/prisma'

const dataDir = path.join(process.cwd(), 'data')
const settingsFile = path.join(dataDir, 'settings.json')
const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

async function ensureFiles() {
  try { await fs.mkdir(dataDir, { recursive: true }) } catch {}
  try { await fs.mkdir(uploadsDir, { recursive: true }) } catch {}
  try { await fs.access(settingsFile) } catch {
    const defaults = {
      fullName: 'Alex Chen',
      email: 'alex.chen@devflow.io',
      emailNotifications: true,
      slackNotifications: false,
      twoFactor: false,
      avatarUrl: ''
    }
    await fs.writeFile(settingsFile, JSON.stringify(defaults, null, 2), 'utf-8')
  }
}

export async function GET() {
  // Try DB first
  try {
    let settings = await prisma.userSetting.findUnique({ where: { id: 1 } })
    if (!settings) {
      settings = await prisma.userSetting.create({
        data: {
          id: 1,
          fullName: 'Alex Chen',
          email: 'alex.chen@devflow.io',
          emailNotifications: true,
          slackNotifications: false,
          twoFactor: false,
          avatarUrl: ''
        }
      })
    }
    return NextResponse.json(settings)
  } catch (e) {
    // Fallback to file-backed store
    await ensureFiles()
    const raw = await fs.readFile(settingsFile, 'utf-8')
    return NextResponse.json(JSON.parse(raw))
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({})) as any

  // Handle avatar upload (both DB and fallback write the image file)
  if (body.avatarDataUrl && typeof body.avatarDataUrl === 'string') {
    const match = body.avatarDataUrl.match(/^data:(.+);base64,(.+)$/)
    if (!match) return NextResponse.json({ error: 'Invalid avatar data' }, { status: 400 })
    const mime = match[1]
    const b64 = match[2]
    const buf = Buffer.from(b64, 'base64')
    const ext = mime.split('/')[1] || 'png'
    const filename = `profile-${Date.now()}.${ext}`
    const filePath = path.join(uploadsDir, filename)
    try { await fs.mkdir(uploadsDir, { recursive: true }) } catch {}
    await fs.writeFile(filePath, buf)

    // Try DB first
    try {
      const updated = await prisma.userSetting.upsert({
        where: { id: 1 },
        update: { avatarUrl: `/uploads/${filename}` },
        create: {
          id: 1,
          fullName: 'Alex Chen',
          email: 'alex.chen@devflow.io',
          emailNotifications: true,
          slackNotifications: false,
          twoFactor: false,
          avatarUrl: `/uploads/${filename}`
        }
      })
      return NextResponse.json(updated)
    } catch (e) {
      // Fallback to file store
      await ensureFiles()
      const current = JSON.parse(await fs.readFile(settingsFile, 'utf-8'))
      const next = { ...current, avatarUrl: `/uploads/${filename}` }
      await fs.writeFile(settingsFile, JSON.stringify(next, null, 2), 'utf-8')
      return NextResponse.json(next)
    }
  }

  // Update fields
  try {
    const allowed: Array<keyof any> = ['fullName','email','emailNotifications','slackNotifications','twoFactor']
    const data: any = {}
    for (const key of allowed) if (key in body) data[key] = body[key]
    const updated = await prisma.userSetting.upsert({
      where: { id: 1 },
      update: data,
      create: {
        id: 1,
        fullName: body.fullName ?? 'Alex Chen',
        email: body.email ?? 'alex.chen@devflow.io',
        emailNotifications: body.emailNotifications ?? true,
        slackNotifications: body.slackNotifications ?? false,
        twoFactor: body.twoFactor ?? false,
        avatarUrl: ''
      }
    })
    return NextResponse.json(updated)
  } catch (e) {
    // Fallback to file store
    await ensureFiles()
    const current = JSON.parse(await fs.readFile(settingsFile, 'utf-8'))
    const allowed = ['fullName', 'email', 'emailNotifications', 'slackNotifications', 'twoFactor']
    const next: any = { ...current }
    for (const key of allowed) {
      if (key in body) next[key] = body[key]
    }
    await fs.writeFile(settingsFile, JSON.stringify(next, null, 2), 'utf-8')
    return NextResponse.json(next)
  }
}
