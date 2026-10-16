import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import App from './App'
import './index.css'

// Definición de la paleta profesional de la farmacia
const theme = createTheme({
  palette: {
    primary: {
      main: '#0284c7', // Azul cian profesional
      light: '#e0f2fe',
      dark: '#0369a1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981', // Verde salud
      light: '#d1fae5',
      dark: '#047857',
    },
    background: {
      default: '#f8fafc', // Fondo neutro suave
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
  },
  shape: {
    borderRadius: 8, // Bordes suavemente redondeados en botones y cards
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none', // Saca las mayúsculas automáticas de MUI para un look más moderno
      fontWeight: 600,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normaliza fondos y estilos CSS predeterminados */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)