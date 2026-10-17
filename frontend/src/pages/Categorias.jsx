import { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Stack,
} from '@mui/material'

function Categorias() {
  const [categorias, setCategorias] = useState([])
  const [dialogoAbierto, setDialogoAbierto] = useState(false)
  const [nombre, setNombre] = useState('')
  const [categoriaEditando, setCategoriaEditando] = useState(null)
  const [error, setError] = useState('')
  const [dialogoEliminar, setDialogoEliminar] = useState({
    abierto: false,
    id: null,
  })

  useEffect(() => {
    fetch('http://127.0.0.1:5000/categorias')
      .then((respuesta) => respuesta.json())
      .then((data) => {
        setCategorias(data)
      })
      .catch((error) => {
        console.error('Error al obtener las categorías:', error)
      })
  }, [])

  // Función para guardar una nueva categoría //
  const guardarCategoria = async () => {
    if (!nombre.trim()) {
      alert('El nombre de la categoría es obligatorio')
      return
    }
    // Comprobar si el nombre de la categoría cambió //
    if (
      categoriaEditando &&
      nombre.trim() === categoriaEditando.nombre
    ) {
      setError('')
      setNombre('')
      setCategoriaEditando(null)
      setDialogoAbierto(false)
      return
    }

    const editando = categoriaEditando !== null

    const url = editando
      ? `http://127.0.0.1:5000/categorias/${categoriaEditando.id}`
      : 'http://127.0.0.1:5000/categorias'

    const respuesta = await fetch(url, {
      method: editando ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: nombre,
      }),
    })

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      setError(datos.error || 'Ocurrió un error al guardar la categoría')
      return
    }

    setError('')

    if (editando) {
      setCategorias(
        categorias.map((categoria) =>
          categoria.id === datos.id ? datos : categoria
        )
      )
    } else {
      setCategorias([...categorias, datos])
    }

    setNombre('')
    setCategoriaEditando(null)
    setDialogoAbierto(false)
  }

  // Función para cerrar el diálogo y limpiar el formulario //
  const cerrarDialogo = () => {
    setDialogoAbierto(false)
    setNombre('')
    setCategoriaEditando(null)
    setError('')
  }

  // Función para eliminar una categoría //
  const eliminarCategoria = async (id) => {
    const respuesta = await fetch(
      `http://127.0.0.1:5000/categorias/${id}`,
      {
        method: 'DELETE',
      }
    )

    const datos = await respuesta.json()
    console.log(datos)
    setCategorias(categorias.filter((categoria) => categoria.id !== id))
  }

  // Función para editar una categoría //
  const editarCategoria = (categoria) => {
    setCategoriaEditando(categoria)
    setNombre(categoria.nombre)
    setDialogoAbierto(true)
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
          Categorías
        </Typography>

        <Button
          variant="contained"
          onClick={() => setDialogoAbierto(true)}
          sx={{ textTransform: 'none', px: 3, py: 1, boxShadow: 2 }}
        >
          Nueva categoría
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categorias.map((categoria) => (
              <TableRow
                key={categoria.id}
                sx={{ '&:hover': { backgroundColor: '#f1f5f9' } }}
              >
                <TableCell>{categoria.id}</TableCell>
                <TableCell>{categoria.nombre}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => editarCategoria(categoria)}
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
                          id: categoria.id,
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
          Eliminar categoría
        </DialogTitle>

        <DialogContent sx={{ pt: '12px !important', pb: 2 }}>
          <Typography sx={{ color: '#334155', fontSize: '1rem' }}>
            ¿Estás seguro de eliminar esta categoría?
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
              fontWeight: 600,
              '&:hover': {
                borderColor: '#94a3b8',
                backgroundColor: '#f8fafc',
              },
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
              eliminarCategoria(id)
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
        onClose={cerrarDialogo}
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
          {categoriaEditando
            ? `Editar "${categoriaEditando.nombre}"`
            : 'Nueva categoría'}
        </DialogTitle>



        <DialogContent sx={{ pt: '12px !important', pb: 1 }}>
          <TextField
            label="Nombre"
            value={nombre}
            onChange={(evento) => {
              setNombre(evento.target.value)
              setError('')
            }}
            fullWidth
            margin="normal"
            error={Boolean(error)}
            helperText={error}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
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
            onClick={cerrarDialogo}
            variant="outlined"
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 2.5,
              color: '#475569',
              borderColor: '#cbd5e1',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#94a3b8',
                backgroundColor: '#f8fafc',
              },
            }}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={guardarCategoria}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 2.5,
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
              },
            }}
          >
            Guardar
          </Button>
        </DialogActions>

      </Dialog>
    </Box>
  )
}

export default Categorias