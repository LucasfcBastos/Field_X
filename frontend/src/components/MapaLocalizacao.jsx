// src/components/MapaLocalizacao.js
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Corrige ícone padrão do marker
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

function CentralizadorMapa({ position }) {
  const map = useMap()
  useEffect(() => {
    if (position) {
      map.setView(position, 16)
    }
  }, [position])
  return null
}

function MapaLocalizacao() {
  const [position, setPosition] = useState(null)
  const [loadingText, setLoadingText] = useState('loading')

  useEffect(() => {
    // Loading gif animado com pontos
    let i = 0
    const interval = setInterval(() => {
      setLoadingText('loading' + '.'.repeat((i % 4)))
      i++
    }, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          setPosition([latitude, longitude])
        },
        (err) => {
          console.error('Erro ao obter localização:', err)
        },
        { enableHighAccuracy: true }
      )
    } else {
      alert('Geolocalização não suportada.')
    }
  }, [])

  if (!position) {
    return (
      <div style={{
        height: '81vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        fontFamily: 'Nunito'
      }}>
        {loadingText}
      </div>
    )
  }

  return (
    <MapContainer
      center={position}
      zoom={16}
      style={{ height: '81vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      />
      <Marker position={position} />
      <CentralizadorMapa position={position} />
    </MapContainer>
  )
}

export default MapaLocalizacao