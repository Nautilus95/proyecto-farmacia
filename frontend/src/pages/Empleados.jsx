import { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'

function Empleados() {
  const [empleados, setEmpleados] = useState([])
  const [dialogoAbierto, setDialogoAbierto] = useState(false)
  const [errores, setErrores] = useState({})
  const [empleadoEditando, setEmpleadoEditando] = useState(null)

  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    cargo: '',
  })

  const manejarCambio = (evento) => {
    const { name, value } = evento.target

    setFormulario({
      ...formulario,
      [name]: value,
    })
  }

  // Función para editar empleado
  const editarEmpleado = (empleado) => {
    setEmpleadoEditando(empleado)

    setFormulario({
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      dni: empleado.dni,
      email: empleado.email,
      cargo: empleado.cargo,
    })

    setErrores({})
    setDialogoAbierto(true)
  }
  // Confirmar eliminar empleado //

  const eliminarEmpleado = async (id) => {
    const confirmar = window.confirm(
      '¿Estás seguro de eliminar empleado?'
    )

    if (!confirmar) {
      return
    }

    try {
      const respuesta = await fetch(
        `http://127.0.0.1:5000/empleados/${id}`,
        {
          method: 'DELETE',
        }
      )

      const datos = await respuesta.json()

      if (!respuesta.ok) {
        alert(datos.error || 'Error al eliminar el empleado')
        return
      }

      cargarEmpleados()
    } catch (error) {
      console.error('Error al eliminar el empleado:', error)
      alert('No se pudo conectar con el servidor')
    }
  }


  // Función para cargar empleado //
  const cargarEmpleados = () => {
    fetch('http://127.0.0.1:5000/empleados')
      .then((respuesta) => respuesta.json())
      .then((data) => {
        setEmpleados(data)
      })
      .catch((error) => {
        console.error('Error al obtener los empleados:', error)
      })
  }

  useEffect(() => {
    cargarEmpleados()
  }, [])

  // Función para guardar empleado //
  const guardarEmpleado = async () => {
    const nuevosErrores = {}

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio'
    }

    if (!formulario.apellido.trim()) {
      nuevosErrores.apellido = 'El apellido es obligatorio'
    }

    if (!formulario.dni.trim()) {
      nuevosErrores.dni = 'El DNI es obligatorio'
    }

    if (!formulario.email.trim()) {
      nuevosErrores.email = 'El email es obligatorio'
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email)
    ) {
      nuevosErrores.email = 'Ingresá un email válido'
    }

    if (!formulario.cargo.trim()) {
      nuevosErrores.cargo = 'El cargo es obligatorio'
    }

    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    const url = empleadoEditando
      ? `http://127.0.0.1:5000/empleados/${empleadoEditando.id}`
      : 'http://127.0.0.1:5000/empleados'

    const respuesta = await fetch(url, {
      method: empleadoEditando ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formulario),
    })

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      alert(datos.error || 'Error al guardar el empleado')
      return
    }

    cargarEmpleados()
    setDialogoAbierto(false)
    setEmpleadoEditando(null)

    setFormulario({
      nombre: '',
      apellido: '',
      dni: '',
      email: '',
      cargo: '',
    })
  }

  return (
    <div>
      <Typography variant="h4" sx={{ p: 3 }}>
        Empleados
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setFormulario({
            nombre: '',
            apellido: '',
            dni: '',
            email: '',
            cargo: '',
          })
          setEmpleadoEditando(null)
          setErrores({})
          setDialogoAbierto(true)
        }}
      >
        Nuevo empleado
      </Button>

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
              <TableCell>Acciones</TableCell>
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
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => editarEmpleado(empleado)}
                  >
                    Editar
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => eliminarEmpleado(empleado.id)}
                  >
                    Eliminar
                  </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={dialogoAbierto}
        onClose={() => setDialogoAbierto(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{empleadoEditando ? 'Editar empleado' : 'Nuevo empleado'}

        </DialogTitle>

        <DialogContent>
          <TextField
            label="Nombre"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            fullWidth
            margin="normal"
            error={Boolean(errores.nombre)}
            helperText={errores.nombre || ''}
          />

          <TextField
            label="Apellido"
            name="apellido"
            value={formulario.apellido}
            onChange={manejarCambio}
            fullWidth
            margin="normal"
            error={Boolean(errores.apellido)}
            helperText={errores.apellido || ''}
          />

          <TextField
            label="DNI"
            name="dni"
            value={formulario.dni}
            onChange={manejarCambio}
            fullWidth
            margin="normal"
            error={Boolean(errores.dni)}
            helperText={errores.dni || ''}
          />

          <TextField
            label="Email"
            name="email"
            value={formulario.email}
            onChange={manejarCambio}
            type="email"
            fullWidth
            margin="normal"
            error={Boolean(errores.email)}
            helperText={errores.email || ''}
          />

          <TextField
            select
            label="Cargo"
            name="cargo"
            value={formulario.cargo}
            onChange={manejarCambio}
            fullWidth
            margin="normal"
            error={Boolean(errores.cargo)}
            helperText={errores.cargo || ''}
          >
            <MenuItem value="Farmacéutico">Farmacéutico</MenuItem>
            <MenuItem value="Auxiliar de farmacia">Auxiliar de farmacia</MenuItem>
            <MenuItem value="Cajero">Cajero</MenuItem>
            <MenuItem value="Repositor">Repositor</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDialogoAbierto(false)}>
            Cancelar
          </Button>

          <Button variant="contained" onClick={guardarEmpleado}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Empleados