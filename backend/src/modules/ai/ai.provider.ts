import { env } from '../../config/env'

export interface AIMessage { role: 'user' | 'assistant'; content: string }
export interface AIRequest { messages: AIMessage[]; systemPrompt?: string; maxTokens?: number; temperature?: number }
export interface AIResponse { content: string; provider: string; tokensUsed?: number }

async function callGemini(req: AIRequest): Promise<AIResponse> {
  if (!env.ai.geminiKey) throw new Error('GEMINI_API_KEY não configurada.')
  const body = {
    contents: req.messages.map((m) => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] })),
    ...(req.systemPrompt && { systemInstruction: { parts: [{ text: req.systemPrompt }] } }),
    generationConfig: { maxOutputTokens: req.maxTokens ?? 2048, temperature: req.temperature ?? 0.7 },
  }
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.ai.geminiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  const json = await res.json() as any
  if (!res.ok) throw new Error(json.error?.message ?? 'Erro na API Gemini')
  const content = json.candidates?.[0]?.content?.parts?.[0]?.text
  if (!content) throw new Error('Resposta inesperada da API Gemini.')
  return { content, provider: 'gemini' }
}

async function callOpenAI(req: AIRequest): Promise<AIResponse> {
  if (!env.ai.openaiKey) throw new Error('OPENAI_API_KEY não configurada.')
  const messages = []
  if (req.systemPrompt) messages.push({ role: 'system', content: req.systemPrompt })
  messages.push(...req.messages)
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.ai.openaiKey}` },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages, max_tokens: req.maxTokens ?? 2048, temperature: req.temperature ?? 0.7 }),
  })
  const json = await res.json() as any
  if (!res.ok) throw new Error(json.error?.message ?? 'Erro na API OpenAI')
  return { content: json.choices[0].message.content, provider: 'openai', tokensUsed: json.usage?.total_tokens }
}

async function callClaude(req: AIRequest): Promise<AIResponse> {
  if (!env.ai.anthropicKey) throw new Error('ANTHROPIC_API_KEY não configurada.')
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': env.ai.anthropicKey, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: req.maxTokens ?? 2048, ...(req.systemPrompt && { system: req.systemPrompt }), messages: req.messages }),
  })
  const json = await res.json() as any
  if (!res.ok) throw new Error(json.error?.message ?? 'Erro na API Claude')
  return { content: json.content[0].text, provider: 'claude', tokensUsed: json.usage?.input_tokens + json.usage?.output_tokens }
}

export async function generateInsight(req: AIRequest): Promise<AIResponse> {
  switch (env.ai.provider) {
    case 'openai': return callOpenAI(req)
    case 'claude': return callClaude(req)
    default: return callGemini(req)
  }
}
