
import { useEffect, useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

function Empleados() {
  const [empleados, setEmpleados] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:5000/empleados')
      .then((respuesta) => respuesta.json())
      .then((data) => {
        setEmpleados(data)
      })
      .catch((error) => {
        console.error('Error al obtener los empleados:', error)
      })
  }, [])

  return (
    <div>
      <Typography variant="h4" sx={{ p: 3 }}>
        Empleados
      </Typography>

      <TableContainer component={Paper} sx={{ mx: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Cargo</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {empleados.map((empleado) => (
              <TableRow key={empleado.id}>
                <TableCell>{empleado.id}</TableCell>
                <TableCell>{empleado.nombre}</TableCell>
                <TableCell>{empleado.apellido}</TableCell>
                <TableCell>{empleado.dni}</TableCell>
                <TableCell>{empleado.email}</TableCell>
                <TableCell>{empleado.cargo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Empleados
