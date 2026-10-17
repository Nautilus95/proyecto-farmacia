import { useEffect, useRef, useState } from 'react'
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
  InputAdornment
} from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { IconButton } from '@mui/material'

function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState([])
  const [dialogoAbierto, setDialogoAbierto] = useState(false)
  const [medicamentoEditando, setMedicamentoEditando] = useState(null)
  const [errorNombre, setErrorNombre] = useState('')
  const [errorPrecio, setErrorPrecio] = useState('')
  const [errorStock, setErrorStock] = useState('')
  const [errorCategoria, setErrorCategoria] = useState('')
  const [errorFecha, setErrorFecha] = useState('')
  const [categorias, setCategorias] = useState([])
  const [dialogoEliminar, setDialogoEliminar] = useState({
    abierto: false,
    id: null,
  })
  const fechaIngresoRef = useRef(null)

  const [formulario, setFormulario] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria_id: '',
    fecha_ingreso: '',
  })

  const cargarMedicamentos = () => {
    fetch('http://127.0.0.1:5000/medicamentos')
      .then((respuesta) => respuesta.json())
      .then((data) => {
        setMedicamentos(data)
      })
      .catch((error) => {
        console.error('Error al obtener los medicamentos:', error)
      })
  }

  const cargarCategorias = async () => {
    const respuesta = await fetch('http://127.0.0.1:5000/categorias')
    const datos = await respuesta.json()
    setCategorias(datos)
  }

  useEffect(() => {
    cargarMedicamentos()
    cargarCategorias()
  }, [])

  const abrirDialogo = () => {
    setFormulario({
      nombre: '',
      precio: '',
      stock: '',
      categoria_id: '',
      fecha_ingreso: '',
    })

    setErrorNombre('')
    setErrorPrecio('')
    setErrorStock('')
    setErrorCategoria('')
    setErrorFecha('')

    setMedicamentoEditando(null)
    setDialogoAbierto(true)
  }

  const editarMedicamento = (medicamento) => {
    setMedicamentoEditando(medicamento)
    console.log('Guardado para editar:', medicamento)

    setFormulario({
      nombre: medicamento.nombre,
      precio: medicamento.precio,
      stock: medicamento.stock,
      categoria_id: medicamento.categoria_id,
      fecha_ingreso: medicamento.fecha_ingreso,
    })

    setDialogoAbierto(true)
  }

  // Función para cerrar el diálogo y limpiar el formulario
  const cerrarDialogo = () => {
    setDialogoAbierto(false)
    setErrorNombre('')
    setErrorPrecio('')
    setErrorStock('')
    setErrorCategoria('')
    setErrorFecha('')
  }

  // Eliminar medicamento //
  const eliminarMedicamento = async (id) => {
    const respuesta = await fetch(
      `http://127.0.0.1:5000/medicamentos/${id}`,
      {
        method: 'DELETE',
      }
    )

    const datos = await respuesta.json()
    console.log(datos)
    cargarMedicamentos()
  }

  const manejarCambio = (evento) => {
    const { name, value } = evento.target

    setFormulario({
      ...formulario,
      [name]: value,
    })

    if (name === 'nombre') setErrorNombre('')
    if (name === 'precio') setErrorPrecio('')
    if (name === 'stock') setErrorStock('')
    if (name === 'categoria_id') setErrorCategoria('')
    if (name === 'fecha_ingreso') setErrorFecha('')
  }

  // Guardar medicamento //
  const guardarMedicamento = async () => {
    let hayErrores = false

    if (!formulario.nombre.trim()) {
      setErrorNombre('El nombre del medicamento es obligatorio')
      hayErrores = true
    } else {
      setErrorNombre('')
    }

    if (
      formulario.precio === '' ||
      !Number.isFinite(Number(formulario.precio)) ||
      Number(formulario.precio) <= 0
    ) {
      setErrorPrecio('El precio debe ser mayor que cero')
      hayErrores = true
    } else {
      setErrorPrecio('')
    }

    if (
      formulario.stock === '' ||
      !Number.isInteger(Number(formulario.stock)) ||
      Number(formulario.stock) < 0
    ) {
      setErrorStock('El stock debe ser un número entero mayor o igual a cero')
      hayErrores = true
    } else {
      setErrorStock('')
    }

    if (!formulario.categoria_id) {
      setErrorCategoria('Seleccionar una categoría')
      hayErrores = true
    } else {
      setErrorCategoria('')
    }

    if (!formulario.fecha_ingreso) {
      setErrorFecha('La fecha de ingreso es obligatoria')
      hayErrores = true
    } else {
      setErrorFecha('')
    }

    if (hayErrores) {
      return
    }

    if (medicamentoEditando) {
      const respuesta = await fetch(
        `http://127.0.0.1:5000/medicamentos/${medicamentoEditando.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formulario),
        }
      )

      const datos = await respuesta.json()
      console.log(datos)
      cargarMedicamentos()
      cerrarDialogo()
      return
    }

    const respuesta = await fetch('http://127.0.0.1:5000/medicamentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formulario),
    })

    const datos = await respuesta.json()
    console.log(datos)
    cargarMedicamentos()
    cerrarDialogo()
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
          Medicamentos
        </Typography>

        <Button
          variant="contained"
          onClick={abrirDialogo}
          sx={{ textTransform: 'none', px: 3, py: 1, boxShadow: 2 }}
        >
          Nuevo medicamento
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Categoría</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Fecha de ingreso</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {medicamentos.map((medicamento) => (
              <TableRow
                key={medicamento.id}
                sx={{ '&:hover': { backgroundColor: '#f1f5f9' } }}
              >
                <TableCell>{medicamento.id}</TableCell>
                <TableCell>{medicamento.nombre}</TableCell>
                <TableCell>${medicamento.precio}</TableCell>
                <TableCell>{medicamento.stock}</TableCell>
                <TableCell>
                  {categorias.find(
                    (categoria) =>
                      Number(categoria.id) === Number(medicamento.categoria_id)
                  )?.nombre || 'Sin categoría'}
                </TableCell>
                <TableCell>{medicamento.fecha_ingreso}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => editarMedicamento(medicamento)}
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
                          id: medicamento.id,
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
          Eliminar medicamento
        </DialogTitle>

        <DialogContent sx={{ pt: '12px !important', pb: 2 }}>
          <Typography sx={{ color: '#0e1724', fontSize: '1rem' }}>
            ¿Estás seguro de eliminar el medicamento?
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
              eliminarMedicamento(id)
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
          {medicamentoEditando ? 'Editar medicamento' : 'Nuevo medicamento'}
        </DialogTitle>

        <DialogContent>
          <TextField
            label="Nombre"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            fullWidth
            margin="normal"
            error={Boolean(errorNombre)}
            helperText={errorNombre}
          />

          <TextField
            label="Precio"
            name="precio"
            value={formulario.precio}
            onChange={manejarCambio}
            type="number"
            fullWidth
            margin="normal"
            error={Boolean(errorPrecio)}
            helperText={errorPrecio}
          />

          <TextField
            label="Stock"
            name="stock"
            value={formulario.stock}
            onChange={manejarCambio}
            type="number"
            fullWidth
            margin="normal"
            error={Boolean(errorStock)}
            helperText={errorStock}
          />

          <TextField
            select
            label="Categoría"
            name="categoria_id"
            value={formulario.categoria_id}
            onChange={manejarCambio}
            fullWidth
            margin="normal"
            error={Boolean(errorCategoria)}
            helperText={errorCategoria}
          >
            {categorias.map((categoria) => (
              <MenuItem key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Fecha de ingreso"
            name="fecha_ingreso"
            inputRef={fechaIngresoRef}
            value={formulario.fecha_ingreso}
            onChange={manejarCambio}
            type="date"
            fullWidth
            margin="normal"
            error={Boolean(errorFecha)}
            helperText={errorFecha}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Abrir calendario"
                      onClick={() => fechaIngresoRef.current?.showPicker?.()}
                      edge="end"
                      size="small"
                    >
                      <CalendarMonthIcon sx={{ color: '#475569' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={cerrarDialogo} sx={{ textTransform: 'none' }}>
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={guardarMedicamento}
            sx={{ textTransform: 'none' }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Medicamentos