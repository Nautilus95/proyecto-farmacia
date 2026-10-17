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
  Box,
  Stack,
} from '@mui/material'

function Empleados() {
  const [empleados, setEmpleados] = useState([])
  const [dialogoAbierto, setDialogoAbierto] = useState(false)
  const [errores, setErrores] = useState({})
  const [empleadoEditando, setEmpleadoEditando] = useState(null)
  const [dialogoEliminar, setDialogoEliminar] = useState({
    abierto: false,
    id: null,
  })

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
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c' }}>
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
          sx={{ textTransform: 'none', px: 3, py: 1, boxShadow: 2 }}
        >
          Nuevo empleado
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Apellido</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>DNI</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Cargo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {empleados.map((empleado) => (
              <TableRow
                key={empleado.id}
                sx={{ '&:hover': { backgroundColor: '#f1f5f9' } }}
              >
                <TableCell>{empleado.id}</TableCell>
                <TableCell>{empleado.nombre}</TableCell>
                <TableCell>{empleado.apellido}</TableCell>
                <TableCell>{empleado.dni}</TableCell>
                <TableCell>{empleado.email}</TableCell>
                <TableCell>{empleado.cargo}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => editarEmpleado(empleado)}
                      sx={{ textTransform: 'none' }}
                    >
                      Editar
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() =>
                        setDialogoEliminar({
                          abierto: true,
                          id: empleado.id,
                        })
                      }
                      sx={{ textTransform: 'none' }}
                    >
                      Eliminar
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={dialogoEliminar.abierto}
        onClose={() =>
          setDialogoEliminar({ abierto: false, id: null })
        }
      >

        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: '1.25rem',
            color: '#1e293b',
            pb: 1,
          }}
        >
          Eliminar empleado
        </DialogTitle>

        <DialogContent sx={{ pt: '12px !important', pb: 2 }}>
          <Typography sx={{ color: '#334155', fontSize: '1rem' }}>
            ¿Estás seguro de eliminar a este empleado?
          </Typography>
        </DialogContent>


        <DialogActions
          sx={{
            px: 3,
            pb: 2.5,
            pt: 1,
            gap: 1,
          }}
        >
          <Button
            onClick={() =>
              setDialogoEliminar({ abierto: false, id: null })
            }
            variant="outlined"
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 2.5,
              color: '#475569',
              borderColor: '#cbd5e1',
            }}
          >
            Cancelar
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={() => {
              const id = dialogoEliminar.id
              setDialogoEliminar({ abierto: false, id: null })
              eliminarEmpleado(id)
            }}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 2.5,
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: '#b91c1c',
              },
            }}
          >
            Eliminar
          </Button>
        </DialogActions>

      </Dialog>

      <Dialog
        open={dialogoAbierto}
        onClose={() => setDialogoAbierto(false)}
        fullWidth
        maxWidth="sm"
      >

        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: '1.25rem',
            color: '#1e293b',
            pb: 1,
          }}
        >
          {empleadoEditando ? 'Editar empleado' : 'Nuevo empleado'}
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
            <MenuItem value="Vendedora">Vendedora</MenuItem>
            <MenuItem value="Administrativa">Administrativa</MenuItem>
            <MenuItem value="Vendedor">Vendedor</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogoAbierto(false)} sx={{ textTransform: 'none' }}>
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={guardarEmpleado}
            sx={{ textTransform: 'none' }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Empleados