import { useState, useRef } from 'react';

import EducationList from './EducationList.jsx';
import EducationForm from './EducationForm.jsx';

import styles from './MainControls.module.css';

export default function Education() {
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
        <div className={styles.educationContainer}>
            <button className={`${styles.toggleBtn} ${isFormOpen ? styles.formOpened : ''} ${isExpanded ? styles.active : ''}`} onClick={toggleCollapsing}>
                <span className={`${styles.btnIcon} material-symbols-outlined`}>school</span>
                <span className={styles.educationHeadline}>Education</span>
                <span className={`${styles.arrowDown} material-symbols-outlined`} ref={arrowDownRef}>keyboard_arrow_down</span>
            </button>

            {isFormOpen &&
                <EducationForm onClick={() => setIsFormOpen(!isFormOpen)}/>
            }

            {isExpanded &&
                <EducationList 
                    className={`${isFormOpen ? styles.hidden : ''}`}
                    onClick={() => setIsFormOpen(!isFormOpen)} 
                    ref={btnContainerRef} 
                /> 
            }
        </div>
    )
}