import { useState, forwardRef, useImperativeHandle } from 'react'
import './css/Perfil.css'

const FormOperacao = forwardRef((props, ref) => {
  const [form, setForm] = useState({
    data: '',
    talhao: '',
    descricao: '',
    chuvas: '',
    custo: '',
    saude: '',
    horasTrator: '',
    volume: '',
    umidade: '',
    temperatura: ''
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleDateInput(e) {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 8) value = value.slice(0, 8)

    if (value.length > 4) {
      value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3')
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2')
    }

    setForm(prev => ({ ...prev, data: value }))
  }

    function salvar() {
        if (!form.data || !form.talhao || !form.descricao) {
            alert('Por favor, preencha os campos obrigatórios: Data, Talhão e Descrição.');
            return;
        }

        const operacoesExistentes = JSON.parse(localStorage.getItem('operacoes')) || [];
        const novaOperacao = { ...form };
        localStorage.setItem('operacoes', JSON.stringify([...operacoesExistentes, novaOperacao]));
        alert('Operação salva com sucesso!');

        setForm({
            data: '',
            talhao: '',
            descricao: '',
            chuvas: '',
            custo: '',
            saude: '',
            horasTrator: '',
            volume: '',
            umidade: '',
            temperatura: ''
        });
    }

    useImperativeHandle(ref, () => ({
        salvar
    }))

    return (
        <div style={{ marginTop: '6em', padding: '0em 1em', marginBottom: '13em' }}>
        <h2>Adicionar de Operações</h2>

        <div className='camp_input'>
            <label>Data*</label>
            <input
            type="text"
            name="data"
            placeholder="DD/MM/AAAA"
            required
            onInput={handleDateInput}
            value={form.data}
            maxLength={10}
            />
        </div>

        <div className='camp_input'>
            <label>Talhão*</label>
            <input
            type="text"
            name="talhao"
            placeholder="Ex: Cultivo de Milho"
            value={form.talhao}
            onChange={handleChange}
            required
            />
        </div>

        <div className='camp_input'>
            <label>Descrição*</label>
            <textarea
            name="descricao"
            placeholder="Ex: Ataque leve de pulgões numa 3% do campo"
            value={form.descricao}
            onChange={handleChange}
            required
            />
        </div>

        <h2>Dados Adicionais de Campo</h2>

        <div className='camp_input'>
            <label>Chuvas</label>
            <input type="text" name="chuvas" value={form.chuvas} onChange={handleChange} placeholder='Ex: 50mm' />
        </div>

        <div className='camp_input'>
            <label>Custo da Operação</label>
            <input type="text" name="custo" value={form.custo} onChange={handleChange} placeholder='Ex: R$ 1.200,00' />
        </div>

        <div className='camp_input'>
            <label>Saúde da Cultura</label>
            <input type="text" name="saude" value={form.saude} onChange={handleChange} placeholder='Ex: Regular' />
        </div>

        <div className='camp_input'>
            <label>Horas de Uso do Trator</label>
            <input type="text" name="horasTrator" value={form.horasTrator} onChange={handleChange} placeholder='Ex: 10H5' />
        </div>

        <div className='camp_input'>
            <label>Volume de Pulverização</label>
            <input type="text" name="volume" value={form.volume} onChange={handleChange} placeholder='Ex: 200L' />
        </div>

        <div className='camp_input'>
            <label>Umidade do Solo</label>
            <input type="text" name="umidade" value={form.umidade} onChange={handleChange} placeholder='Ex: 45%' />
        </div>

        <div className='camp_input'>
            <label>Temperatura do Ar</label>
            <input type="text" name="temperatura" value={form.temperatura} onChange={handleChange} placeholder='Ex: 28ºC' />
        </div>
        </div>
    )
})

export default FormOperacao