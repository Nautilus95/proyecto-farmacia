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
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div">
            Farmacia
          </Typography>
        </Toolbar>

        <List>
          {opciones.map((opcion) => (
            <ListItem key={opcion.ruta} disablePadding>
              <ListItemButton
                component={NavLink}
                to={opcion.ruta}
                sx={{
                  '&.active': {
                    backgroundColor: '#e3f2fd',
                    fontWeight: 'bold',
                  },
                }}
              >
                <ListItemIcon>
                  {opcion.icono}
                </ListItemIcon>

                <ListItemText primary={opcion.texto} />
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
          backgroundColor: '#f5f6fa',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout