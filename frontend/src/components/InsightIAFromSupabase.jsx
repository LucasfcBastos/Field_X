import { useEffect, useState } from 'react'
import { callGeminiApi } from './callGeminiApi'

function InsightIAFromSupabase({ dadosMaquinas }) {
  const [insight, setInsight] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    if (!dadosMaquinas || dadosMaquinas.length === 0) return;

    async function gerarInsight() {
      setCarregando(true)

      const prompt = `
        Você é um especialista em telemetria agrícola.
        Analise os seguintes dados operacionais vindos dos computadores de bordo das máquinas agrícolas.
        Gere insights úteis para o gestor, como:
        - alertas de operação (temperatura alta, falhas)
        - comparativo de eficiência
        - máquinas que precisam de manutenção
        - sugestões para melhorar o desempenho

        Dados coletados:
        ${JSON.stringify(dadosMaquinas)}
      `

      const resposta = await callGeminiApi(prompt)
      setInsight(resposta)
      setCarregando(false)
    }

    gerarInsight()
  }, [dadosMaquinas])

  return (
    <div>
      <h2>Insights do Computador de Bordo (IA)</h2>
      {carregando ? (
        <p>Gerando insights com inteligência artificial...</p>
      ) : (
        <pre>
          {insight}
        </pre>
      )}
    </div>
  )
}

export default InsightIAFromSupabase
