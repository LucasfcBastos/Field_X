import MenuOpcoes from '../components/MenuOpcoes'
import BtnAcao from '../components/BotaoAcao'
import DashboardRelatoriosIA from '../components/DashboardRelatoriosIA'

import './css/Header.css'
import svg_vol from '../svg/voltar.svg'

function RelatoriosIa() {
  return (
    <div>
      <header>
        <h1>Relatórios</h1>
      </header>

      <DashboardRelatoriosIA />

      <BtnAcao icon={svg_vol} position="left" to="/inicio" />
      <MenuOpcoes />
    </div>
  )
}

export default RelatoriosIa