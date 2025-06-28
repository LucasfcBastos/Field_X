import ExibirRegistro from '../components/ExibirRegistro'
import MenuOpcoes from '../components/MenuOpcoes'

import './css/Registro.css'

function Registro() {
  return (
    <div>
      <div className='top'>
        <h1>INÍCIO</h1>
      </div>
      <ExibirRegistro />
      <MenuOpcoes />
    </div>
  )
}

export default Registro