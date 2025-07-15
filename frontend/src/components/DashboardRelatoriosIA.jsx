import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import InsightIAFromSupabase from './InsightIAFromSupabase'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

function DashboardRelatoriosIA() {
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDados() {
      const { data, error } = await supabase
        .from('relatorios_maquinas')
        .select('*')
        .order('ultima_atualizacao', { ascending: false })

      if (!error) setDados(data)
      setLoading(false)
    }

    fetchDados()
  }, [])

  return (
    <div style={{ marginTop: '6em', padding: '0em 1em', marginBottom: '7.7em' }}>
      <h2>Dashboard</h2>

      {loading ? (
        <p>🔄 Carregando dados dos computadores de bordo...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dados.map((item) => (
              <div key={item.id} className="p-4 border rounded shadow">
                <h2 className="text-lg font-semibold">{item.maquina}</h2>
                <p>⏱ {item.horas_uso}h</p>
                <p>⛽ {item.combustivel_usado} L</p>
                <p>🌾 {item.area_trabalhada} ha</p>
                <p>🔥 {item.temperatura_motor} °C</p>
                <p className="text-sm text-gray-500">📅 {new Date(item.ultima_atualizacao).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <InsightIAFromSupabase dadosMaquinas={dados} />
        </>
      )}
    </div>
  )
}

export default DashboardRelatoriosIA