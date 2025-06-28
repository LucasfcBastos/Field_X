import './css/Menu.css'
import { useNavigate, useLocation } from 'react-router-dom'

import svg_ini from '../svg/inicio.svg'
import svg_ati from '../svg/atividades.svg'
import svg_map from '../svg/mapa.svg'
import svg_reg from '../svg/registros.svg'
import svg_per from '../svg/perfil.svg'

function MenuOpcoes() {
  const navigate = useNavigate()
  const location = useLocation()

  const botoes = [
    { rota: '/inicio', icon: svg_ini},
    { rota: '/atividades', icon: svg_ati},
    { rota: '/mapa', icon: svg_map},
    { rota: '/registro', icon: svg_reg},
    { rota: '/perfil', icon: svg_per},
  ]


  return (
    <footer>
      {botoes.map((btn, index) => (
        <div key={index}>
          <button
          className={location.pathname === btn.rota ? 'select' : ''}
          onClick={() => navigate(btn.rota)}
          >
            <img src={btn.icon}/>
          </button>
        </div>
      ))}
    </footer>
  )
}

export default MenuOpcoes