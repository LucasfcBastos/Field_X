/**
 * AIProvider — interface única para múltiplos provedores de IA.
 * Troque o provedor alterando EXPO_PUBLIC_AI_PROVIDER no .env
 * sem alterar nenhuma regra de negócio.
 */

export type AIProviderType = 'gemini' | 'openai' | 'claude'

export interface AIMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface AIRequest {
  messages: AIMessage[]
  systemPrompt?: string
  maxTokens?: number
  temperature?: number
}

export interface AIResponse {
  content: string
  provider: AIProviderType
  tokensUsed?: number
}

async function callGemini(request: AIRequest): Promise<AIResponse> {
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY
  if (!apiKey) throw new Error('EXPO_PUBLIC_GEMINI_API_KEY não configurada.')

  const body = {
    contents: request.messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    })),
    ...(request.systemPrompt && {
      systemInstruction: { parts: [{ text: request.systemPrompt }] },
    }),
    generationConfig: {
      maxOutputTokens: request.maxTokens ?? 2048,
      temperature: request.temperature ?? 0.7,
    },
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
  )
  const json = await res.json()

  if (!res.ok) throw new Error(json.error?.message ?? 'Erro na API Gemini')

  const content = json.candidates?.[0]?.content?.parts?.[0]?.text
  if (!content) throw new Error('Resposta inesperada da API Gemini.')

  return { content, provider: 'gemini' }
}

async function callBackendAI(request: AIRequest): Promise<AIResponse> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000'
  const res = await fetch(`${apiUrl}/ai/insights`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })
  if (!res.ok) {
    const json = await res.json().catch(() => ({}))
    throw new Error(json.message ?? 'Erro ao chamar backend IA')
  }
  return res.json()
}

export async function generateInsight(request: AIRequest): Promise<AIResponse> {
  const provider = (process.env.EXPO_PUBLIC_AI_PROVIDER ?? 'gemini') as AIProviderType

  switch (provider) {
    case 'gemini':
      return callGemini(request)
    case 'openai':
    case 'claude':
      return callBackendAI(request)
    default:
      return callGemini(request)
  }
}

export function buildAgronomyPrompt(context: {
  operations?: object[]
  sensors?: object[]
  machinery?: object[]
  weather?: object
}): AIRequest {
  return {
    systemPrompt: `Você é um agrônomo virtual especialista chamado Field X.
Sua missão é analisar dados de campo e gerar insights práticos e acionáveis para o produtor rural.
Responda sempre em português brasileiro de forma clara, objetiva e técnica.
Estruture sua resposta com: Análise, Alertas (se houver) e Recomendações.`,
    messages: [
      {
        role: 'user',
        content: `Analise os seguintes dados da propriedade rural e gere insights agronômicos:

${context.operations?.length ? `Operações de campo recentes: ${JSON.stringify(context.operations)}` : ''}
${context.sensors?.length ? `Leituras de sensores: ${JSON.stringify(context.sensors)}` : ''}
${context.machinery?.length ? `Dados de maquinário: ${JSON.stringify(context.machinery)}` : ''}
${context.weather ? `Condições climáticas: ${JSON.stringify(context.weather)}` : ''}

Gere insights sobre: riscos de pragas/doenças, eficiência operacional, saúde da lavoura e recomendações.`,
      },
    ],
  }
}
