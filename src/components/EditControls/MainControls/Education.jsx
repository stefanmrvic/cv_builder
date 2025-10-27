import { useState, useRef } from 'react';

import EducationItem from './EducationItem.jsx';

import styles from './MainControls.module.css';

export default function Education() {
    const [isOpen, setIsOpen] = useState(false);
    const btnContainerRef = useRef(null);
    const arrowDownRef = useRef(null);

    function toggleCollapsingAnimation() {
        arrowDownRef.current.classList.toggle(`${styles.active}`);

        if (isOpen) handleCloseAnimation();
        else setIsOpen(!isOpen);
    }

    function handleCloseAnimation() {
        btnContainerRef.current.setAttribute("class", `${styles.btnContainer} ${styles.closing}`)
        btnContainerRef.current.onanimationend = () => setIsOpen(!isOpen);
    }

    return (
        <div className={styles.educationContainer}>
            <button className={`${styles.toggleBtn} ${isOpen ? styles.active : ''}`} onClick={toggleCollapsingAnimation}>
                <span className={`${styles.btnIcon} material-symbols-outlined`}>school</span>
                <span className={styles.educationHeadline}>Education</span>
                <span className={`${styles.arrowDown} material-symbols-outlined`} ref={arrowDownRef}>keyboard_arrow_down</span>
            </button>

            {isOpen &&
                <div className={`${styles.btnContainer} ${styles.opening}`} ref={btnContainerRef}>
                        <EducationItem university='University of Barkeley' />
                        <EducationItem university='Masters University' />

                        <div className={styles.addBtnContainer}>
                            <button className={`${styles.addBtn} ${styles.btn}`}>
                                <span className={`${styles.addBtnIcon} material-symbols-outlined`}>add</span>
                                <span>Education</span>
                            </button>
                        </div>
                </div>
            }
        </div>
    )
}