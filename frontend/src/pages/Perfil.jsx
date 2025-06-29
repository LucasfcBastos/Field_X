import MenuOpcoes from '../components/MenuOpcoes'
import FormPerfil from '../components/FormPerfil'

import './css/Header.css'

function Perfil() {
  return (
    <div>
      <header>
        <h1>PERFIL</h1>
      </header>
      <FormPerfil />
      <MenuOpcoes />
    </div>
  )
}

export default Perfil