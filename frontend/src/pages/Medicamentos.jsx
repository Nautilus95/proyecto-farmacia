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

    if (name === 'nombre') {
      setErrorNombre('')
    }

    if (name === 'precio') {
      setErrorPrecio('')
    }

    if (name === 'stock') {
      setErrorStock('')
    }

    if (name === 'categoria_id') {
      setErrorCategoria('')
    }

    if (name === 'fecha_ingreso') {
      setErrorFecha('')
    }
  }

  // Guardar medicamento //

  const guardarMedicamento = async () => {
    let hayErrores = false

    // Validar nombre obligatorio //
    if (!formulario.nombre.trim()) {
      setErrorNombre('El nombre del medicamento es obligatorio')
      hayErrores = true
    } else {
      setErrorNombre('')
    }

    // Validar precio mayor a cero //
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

    // Validar stock mayor o igual a cero //
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

    // Validar categoría obligatoria //
    if (!formulario.categoria_id) {
      setErrorCategoria('Seleccionar una categoría')
      hayErrores = true
    } else {
      setErrorCategoria('')
    }
    
    // Validar fecha de ingreso obligatoria //
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
    <div style={{ padding: '32px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <Typography variant="h4">
          Medicamentos
        </Typography>

        <Button variant="contained" onClick={abrirDialogo}>
          Nuevo medicamento
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Fecha de ingreso</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {medicamentos.map((medicamento) => (
              <TableRow key={medicamento.id}>
                <TableCell>{medicamento.id}</TableCell>
                <TableCell>{medicamento.nombre}</TableCell>
                <TableCell>${medicamento.precio}</TableCell>
                <TableCell>{medicamento.stock}</TableCell>
                <TableCell>{categorias.find(
                  (categoria) =>
                    Number(categoria.id) === Number(medicamento.categoria_id)
                )?.nombre || 'Sin categoría'}
                </TableCell>
                <TableCell>{medicamento.fecha_ingreso}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      editarMedicamento(medicamento)
                    }}

                  >
                    Editar
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() =>
                      setDialogoEliminar({
                        abierto: true,
                        id: medicamento.id,
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
        <DialogTitle>Eliminar medicamento</DialogTitle>

        <DialogContent>
          ¿Estás seguro de eliminar el medicamento?
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
            onClick={() => {
              const id = dialogoEliminar.id
              setDialogoEliminar({ abierto: false, id: null })
              eliminarMedicamento(id)
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
        <DialogTitle>Nuevo medicamento</DialogTitle>

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
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={cerrarDialogo}>
            Cancelar
          </Button>

          <Button variant="contained" onClick={guardarMedicamento}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Medicamentos