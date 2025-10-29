import { useState, useRef } from 'react';

import ExperienceList from './ExperienceList.jsx';
import ExperienceForm from './ExperienceForm.jsx';

import styles from './MainControls.module.css';

export default function Experience({setCVData}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const btnContainerRef = useRef(null);
    const arrowDownRef = useRef(null);

    function toggleCollapsing() {
        arrowDownRef.current.classList.toggle(`${styles.active}`);

        if (isFormOpen) setIsFormOpen(!isFormOpen);
        if (isExpanded) handleCloseAnimation();
        
        setIsExpanded(!isExpanded);
    }

    function handleCloseAnimation() {
        btnContainerRef.current.setAttribute("class", `${styles.btnContainer} ${styles.closing}`)
        btnContainerRef.current.onanimationend = () => setIsExpanded(!isExpanded);
    }

    return (
        <div className={styles.experienceContainer}>
            <button className={`${styles.toggleBtn} ${isFormOpen ? styles.formOpened : ''} ${isExpanded ? styles.active : ''}`} onClick={toggleCollapsing}>
                <span className={`${styles.btnIcon} material-symbols-outlined`}>business_center</span>
                <span className={styles.experienceHeadline}>Experience</span>
                <span className={`${styles.arrowDown} material-symbols-outlined`} ref={arrowDownRef}>keyboard_arrow_down</span>
            </button>

            {isFormOpen &&
                <ExperienceForm onClick={() => setIsFormOpen(!isFormOpen)}/>
            }

            {isExpanded &&
                <ExperienceList 
                    className={`${isFormOpen ? styles.hidden : ''}`}
                    onClick={() => setIsFormOpen(!isFormOpen)} 
                    ref={btnContainerRef} 
                /> 
            }
        </div>
    )
}