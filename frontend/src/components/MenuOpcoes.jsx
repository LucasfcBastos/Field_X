import './css/Menu.css'
import svg_ini from '../svg/inicio.svg'
import svg_ati from '../svg/atividades.svg'
import svg_map from '../svg/mapa.svg'
import svg_reg from '../svg/registros.svg'
import svg_per from '../svg/perfil.svg'

function MenuOpcoes() {
  return (
    <footer>
      <div>
        <button className='select'>
          <img src={svg_ini} />
        </button>
      </div>
      <div>
        <button>
          <img src={svg_ati} />
        </button>
      </div>
      <div>
        <button>
          <img src={svg_map} />
        </button>
      </div>
      <div>
        <button>
          <img src={svg_reg} />
        </button>
      </div>
      <div>
        <button>
          <img src={svg_per} />
        </button>
      </div>
    </footer>
  )
}

export default MenuOpcoes