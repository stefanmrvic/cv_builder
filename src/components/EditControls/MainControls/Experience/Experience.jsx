import { useState, useRef } from 'react';

import Company from './Company.jsx';
import PositionForm from './PositionForm/PositionForm.jsx';
import ExperienceForm from './ExperienceForm/ExperienceForm.jsx';

import styles from './Experience.module.css';

export default function Experience({data, setCVData}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPositionFormOpen, setIsPositionFormOpen] = useState(false);
    const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
    const [isNewExperience, setIsNewExperience] = useState(false)

    // Created with purpose of tracking the original state of the Experience Form Data in case user wants to discard the made changes by clicking "Cancel" button.
    const [experienceFormData, setExperienceFormData] = useState({
        id: '',
        isVisible: '',
        companyName: '',
        location: '',
        positions: []
    })

    // Created with purpose of tracking the original state of the Posiiton Form Data in case user wants to discard the made changes by clicking "Cancel" button.
    const [positionFormData, setPositionFormData] = useState({
        id: '',
        companyID: '',
        isVisible: '',
        title: '',
        startDate: '',
        endDate: '',
        currentlyEmployed: '',
        responsibilities: []
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
            {!isExperienceFormOpen && (
                <button className={`${styles.experienceHeaderContainer} ${isExperienceFormOpen ? styles.formOpened : ''} ${isExpanded ? styles.active : ''}`} onClick={toggleCollapsing}>
                    <span className={`${styles.btnIcon} material-symbols-outlined`}>business_center</span>
                    <span className={styles.experienceHeadline}>Experience</span>
                    <span className={`${styles.arrowDown} material-symbols-outlined`} ref={arrowDownRef}>keyboard_arrow_down</span>
                </button>
            )}

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

            {(isExpanded && isPositionFormOpen) && (
                <PositionForm 
                    data={data} 
                    setCVData={setCVData} 
                    positionFormData={positionFormData}
                    setPositionFormData={setPositionFormData}
                    setIsPositionFormOpen={setIsPositionFormOpen}
                />
            )}

            {/* Always renders the container to avoid layout shift. Content visibility is controlled by isExpanded. */}
            {isExpanded && (
                // Hides the button elements if the form is opened
                <div className={`${styles.companyContainer} ${(isExperienceFormOpen || isPositionFormOpen) ? styles.hidden : ''}`} ref={companyContainerRef}>
                    {data?.map(company => (
                        <Company 
                            key={company.id}
                            data={company}
                            setCVData={setCVData}
                            setExperienceFormData={setExperienceFormData}
                            setIsExperienceFormOpen={setIsExperienceFormOpen}
                            setPositionFormData={setPositionFormData}
                            setIsPositionFormOpen={setIsPositionFormOpen}
                        />
                    ))}

                    <div className={styles.addBtnContainer}>
                        <button className={styles.addBtn} onClick={handleAddExperience}>
                            <span className={`${styles.addBtnIcon} material-symbols-outlined`}>add</span>
                            <span>Experience</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}