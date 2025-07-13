import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import NullPhoto from '../svg/nullfoto.svg'
import './css/FormImg.css'

const DeltsRegistro = forwardRef((props, ref) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)

  useEffect(() => {
    const registros = JSON.parse(localStorage.getItem('registro')) || []
    const registro = registros.find(r => r.id.toString() === id.toString())

    if (!registro) {
      alert('Registro não encontrado.')
      // Redireciona com leve atraso para evitar conflito com alert
      setTimeout(() => {
        navigate('/registro')
      }, 200)
    } else {
      setForm(registro)
    }
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const salvar = () => {
    const registros = JSON.parse(localStorage.getItem('registro')) || []
    const index = registros.findIndex(r => r.id.toString() === id.toString())

    if (index === -1) {
      alert('Erro ao salvar: registro não encontrado.')
      return
    }

    registros[index] = { ...registros[index], ...form }
    localStorage.setItem('registro', JSON.stringify(registros))
    alert('Registro atualizado com sucesso!')
    navigate('/registro')
  }

  useImperativeHandle(ref, () => ({
    salvar
  }))

  if (!form) return null

  return (
    <div style={{ marginTop: '6em', padding: '0em 1em', marginBottom: '13em' }}>
      <h2>Editar Registro Visual</h2>

      <div className="campRull" id='campRull'>
        <img
          src={form.imageUrl || NullPhoto}
          alt="Imagem selecionada"
          style={{ maxHeight: '14em' }}
        />
      </div>

      <div className='camp_input'>
        <label>Descrição da Imagem*</label>
        <textarea
          name="imageDescription"
          value={form.imageDescription}
          onChange={handleChange}
          placeholder="Ex: Foto de ataque de pulgões"
        />
      </div>

      <div className='camp_input'>
        <label>Data da Imagem*</label>
        <input
          type="text"
          name="imageDate"
          value={form.imageDate}
          onChange={handleChange}
          placeholder="dd/mm/aaaa"
          maxLength={10}
        />
      </div>
    </div>
  )
})

export default DeltsRegistro