import { generateInsight, AIRequest } from './ai.provider'
import { supabaseAdmin } from '../../config/supabase'
import { env } from '../../config/env'

const SYSTEM_PROMPT = `Você é um agrônomo virtual especialista chamado Field X.
Analise dados de campo e gere insights práticos e acionáveis em português brasileiro.
Estruture a resposta com: Análise Geral, Alertas Detectados e Recomendações Prioritárias.`

export async function generateFarmInsight(userId: string, farmId?: string) {
  const [opsRes, sensorsRes, machineryRes] = await Promise.all([
    supabaseAdmin.from('operations').select('*').eq('user_id', userId).order('date', { ascending: false }).limit(15),
    supabaseAdmin.from('sensors').select('name,type,status,battery_level').limit(10),
    supabaseAdmin.from('machinery_telemetry').select('*').order('recorded_at', { ascending: false }).limit(5),
  ])

  const request: AIRequest = {
    systemPrompt: SYSTEM_PROMPT,
    messages: [{
      role: 'user',
      content: `Gere insights agronômicos baseado nos dados:
Operações: ${JSON.stringify(opsRes.data ?? [])}
Sensores: ${JSON.stringify(sensorsRes.data ?? [])}
Telemetria: ${JSON.stringify(machineryRes.data ?? [])}`,
    }],
    maxTokens: 2048,
    temperature: 0.6,
  }

  const response = await generateInsight(request)

  await supabaseAdmin.from('ai_insights').insert({
    user_id: userId, farm_id: farmId ?? null,
    type: 'general', title: 'Análise Agronômica',
    content: response.content, provider: response.provider,
    created_at: new Date().toISOString(),
  })

  return response
}
