import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import CV from '../components/CV.jsx'

import '../styles/reset.css'
import '../styles/globals.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CV />
  </StrictMode>,
)
