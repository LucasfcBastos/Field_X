import MenuOpcoes from '../components/MenuOpcoes'
import ExibirOperacoes from '../components/ExibirOperacoes'

import './css/Header.css'

function Inicio() {
  return (
    <div>
      <header>
        <h1>INÍCIO</h1>
      </header>
      <ExibirOperacoes />
      <MenuOpcoes />
    </div>
  )
}

export default Inicio