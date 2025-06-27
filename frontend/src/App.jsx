import { Routes, Route } from 'react-router-dom'
import Intro from './pages/Intro'
import Registro from './pages/Registro'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/registro" element={<Registro />} />
    </Routes>
  )
}

export default App
