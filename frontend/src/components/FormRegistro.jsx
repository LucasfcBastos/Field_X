import { useState, forwardRef, useImperativeHandle, useRef } from 'react'

import './css/FormImg.css'

import NullPhoto from '../svg/nullfoto.svg'

const FormRegistro = forwardRef((props, ref) => {
  const [imageData, setImageData] = useState(null) // base64 da imagem
  const [imageDescription, setImageDescription] = useState('')
  const [imageDate, setImageDate] = useState('')
  const fileInputRef = useRef(null)

  function handleDateInput(e) {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 8) value = value.slice(0, 8)

    if (value.length > 4) {
      value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3')
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2')
    }

    setImageDate(value)
  }

  const handleFotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageData(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  
  function salvar() {
    if (!imageData || !imageDescription || !imageDate) {
      alert('Preencha todos os campos: Imagem, Descrição e Data.')
      return false
    }

    const registrosExistentes = JSON.parse(localStorage.getItem('registro')) || []

    const novoRegistro = {
      id: Date.now(),
      imageUrl: imageData,
      imageDescription,
      imageDate,
    }

    localStorage.setItem('registro', JSON.stringify([...registrosExistentes, novoRegistro]))
    alert('Registro visual salvo com sucesso!')

    // Limpar o formulário
    setImageData(null)
    setImageDescription('')
    setImageDate('')
  }

  useImperativeHandle(ref, () => ({
    salvar
  }))

  const imagemExibida = imageData || NullPhoto

  return (
    <div style={{ marginTop: '6em', padding: '0em 1em', marginBottom: '13em' }}>
      <h2>Adicionar Registro Visual</h2>

      <div className="campRull" id='campRull'>
        <input
          type="file"
          accept="image/*"
          onChange={handleFotoChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <img
          src={imagemExibida}
          onClick={() => fileInputRef.current.click()}
          className={imagemExibida === NullPhoto ? 'mar' : ''}
          alt="Imagem selecionada"
        />
      </div>

      <div className='camp_input'>
        <label>Descrição da Imagem*</label>
        <textarea
          name="imageDescription"
          value={imageDescription}
          onChange={(e) => setImageDescription(e.target.value)}
          placeholder="Ex: Foto de ataque de pulgões"
        />
      </div>

      <div className='camp_input'>
        <label>Data da Imagem*</label>
        <input
          type="text"
          name="imageDate"
          value={imageDate}
          onInput={handleDateInput}
          placeholder="dd/mm/aaaa"
          maxLength={10}
        />
      </div>
    </div>
  )
})

export default FormRegistro