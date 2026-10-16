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
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#0284c7' }}>
            💊 Farmacia
          </Typography>
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
          backgroundColor: '#f8fafc',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout