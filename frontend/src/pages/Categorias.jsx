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
  Typography
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
    // ---------------------------------------------------- //

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

    console.log('Estado HTTP:', respuesta.status)
    console.log('Respuesta del backend:', datos)


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
    <div>
      <Typography variant="h4" sx={{ p: 3 }}>
        Categorías
      </Typography>

      <Button variant="contained" sx={{ ml: 3, mb: 2 }}
        onClick={() => setDialogoAbierto(true)}
      >

        Nueva categoría
      </Button>

      <TableContainer component={Paper} sx={{ mx: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categorias.map((categoria) => (
              <TableRow key={categoria.id}>
                <TableCell>{categoria.id}</TableCell>
                <TableCell>{categoria.nombre}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={() => editarCategoria(categoria)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                      setDialogoEliminar({
                        abierto: true,
                        id: categoria.id,
                      })
                    }
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
        open={dialogoEliminar.abierto}
        onClose={() =>
          setDialogoEliminar({ abierto: false, id: null })
        }
      >
        <DialogTitle>Eliminar categoría</DialogTitle>

        <DialogContent>
          ¿Estás seguro de que querés eliminar esta categoría?
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setDialogoEliminar({ abierto: false, id: null })
            }
          >
            Cancelar
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={async () => {
              const id = dialogoEliminar.id
              setDialogoEliminar({ abierto: false, id: null })
              await eliminarCategoria(id)
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialogoAbierto}
        onClose={() => setDialogoAbierto(false)}
      >
        <DialogTitle>
          {categoriaEditando
            ? `Editar "${categoriaEditando.nombre}"`
            : 'Nueva categoría'}
        </DialogTitle>

        <DialogContent>
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
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={cerrarDialogo}>
            Cancelar
          </Button>

          <Button variant="contained"
            onClick={guardarCategoria}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Categorias