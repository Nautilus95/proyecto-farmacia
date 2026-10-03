

import { useEffect, useState } from 'react'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

function App() {
  const [datos, setDatos] = useState({
    medicamentos: 0,
    categorias: 0,
    empleados: 0,
  })

  useEffect(() => {
    fetch('http://127.0.0.1:5000/dashboard')
      .then((respuesta) => respuesta.json())
      .then((data) => {
        setDatos(data)
      })
      .catch((error) => {
        console.error('Error al obtener los datos del dashboard:', error)
      })
  }, [])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f6fa',
        padding: 4,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard de Farmacia
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Resumen general del sistema
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Medicamentos
              </Typography>

              <Typography variant="h3" sx={{ mt: 2 }}>
                {datos.medicamentos}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Categorías
              </Typography>

              <Typography variant="h3" sx={{ mt: 2 }}>
                {datos.categorias}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Empleados
              </Typography>

              <Typography variant="h3" sx={{ mt: 2 }}>
                {datos.empleados}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App

