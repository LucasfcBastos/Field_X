import MenuOpcoes from '../components/MenuOpcoes'
import BtnAcao from '../components/BotaoAcao'
import InsightIA from '../components/InsightIA'

import './css/Header.css'

import svg_vol from '../svg/voltar.svg'

function InicioIa() {  
  return (
    <div>
      <header>
        <h1>IA</h1>
      </header>
      <InsightIA />
      <BtnAcao icon={svg_vol} position="left" to="/inicio" />
      <MenuOpcoes />
    </div>
  )
}

export default InicioIa