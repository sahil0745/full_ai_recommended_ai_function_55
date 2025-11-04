import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.report.findMany({ orderBy: { updatedAt: 'desc' } })
    return NextResponse.json(items)
  } catch (e) {
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({})) as any
  const id = body.id || (globalThis.crypto?.randomUUID?.() ?? Date.now().toString())
  try {
    const created = await prisma.report.create({
      data: {
        id,
        name: body.name ?? 'Untitled Report',
        type: body.type ?? 'Performance',
        lastGenerated: body.lastGenerated ?? 'just now',
        frequency: body.frequency ?? 'Weekly',
        recipients: typeof body.recipients === 'number' ? body.recipients : 1,
      },
    })
    return NextResponse.json(created)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create report' }, { status: 500 })
  }
}
