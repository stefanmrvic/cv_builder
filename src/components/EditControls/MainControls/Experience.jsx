import { useState, useRef } from 'react';

import ExperienceList from './ExperienceList.jsx';
import ExperienceItem from './ExperienceItem.jsx';
import ExperienceForm from './ExperienceForm.jsx';

import styles from './MainControls.module.css';

export default function Experience() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const btnContainerRef = useRef(null);
    const arrowDownRef = useRef(null);

    function toggleCollapsingAnimation() {
        arrowDownRef.current.classList.toggle(`${styles.active}`);

        if (isExpanded) handleCloseAnimation();
        else setIsExpanded(!isExpanded);
    }

    function handleCloseAnimation() {
        btnContainerRef.current.setAttribute("class", `${styles.btnContainer} ${styles.closing}`)
        btnContainerRef.current.onanimationend = () => setIsExpanded(!isExpanded);
    }

    return (
        <div className={styles.experienceContainer}>
            <button className={`${styles.toggleBtn} ${isExpanded ? styles.active : ''}`} onClick={toggleCollapsingAnimation}>
                <span className={`${styles.btnIcon} material-symbols-outlined`}>business_center</span>
                <span className={styles.experienceHeadline}>Experience</span>
                <span className={`${styles.arrowDown} material-symbols-outlined`} ref={arrowDownRef}>keyboard_arrow_down</span>
            </button>

            {isFormOpen &&

                <ExperienceForm />
            }

            {(!isFormOpen && isExpanded) &&
                <ExperienceList 
                    onClick={() => setIsFormOpen(!isFormOpen)} 
                    ref={btnContainerRef} 
                /> 
            }
        </div>
    )
}