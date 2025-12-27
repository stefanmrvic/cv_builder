import { AppProvider as AppContext } from './AppContext.jsx';

import CVPreview from './components/CV/Preview/CVPreview.jsx'
import EditControls from './components/EditControls/EditControls.jsx'

import './styles/reset.css'
import './styles/globals.css'
import './styles/typography.css'
import styles from './app.module.css'

export default function App() {
  return (
    <AppContext>
      <div className={styles.app}>
        <EditControls />
        <CVPreview />
      </div>
    </AppContext>
  )
}
