import { useState, useRef } from 'react';

import ExperienceItem from './ExperienceItem.jsx';

import styles from './MainControls.module.css';

export default function Experience() {
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
        <div className={styles.experienceContainer}>
            <button className={`${styles.toggleBtn} ${isOpen ? styles.active : ''}`} onClick={toggleCollapsingAnimation}>
                <span className={`${styles.btnIcon} material-symbols-outlined`}>business_center</span>
                <span className={styles.experienceHeadline}>Experience</span>
                <span className={`${styles.arrowDown} material-symbols-outlined`} ref={arrowDownRef}>keyboard_arrow_down</span>
            </button>

            {isOpen &&
                <div className={`${styles.btnContainer} ${styles.opening}`} ref={btnContainerRef}>
                        <ExperienceItem experience='Netflix' />
                        <ExperienceItem experience='Black Mesa Labs' />

                        <div className={styles.addBtnContainer}>
                            <button className={`${styles.addBtn} ${styles.btn}`}>
                                <span className={`${styles.addBtnIcon} material-symbols-outlined`}>add</span>
                                <span>Experience</span>
                            </button>
                        </div>
                </div>
            }
        </div>
    )
}