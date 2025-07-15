import { Routes, Route } from 'react-router-dom'

import './App.css'

import Intro from './pages/Intro'
import Inicio from './pages/Inicio'
import InicioAdd from './pages/InicioAdd'
import InicioView from './pages/InicioView'
import InicioIa from './pages/InicioIa'
import RelatoriosIa from './pages/RelatoriosIa'
import Atividades from './pages/Atividades'
import AtividadesAdd from './pages/AtividadesAdd'
import AtividadesView from './pages/AtividadesView'
import Mapa from './pages/Mapa'
import Registro from './pages/Registro'
import RegistroAdd from './pages/RegistroAdd'
import RegistroView from './pages/RegistroView'
import Perfil from './pages/Perfil'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />

      <Route path="/inicio" element={<Inicio />} />
      <Route path="/inicio/adicionar" element={<InicioAdd />} />
      <Route path="/inicio/view/:id" element={<InicioView />} />
      
      <Route path="/ia" element={<InicioIa />} />
      <Route path="/ia/supabase" element={<RelatoriosIa />} />
      
      <Route path="/atividades" element={<Atividades />} />
      <Route path="/atividades/adicionar" element={<AtividadesAdd />} />
      <Route path="/atividades/view/:id" element={<AtividadesView />} />
      
      <Route path="/mapa" element={<Mapa />} />
      
      <Route path="/registro" element={<Registro />} />
      <Route path="/registro/adicionar" element={<RegistroAdd />} />
      <Route path="/registro/view/:id" element={<RegistroView />} />
      
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  )
}

export default App
