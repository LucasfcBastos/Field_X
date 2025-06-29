import { useState, useEffect, useRef } from 'react'
import NullPhoto from '../svg/nullfoto.svg'

import './css/Perfil.css'

function FormPerfil() {
  const [fotoAtual, setFotoAtual] = useState(null) // Imagem que o usuário acabou de enviar
  const [fotoSalva, setFotoSalva] = useState(null) // Imagem vinda do localStorage
  const [nome, setNome] = useState('')
  const [fazenda, setFazenda] = useState('')
  const fileInputRef = useRef(null)

  // Carregar dados salvos
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('perfil'))
    if (savedData) {
      setNome(savedData.nome || '')
      setFazenda(savedData.fazenda || '')
      setFotoSalva(savedData.foto || null)
    }
  }, [])

  // Converter imagem para Base64
  const handleFotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFotoAtual(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const salvarPerfil = () => {
    const dados = {
      nome,
      fazenda,
      foto: fotoAtual || fotoSalva || null
    }
    localStorage.setItem('perfil', JSON.stringify(dados))
    setFotoSalva(dados.foto)
    alert('Dados salvos com sucesso!')
  }

  // Prioridade da imagem
  const imagemExibida = fotoAtual || fotoSalva || NullPhoto

  return (
    <div style={{ marginTop: '6em', padding: '0em 1em', marginBottom: '7.7em' }}>
      <div className='user'>
        <input type="file" accept="image/*" onChange={handleFotoChange} ref={fileInputRef} style={{ display: 'none' }} />
        <img src={imagemExibida} onClick={() => fileInputRef.current.click()} className={imagemExibida === NullPhoto ? 'mar' : ''} />
      </div>

      <div className='camp_input' style={{ marginBottom: '15px' }}>
        <label>Nome do Usuário</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className='camp_input' style={{ marginBottom: '15px' }}>
        <label>Nome da Fazenda</label>
        <input
          type="text"
          value={fazenda}
          onChange={(e) => setFazenda(e.target.value)}
        />
      </div>

      <button onClick={salvarPerfil}>Salvar</button>
    </div>
  )
}

export default FormPerfil