import defaultCV from '../../../data/defaultCV.js'

import styles from './TopControls.module.css'

export default function TopControls({cvData, setCVData}) {
    const handleCVRemoval = () => {
        const emptyCV = {
            personalInfo: {
                fullName: '',
                birthDay: '', 
                email: '', 
                phone: '', 
                location: '', 
                linkedin: ''
            },
            workExperience: [],
            skillsToolsInterests: {
                skills: '',
                tools: '',
                interests: ''
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
                <button className={styles.clearResume} onClick={handleCVRemoval}>
                    <span className="material-icons">delete</span>
                    <span>Clear Resume</span>
                </button>
                <button className={styles.loadExample} onClick={handleLoadDefaultCV}> 
                    <span>Load Example</span>
                </button>
            </nav>
        </div>
    )
}