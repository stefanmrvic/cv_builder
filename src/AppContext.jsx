import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer'

import defaultCV from './data/defaultCV.js'

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Utilizing useRef hook to keep track of whether the component is mounted or not, in order to prevent localStorage data overwriting on initial load.
  const cvDataEffectRan = useRef(false);
  const orderEffectRan = useRef(false);
  const bulletPointsEffectRan = useRef(false);

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
    main: 'square',
    sub: 'circle'
  })

  // Updates the states which are passed throughout the App with the localStorage objects on initial load.
  useEffect(() => {
    const cvData = JSON.parse(localStorage.getItem('cvData'))
    const order = JSON.parse(localStorage.getItem('order'))
    const bulletPoints = JSON.parse(localStorage.getItem('bulletPoints'))

    if (cvData) setCVData(cvData)
    if (order) setOrder(order)
    if (bulletPoints) setBulletPoints(bulletPoints)
  }, []);

  // Prevents useEffect function to run at mount, but rather only when cvData is updated, 
  // so that localStorage setItem function doesn't overwrite saved localStorage object on initial mount.
  useEffect(() => {
    if (cvDataEffectRan.current) {
      localStorage.setItem('cvData', JSON.stringify(cvData));
    } else { 
      cvDataEffectRan.current = true;
    }
  }, [cvData])

  // Prevents useEffect function to run at mount, but rather only when order is updated, 
  // so that localStorage setItem function doesn't overwrite saved localStorage object on initial mount.
  useEffect(() => {
    if (orderEffectRan.current) {
      localStorage.setItem('order', JSON.stringify(order));
    } else {
      orderEffectRan.current = true;
    }
  }, [order])

  // Prevents useEffect function to run at mount, but rather only when bulletPoints is updated, 
  // so that localStorage setItem function doesn't overwrite saved localStorage object on initial mount.
  useEffect(() => {
    if (bulletPointsEffectRan.current) {
      localStorage.setItem('bulletPoints', JSON.stringify(bulletPoints));
    } else {
      bulletPointsEffectRan.current = true;
    }
  }, [bulletPoints])


  return (
      <AppContext value={{ cvData, setCVData, order, setOrder, bulletPoints, setBulletPoints }}>
          {children}
      </AppContext>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('AppContext must be valid!');

  return context;
}

export const usePersonalInfo = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('AppContext must be valid!');

  const personalInfo = context?.cvData?.personalInfo;

  return personalInfo;
}

export const useWorkExperience = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('AppContext must be valid!');

  const workExperience = context?.cvData?.workExperience;

  return workExperience;
}

export const useSkills = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('AppContext must be valid!');

  const skillsToolsInterests = context?.cvData?.skillsToolsInterests;

  return skillsToolsInterests;
}

export const useEducation = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('AppContext must be valid!');

  const education = context?.cvData?.education;

  return education;
}