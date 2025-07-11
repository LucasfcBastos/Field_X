import MenuOpcoes from '../components/MenuOpcoes'
import './css/Header.css'
import MapaLocalizacao from '../components/MapaLocalizacao'

function Mapa() {
  return (
    <div>
      <header>
        <h1>MAPA</h1>
      </header>
      <MenuOpcoes />
      <div style={{ marginTop: '5em', zIndex: '-1'}}>
        <MapaLocalizacao />
      </div>
    </div>
  )
}

export default Mapa