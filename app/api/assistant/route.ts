import { NextResponse } from 'next/server'

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }

// ✅ Check API keys
export async function GET() {
  const hasPerplexity = Boolean(process.env.PERPLEXITY_API_KEY)
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY)

  return NextResponse.json({
    ok: true,
    hasPerplexity,
    hasOpenAI,
    perplexityModel: process.env.PERPLEXITY_MODEL || 'sonar',
    providerDefault: hasPerplexity ? 'perplexity' : hasOpenAI ? 'openai' : 'mock',
  })
}

// ✅ Chat Request Handler
export async function POST(req: Request) {
  let body: { messages?: ChatMessage[]; system?: string; provider?: 'perplexity' | 'openai' } = {}
  try {
    body = await req.json()
  } catch {}

  const messages = (body.messages ?? []).filter(m => m?.content)
  const system =
    body.system ?? 'You are a helpful AI assistant. Keep answers short and useful.'

  if (!messages.length) {
    return NextResponse.json({ reply: 'Ask me anything 🤝' })
  }

  const pplxKey = process.env.PERPLEXITY_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY
  const requested = body.provider

  // 🧩 Fix message order: keep only last user message
  const lastUserMsg = messages.reverse().find(m => m.role === 'user')
  const preparedMessages = lastUserMsg ? [{ role: 'system', content: system }, lastUserMsg] : []

  // ✅ Perplexity first
  if ((requested === 'perplexity' && pplxKey) || (requested !== 'openai' && pplxKey)) {
    try {
      const model = process.env.PERPLEXITY_MODEL || 'sonar'
      const resp = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${pplxKey}`,
        },
        body: JSON.stringify({
          model,
          messages: preparedMessages,
          temperature: 0.2,
          max_tokens: 400,
        }),
      })

      if (!resp.ok) {
        const text = await resp.text()
        console.error('❌ Perplexity API error:', resp.status, text)
        throw new Error(`Perplexity API failed with ${resp.status}`)
      }

      const data = await resp.json()
      const reply = data?.choices?.[0]?.message?.content
      if (reply) return NextResponse.json({ reply, provider: 'perplexity' })
    } catch (err: any) {
      console.error('🚨 Perplexity request failed:', err)
    }
  }

  // ✅ OpenAI fallback
  if (openaiKey) {
    try {
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages: [{ role: 'system', content: system }, ...messages],
          temperature: 0.3,
          max_tokens: 400,
        }),
      })

      if (!resp.ok) {
        const text = await resp.text()
        console.error('❌ OpenAI API error:', resp.status, text)
        throw new Error(`OpenAI API failed with ${resp.status}`)
      }

      const data = await resp.json()
      const reply = data?.choices?.[0]?.message?.content
      if (reply) return NextResponse.json({ reply, provider: 'openai' })
    } catch (err: any) {
      console.error('🚨 OpenAI request failed:', err)
    }
  }

  // ✅ Mock fallback
  const userText = messages[messages.length - 1]?.content || ''
  return NextResponse.json({
    reply: `I couldn't reach AI servers. But here's a plan: "${userText}" 🤝`,
    provider: 'mock',
  })
}
