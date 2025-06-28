import MenuOpcoes from '../components/MenuOpcoes'
import BtnAcao from '../components/BotaoAcao'
import ExibirOperacoes from '../components/ExibirOperacoes'

import './css/Header.css'

import svg_add from '../svg/adicionar.svg'

function Inicio() {
  return (
    <div>
      <header>
        <h1>INÍCIO</h1>
      </header>
      <ExibirOperacoes />
      <BtnAcao icon={svg_add} position="right" to="/" />
      <MenuOpcoes />
    </div>
  )
}

export default Inicio