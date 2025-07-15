import { useEffect, useState } from 'react'
import { callGeminiApi } from './callGeminiApi'

function InsightIA() {
  const [insight, setInsight] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    async function gerarInsight() {
      setCarregando(true)

      const operacoes = JSON.parse(localStorage.getItem('operacoes')) || []
      const dispositivos = JSON.parse(localStorage.getItem('dispositivos')) || []

      const prompt = `
        Você é um consultor agrônomo com acesso a dados de campo e sensores/equipamentos. 
        Analise os dados a seguir e gere insights estratégicos para o produtor rural, como:
        - riscos detectados (doenças, climas extremos)
        - oportunidades de melhoria
        - ações sugeridas
        - problemas recorrentes
        Dados de campo: ${JSON.stringify(operacoes)}
        Dispositivos: ${JSON.stringify(dispositivos)}
      `

      try {
        const respostaIA = await callGeminiApi(prompt)
        setInsight(respostaIA)
      } catch (err) {
        setInsight(`Erro ao gerar insights: ${err.message}`)
      }

      setCarregando(false)
    }

    gerarInsight()
  }, [])

  return (
    <div style={{ marginTop: '6em', padding: '0em 1em', marginBottom: '7.7em' }}>
      <h2>Insight Inteligente da IA</h2>
      {carregando ? (
        <p>Analisando os dados com inteligência artificial...</p>
      ) : (
        <pre style={{ background: '#f0f0f0', padding: '1em', borderRadius: '8px', whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word',}}>
          {insight}
        </pre>
      )}
    </div>
  )
}

export default InsightIA