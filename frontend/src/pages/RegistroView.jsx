import MenuOpcoes from '../components/MenuOpcoes'
import BtnAcao from '../components/BotaoAcao'
import DeltsRegistro from '../components/DeltsRegistro'
import { useRef } from 'react'
import './css/Header.css'
import svg_sal from '../svg/salvar.svg'
import svg_vol from '../svg/voltar.svg'

function RegistroView() {
  const formRef = useRef()

  function handleSalvarClick() {
    if (formRef.current) {
      formRef.current.salvar()
    }
  }

  return (
    <div>
      <header>
        <h1>REGISTRO</h1>
      </header>
      <DeltsRegistro ref={formRef} />
      <BtnAcao icon={svg_vol} position="left" to="/registro" />
      <BtnAcao icon={svg_sal} position="right" to="/registro" onClick={handleSalvarClick} />
      <MenuOpcoes />
    </div>
  )
}

export default RegistroView