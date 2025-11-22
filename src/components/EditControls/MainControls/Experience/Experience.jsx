import { useState, useRef } from 'react';

import Company from './Company.jsx';
import ExperienceForm from './ExperienceForm.jsx';

import styles from './Experience.module.css';

export default function Experience({data, setCVData}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
    const [isNewExperience, setIsNewExperience] = useState(false)
    const [experienceFormData, setExperienceFormData] = useState({
        id: '',
        isVisible: '',
        companyName: '',
        location: '',
        positions: []
    })

    const companyContainerRef = useRef(null);
    const arrowDownRef = useRef(null);

    const toggleCollapsing = () => {
        arrowDownRef.current.classList.toggle(`${styles.active}`);
        
        if (isExpanded) handleCloseAnimation();
        setIsExpanded(!isExpanded);
    }

    const handleCloseAnimation = () => {
        companyContainerRef.current.setAttribute("class", `${styles.companyContainer} ${styles.closing}`)
        companyContainerRef.current.onanimationend = () => setIsExpanded(!isExpanded);
    }

    const handleAddExperience = () => {
        const newExperience = {
            id: crypto.randomUUID(),
            isVisible: true,
            companyName: '',
            location: '',
            positions: []
        }

        setIsNewExperience(true)
        setCVData(draft => {
            draft.workExperience.push(newExperience)
        })
        setExperienceFormData(newExperience);
        setIsExperienceFormOpen(true);
    }

    return (
        <div className={styles.experienceContainer}>
            <button className={`${styles.experienceHeaderContainer} ${isExperienceFormOpen ? styles.formOpened : ''} ${isExpanded ? styles.active : ''}`} onClick={toggleCollapsing}>
                <span className={`${styles.btnIcon} material-symbols-outlined`}>business_center</span>
                <span className={styles.experienceHeadline}>Experience</span>
                <span className={`${styles.arrowDown} material-symbols-outlined`} ref={arrowDownRef}>keyboard_arrow_down</span>
            </button>

            {(isExpanded && isExperienceFormOpen) && (
                <ExperienceForm 
                    data={data} 
                    setCVData={setCVData} 
                    isNewExperience={isNewExperience}
                    setIsNewExperience={setIsNewExperience}
                    isExperienceFormOpen={isExperienceFormOpen}
                    setIsExperienceFormOpen={setIsExperienceFormOpen}
                    experienceFormData={experienceFormData} 
                    setExperienceFormData={setExperienceFormData} 
                />
            )}

            {/* Always renders the container to avoid layout shift. Content visibility is controlled by isExpanded. */}
            {isExpanded && (
                // Hides the button elements if the form is opened
                <div className={`${styles.companyContainer} ${isExperienceFormOpen ? styles.hidden : ''}`} ref={companyContainerRef}>
                    {data?.map(company => (
                        <Company 
                            key={company.id}
                            data={company}
                            setCVData={setCVData}
                            setExperienceFormData={setExperienceFormData}
                            setIsExperienceFormOpen={setIsExperienceFormOpen}
                        />
                    ))}

                    <div className={styles.addBtnContainer}>
                        <button 
                            className={`${styles.addBtn} ${styles.btn}`} 
                            onClick={handleAddExperience}
                        >
                            <span className={`${styles.addBtnIcon} material-symbols-outlined`}>add</span>
                            <span>Experience</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}