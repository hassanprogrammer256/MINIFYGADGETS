import {React } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppContextProvider from './components/AppContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(

<Router>
  <AppContextProvider>
  <App />
  </AppContextProvider>
  </Router>

)
