import { createContext, useContext, useState } from 'react';
import { useImmer } from 'use-immer'

import defaultCV from './data/defaultCV.js'

const AppContext = createContext(null);

export function AppProvider({ children }) {
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