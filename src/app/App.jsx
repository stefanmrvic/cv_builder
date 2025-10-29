import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import CV from '../components/CV/CV.jsx'
import EditControls from '../components/EditControls/EditControls.jsx'

import defaultCV from '../data/defaultCV.js'

import '../styles/reset.css'
import '../styles/globals.css'
import '../styles/typography.css'
import styles from './app.module.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className={styles.app}>
      <EditControls />
      <CV cvData={defaultCV} />
    </div>
  </StrictMode>,
)
