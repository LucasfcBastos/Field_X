import MenuOpcoes from '../components/MenuOpcoes';
import BtnAcao from '../components/BotaoAcao';
import DeltsOperacao from '../components/DeltsOperacao';
import { useRef } from 'react';

import './css/Header.css';
import svg_sal from '../svg/salvar.svg';
import svg_vol from '../svg/voltar.svg';

function InicioView() {
  const formRef = useRef();

  function handleSalvarClick() {
    if (formRef.current) {
      formRef.current.salvar(); // chama salvar do DeltsOperacao
    }
  }

  return (
    <div>
      <header>
        <h1>VISUALIZAR OPERAÇÃO</h1>
      </header>
      <DeltsOperacao ref={formRef} />
      <BtnAcao icon={svg_vol} position="left" to="/inicio" />
      <BtnAcao icon={svg_sal} position="right" to="/inicio" onClick={handleSalvarClick} />
      <MenuOpcoes />
    </div>
  );
}

export default InicioView;