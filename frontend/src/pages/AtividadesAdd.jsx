import MenuOpcoes from '../components/MenuOpcoes'
import BtnAcao from '../components/BotaoAcao'
import FormAtividades from '../components/FormAtividades'
import { useRef } from 'react'

import './css/Header.css'

import svg_sal from '../svg/salvar.svg'
import svg_vol from '../svg/voltar.svg'

function InicioAdd() {

  const formRef = useRef()

  function handleSalvarClick() {
    if (formRef.current) {
      formRef.current.salvar()
    }
  }
  
  return (
    <div>
      <header>
        <h1>ATIVIDADES</h1>
      </header>
      <FormAtividades ref={formRef} />
      <BtnAcao icon={svg_vol} position="left" to="/atividades" />
      <BtnAcao icon={svg_sal} position="right" to="/atividades" onClick={handleSalvarClick} />
      <MenuOpcoes />
    </div>
  )
}

export default InicioAdd