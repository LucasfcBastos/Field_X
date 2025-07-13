import MenuOpcoes from '../components/MenuOpcoes'
import ExibirAtividades from '../components/ExibirAtividades'
import BtnAcao from '../components/BotaoAcao'

import './css/Header.css'

import svg_add from '../svg/adicionar.svg'

function Atividades() {
  return (
    <div>
      <header>
        <h1>ATIVIDADES</h1>
      </header>
      <ExibirAtividades />
      <BtnAcao icon={svg_add} position="right" to="/atividades/adicionar" />
      <MenuOpcoes />
    </div>
  )
}

export default Atividades