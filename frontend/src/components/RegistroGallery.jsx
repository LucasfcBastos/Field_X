import { useEffect, useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'

const RegistroGallery = memo(() => {
  const [images, setImages] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const registros = JSON.parse(localStorage.getItem('registro')) || []
    setImages(registros)
  }, [])

  const temRegistro = images.length > 0

  return (
    <div style={{ marginTop: '6em', padding: '0em 1em', marginBottom: '13em' }}>
      <h2>Registros Visuais</h2>

      {temRegistro ? (
        <div>
          {images.map((img) => (
            <div key={img.id} style={{ backgroundColor: "var(--colorFundoAlter)", cursor: 'pointer' }}
              onClick={() => navigate(`/registro/view/${img.id}`)}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src={img.imageUrl}
                  alt={img.imageDescription}
                  style={{ maxHeight: '14em' }}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://placehold.co/400x200/cccccc/ffffff?text=Imagem+N/A'
                  }}
                />
              </div>
              <div style={{ marginBlockEnd: '2em', marginInline: '0.5em', width: '95.8%' }}>
                <p style={{ margin: '0em', padding: '0.5em 0em' }}>{img.imageDescription}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='Null'>Nenhuma operação registrada.</p>
      )}
    </div>
  )
})

export default RegistroGallery