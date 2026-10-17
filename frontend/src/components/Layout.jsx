import { NavLink, Outlet } from 'react-router-dom'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'

import DashboardIcon from '@mui/icons-material/Dashboard'
import MedicationIcon from '@mui/icons-material/Medication'
import CategoryIcon from '@mui/icons-material/Category'
import PeopleIcon from '@mui/icons-material/People'
import TerrainIcon from '@mui/icons-material/Terrain'

const drawerWidth = 240

function Layout() {
  const opciones = [
    {
      texto: 'Dashboard',
      ruta: '/dashboard',
      icono: <DashboardIcon />,
    },
    {
      texto: 'Medicamentos',
      ruta: '/medicamentos',
      icono: <MedicationIcon />,
    },
    {
      texto: 'Categorías',
      ruta: '/categorias',
      icono: <CategoryIcon />,
    },
    {
      texto: 'Empleados',
      ruta: '/empleados',
      icono: <PeopleIcon />,
    },
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#0f172a', // Azul oscuro elegante
            color: '#f8fafc',
            borderRight: 'none',
          },
        }}
      >

        <Toolbar sx={{ my: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <TerrainIcon
              sx={{
                fontSize: 38,
                color: '#0284c7',
              }}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                component="div"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  color: '#0284c7',
                  lineHeight: 1.2,
                  letterSpacing: 0.5,
                }}
              >
                GRUPO ANDINO
              </Typography>

              <Typography
                component="div"
                sx={{
                  fontSize: '0.65rem',
                  color: '#94a3b8',
                  letterSpacing: 1,
                  mt: 0.5,
                }}
              >
                CADENA DE FARMACIAS
              </Typography>
            </Box>
          </Box>
        </Toolbar>


        <List sx={{ px: 1 }}>
          {opciones.map((opcion) => (
            <ListItem key={opcion.ruta} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={NavLink}
                to={opcion.ruta}
                sx={{
                  borderRadius: 2,
                  color: '#94a3b8',
                  '&.active': {
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    '& .MuiListItemIcon-root': {
                      color: '#ffffff',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#94a3b8', minWidth: 40 }}>
                  {opcion.icono}
                </ListItemIcon>

                <ListItemText
                  primary={opcion.texto}
                  primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          backgroundColor: 'rgb(204, 223, 243)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout