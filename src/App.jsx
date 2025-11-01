import { useImmer } from 'use-immer'

import CV from './components/CV/CV.jsx'
import EditControls from './components/EditControls/EditControls.jsx'

import defaultCV from './data/defaultCV.js'

import './styles/reset.css'
import './styles/globals.css'
import './styles/typography.css'
import styles from './app.module.css'

export default function App() {
  const [cvData, setCVData] = useImmer(defaultCV);

  return (
      <div className={styles.app}>
        <EditControls cvData={cvData} setCVData={setCVData}/>
        <CV cvData={cvData} />
      </div>
  )
}
