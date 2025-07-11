import { Routes, Route } from 'react-router-dom'

import './App.css'

import Intro from './pages/Intro'
import Inicio from './pages/Inicio'
import InicioAdd from './pages/InicioAdd'
import InicioView from './pages/InicioView'
import Atividades from './pages/Atividades'
import Mapa from './pages/Mapa'
import Registro from './pages/Registro'
import Perfil from './pages/Perfil'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/inicio/adicionar" element={<InicioAdd />} />
      <Route path="/inicio/view/:id" element={<InicioView />} />
      <Route path="/atividades" element={<Atividades />} />
      <Route path="/mapa" element={<Mapa />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  )
}

export default App
