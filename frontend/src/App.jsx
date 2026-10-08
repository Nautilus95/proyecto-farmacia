import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Medicamentos from './pages/Medicamentos'
import Categorias from './pages/Categorias'
import Empleados from './pages/Empleados'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="medicamentos" element={<Medicamentos />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="empleados" element={<Empleados />} />
      </Route>
    </Routes>
  )
}

export default App