import { useState, forwardRef, useImperativeHandle } from 'react'
import './css/Perfil.css'

const FormAtividades = forwardRef((props, ref) => {
  const [tipoSelecionado, setTipoSelecionado] = useState('sensor') // 'sensor' ou 'equipamento'

  const [form, setForm] = useState({
    nome: '',
    tipo: '',
    fabricante: '',
    talhao: '',

    // Sensor
    unidadeMedida: '',
    intervaloColeta: '',
    bateria: '',
    conectividade: '',
    status: '',

    // Equipamento
    modelo: '',
    anoFabricacao: '',
    horasTrator: '',
    volume: ''
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function salvar() {
    if (!form.nome || !form.tipo || !form.fabricante || !form.talhao) {
      alert('Por favor, preencha os campos obrigatórios: Nome, Tipo, Fabricante e Talhão.')
      return
    }

    if (!tipoSelecionado) {
      alert('Selecione se o dispositivo é um Sensor ou um Equipamento.')
      return
    }

    const dispositivo = {
      tipoDispositivo: tipoSelecionado,
      ...form
    }

    const dispositivosSalvos = JSON.parse(localStorage.getItem('dispositivos')) || []
    localStorage.setItem('dispositivos', JSON.stringify([...dispositivosSalvos, dispositivo]))

    alert('Dispositivo salvo com sucesso!')

    setForm({
      nome: '',
      tipo: '',
      fabricante: '',
      talhao: '',
      unidadeMedida: '',
      intervaloColeta: '',
      bateria: '',
      conectividade: '',
      status: '',
      modelo: '',
      anoFabricacao: '',
      horasTrator: '',
      volume: ''
    })

    setTipoSelecionado('')
  }

  useImperativeHandle(ref, () => ({
    salvar
  }))

  return (
    <div style={{ marginTop: '6em', padding: '0em 1em', marginBottom: '13em' }}>
      <h2>Adicionar Dispositivo</h2>

      {/* Botões para selecionar o tipo */}
      <div style={{ display: 'flex', gap: '2em', marginBottom: '1em', justifyContent: 'center'}} className='dispor'>
        <button
          className={tipoSelecionado === 'sensor' ? 'ativo' : ''}
          onClick={() => setTipoSelecionado('sensor')}
        >
          Sensor
        </button>
        <button
          className={tipoSelecionado === 'equipamento' ? 'ativo' : ''}
          onClick={() => setTipoSelecionado('equipamento')}
        >
          Equipamento
        </button>
      </div>

      {/* Campos comuns */}
      <div className='camp_input'>
        <label>Nome*</label>
        <input
          type="text"
          name="nome"
          placeholder="Ex: 5078E Solo A"
          value={form.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div className='camp_input'>
        <label>Tipo*</label>
        <input
          type="text"
          name="tipo"
          placeholder="Ex: Trator ou Temperatura"
          value={form.tipo}
          onChange={handleChange}
          required
        />
      </div>

      <div className='camp_input'>
        <label>Fabricante*</label>
        <input
          type="text"
          name="fabricante"
          placeholder="Ex: John Deere ou Agrosens"
          value={form.fabricante}
          onChange={handleChange}
          required
        />
      </div>

      <div className='camp_input'>
        <label>Talhão*</label>
        <input
          type="text"
          name="talhao"
          placeholder="Ex: Talhão 3"
          value={form.talhao}
          onChange={handleChange}
          required
        />
      </div>

      {/* Campos para SENSOR */}
      {tipoSelecionado === 'sensor' && (
        <>
          <h2>Dados do Sensor</h2>
          <div className='camp_input'>
            <label>Unidade de Medida</label>
            <input type="text" name="unidadeMedida" value={form.unidadeMedida} onChange={handleChange} placeholder='Ex: % ou ºC' />
          </div>
          <div className='camp_input'>
            <label>Intervalo de Coleta</label>
            <input type="text" name="intervaloColeta" value={form.intervaloColeta} onChange={handleChange} placeholder='Ex: 15min' />
          </div>
          <div className='camp_input'>
            <label>Bateria</label>
            <input type="text" name="bateria" value={form.bateria} onChange={handleChange} placeholder='Ex: 90%' />
          </div>
          <div className='camp_input'>
            <label>Conectividade</label>
            <input type="text" name="conectividade" value={form.conectividade} onChange={handleChange} placeholder='Ex: LoRa, Wi-Fi' />
          </div>
          <div className='camp_input'>
            <label>Status</label>
            <input type="text" name="status" value={form.status} onChange={handleChange} placeholder='Ex: Ativo' />
          </div>
        </>
      )}

      {/* Campos para EQUIPAMENTO */}
      {tipoSelecionado === 'equipamento' && (
        <>
          <h2>Dados do Equipamento</h2>
          <div className='camp_input'>
            <label>Modelo</label>
            <input type="text" name="modelo" value={form.modelo} onChange={handleChange} placeholder='Ex: 4707' />
          </div>
          <div className='camp_input'>
            <label>Ano de Fabricação</label>
            <input type="text" name="anoFabricacao" value={form.anoFabricacao} onChange={handleChange} placeholder='Ex: 2020' />
          </div>
          <div className='camp_input'>
            <label>Horas de Uso</label>
            <input type="text" name="horasTrator" value={form.horasTrator} onChange={handleChange} placeholder='Ex: 120H' />
          </div>
          <div className='camp_input'>
            <label>Volume de Pulverização</label>
            <input type="text" name="volume" value={form.volume} onChange={handleChange} placeholder='Ex: 200L' />
          </div>
          <div className='camp_input'>
            <label>Conectividade</label>
            <input type="text" name="conectividade" value={form.conectividade} onChange={handleChange} placeholder='Ex: 4G, Wi-Fi' />
          </div>
        </>
      )}
    </div>
  )
})

export default FormAtividades
