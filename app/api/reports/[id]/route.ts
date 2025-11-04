import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    const report = await prisma.report.findUnique({ where: { id } })
    if (!report) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(report)
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await req.json().catch(() => ({})) as any
  try {
    const updated = await prisma.report.update({
      where: { id },
      data: {
        name: body.name,
        type: body.type,
        frequency: body.frequency,
        recipients: typeof body.recipients === 'number' ? body.recipients : undefined,
        lastGenerated: body.lastGenerated,
      },
    })
    return NextResponse.json(updated)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    await prisma.report.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
