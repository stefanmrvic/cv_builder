import { useAppContext } from '../../../AppContext.jsx'

import defaultCV from '../../../data/defaultCV.js'

import styles from './TopControls.module.css'

export default function TopControls() {
    const { setCVData } = useAppContext();
    
    const handleCVRemoval = () => {
        const emptyCV = {
            personalInfo: {
                fullName: 'Your Name',
                birthDay: '', 
                email: '', 
                phone: '', 
                location: '', 
                linkedin: ''
            },
            workExperience: [],
            skillsToolsInterests: {
                certifications: {
                    items: [],
                    isVisible: true
                },
                skills: {
                    items: [],
                    isVisible: true
                },
                tools: {
                    items: [],
                    isVisible: true
                },
                interests: {
                    items: [],
                    isVisible: true
                }
            },
            education: []
        }

        setCVData(draft => {
            return emptyCV;
        })
    }

    const handleLoadDefaultCV = () => {
        setCVData(draft => {
            return defaultCV;
        })
    }

    return (
        <div className={styles.topControls}>
            <nav className={styles.topNavbar}>
                <button className={`${styles.btn} ${styles.clearResume}`} onClick={handleCVRemoval}>
                    <span className="material-icons">delete</span>
                    <span>Clear Resume</span>
                </button>
                <button className={`${styles.btn} ${styles.loadExample}`} onClick={handleLoadDefaultCV}> 
                    <span>Load Example</span>
                </button>
            </nav>
        </div>
    )
}