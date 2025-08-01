import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' // Setting up React Router
import { AppContextProvider } from './context/AppContext.jsx'

// We wrap <App /> with <BrowserRouter> so that all child components can use routing features like <Route>, <Link>, etc.
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
    <App />
  </AppContextProvider>
  </BrowserRouter>,
)
