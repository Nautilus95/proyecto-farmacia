import { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

  useEffect(() => {
  cargarMedicamentos()
}, [])

  const abrirDialogo = () => {
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

  const cerrarDialogo = () => {
    setDialogoAbierto(false)
  }

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
}

const guardarMedicamento = async () => {
  
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
                <TableCell>{medicamento.categoria_id}</TableCell>
                <TableCell>{medicamento.fecha_ingreso}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined"
                    onClick={() =>{ 
                    editarMedicamento(medicamento)
                    }}
                    
                  >
                    Editar
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => eliminarMedicamento(medicamento.id)}
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
          />
          

          <TextField
            label="Precio"
            name="precio"
            value={formulario.precio}
            onChange={manejarCambio}
            type="number"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Stock"
            name="stock"
            value={formulario.stock}
            onChange={manejarCambio}
            type="number"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Categoría"
            name="categoria_id"
            value={formulario.categoria_id}
            onChange={manejarCambio}
            type="number"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Fecha de ingreso"
            name="fecha_ingreso"
            value={formulario.fecha_ingreso}
            onChange={manejarCambio}
            type="date"
            fullWidth
            margin="normal"
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