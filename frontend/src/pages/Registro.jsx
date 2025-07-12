import MenuOpcoes from '../components/MenuOpcoes'
import RegistroGallery from '../components/RegistroGallery'
import BtnAcao from '../components/BotaoAcao'

import './css/Header.css'

import svg_add from '../svg/adicionar.svg'

function Registro() {
  return (
    <div>
      <header>
        <h1>REGISTROS</h1>
      </header>
      <RegistroGallery />
      <BtnAcao icon={svg_add} position="right" to="/registro/adicionar" />
      <MenuOpcoes />
    </div>
  )
}

export default Registro