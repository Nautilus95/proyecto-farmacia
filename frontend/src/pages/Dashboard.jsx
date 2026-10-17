import { useEffect, useState } from 'react'
import { Box, Card, CardContent, Grid, Typography, Avatar, Divider } from '@mui/material'
import MedicationIcon from '@mui/icons-material/Medication'
import CategoryIcon from '@mui/icons-material/Category'
import PeopleIcon from '@mui/icons-material/People'

function Dashboard() {
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

  const tarjetas = [
    {
      titulo: 'Medicamentos',
      cantidad: datos.medicamentos,
      icono: <MedicationIcon sx={{ fontSize: 32, color: '#1976d2' }} />,
      bgIcono: '#e3f2fd',
    },
    {
      titulo: 'Categorías',
      cantidad: datos.categorias,
      icono: <CategoryIcon sx={{ fontSize: 32, color: '#2e7d32' }} />,
      bgIcono: '#e8f5e9',
    },
    {
      titulo: 'Empleados',
      cantidad: datos.empleados,
      icono: <PeopleIcon sx={{ fontSize: 32, color: '#ed6c02' }} />,
      bgIcono: '#fff3e0',
    },
  ]

  return (
    <Box
      sx={{
        p: 3,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          mb: 3,
          transform: 'translateY(-45px)',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: '#1a202c',
            mb: 0.5,
          }}
        >
          Centro de gestión
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: 'text.secondary' }}
        >
          Resumen general del sistema
        </Typography>

        <Divider
          sx={{
            mt: 2,
            borderColor: 'rgba(15, 23, 42, 0.18)',
          }}
        />
      </Box>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ maxWidth: 1100, mx: 'auto', width: '100%' }}
      >
        {tarjetas.map((item, index) => (
          <Grid key={index} size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                boxShadow: 2,
                borderRadius: 2,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                      {item.titulo}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1, color: '#1a202c' }}>
                      {item.cantidad}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      backgroundColor: item.bgIcono,
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                    }}
                  >
                    {item.icono}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Dashboard
