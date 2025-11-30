import { useState } from 'react';
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
  const [order, setOrder] = useState([
        {
          id: 'workExperience',
          icon: 'business_center',
          headline: 'Experience'
        },
        {
          id: 'skillsToolsInterests',
          icon: 'settings',
          headline: 'Skills, Tools & Interests'
        },
        {
          id: 'education',
          icon: 'school',
          headline: 'Education'
        }
  ])

  const [bulletPoints, setBulletPoints] = useState({
    primary: '$',
    secondary: '%'
  })

  const [font, setFont] = useState('sans-serif')

  return (
    <div className={styles.app}>
      <EditControls 
        data={cvData} 
        setCVData={setCVData} 
        order={order}
        setOrder={setOrder} 
        setBulletPoints={setBulletPoints} 
        setFont={setFont} 
      />
        
      <CV 
        data={cvData} 
        order={order} 
        bulletPoints={bulletPoints} 
        font={font} 
      />
    </div>
  )
}
