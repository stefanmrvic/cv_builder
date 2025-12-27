import { useState, useRef } from 'react';
import { useAppContext, useWorkExperience } from '../../../../../AppContext.jsx';

import Company from './Company.jsx';
import PositionForm from './PositionForm/PositionForm.jsx';
import ExperienceForm from './WorkExperienceForm/WorkExperienceForm.jsx';

import styles from './WorkExperience.module.css';

export default function WorkExperience() {
    const { setCVData } = useAppContext();
    const workExperience = useWorkExperience();

    const [isExpanded, setIsExpanded] = useState(false);
    const [isPositionFormOpen, setIsPositionFormOpen] = useState(false);
    const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
    const [isNewPosition, setIsNewPosition] = useState(false);
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

    const toggleCollapsing = () => {
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
            {/* Only displays Experience header if both Experience and Position forms are closed. */}
            {(!isExperienceFormOpen && !isPositionFormOpen) && (
                <button className={`${styles.experienceHeaderContainer} ${(isExperienceFormOpen || isPositionFormOpen) ? styles.formOpened : ''} ${isExpanded ? styles.active : ''}`} onClick={toggleCollapsing}>
                    <span className={`${styles.btnIcon} material-symbols-outlined`}>business_center</span>
                    <span className={styles.experienceHeadline}>Experience</span>
                    <span className={`${isExpanded ? styles.active : ''} ${styles.arrowDown} material-symbols-outlined`}>keyboard_arrow_down</span>
                </button>
            )}

            {(isExpanded && isExperienceFormOpen) && (
                <ExperienceForm 
                    isNewExperience={isNewExperience}
                    setIsNewExperience={setIsNewExperience}
                    isNewPosition={isNewPosition}
                    setIsNewPosition={setIsNewPosition}
                    isExperienceFormOpen={isExperienceFormOpen}
                    setIsExperienceFormOpen={setIsExperienceFormOpen}
                    experienceFormData={experienceFormData} 
                    setExperienceFormData={setExperienceFormData} 
                />
            )}

            {(isExpanded && isPositionFormOpen) && (
                <PositionForm 
                    isNewPosition={isNewPosition}
                    setIsNewPosition={setIsNewPosition}
                    positionFormData={positionFormData}
                    isPositionFormOpen={isPositionFormOpen}
                    setIsPositionFormOpen={setIsPositionFormOpen}
                />
            )}

            {/* Always renders the container to avoid layout shift. Content visibility is controlled by isExpanded. */}
            {isExpanded && (
                // Hides the button elements if the form is opened
                <div className={`${styles.companyContainer} ${(isExperienceFormOpen || isPositionFormOpen) ? styles.hidden : ''}`} ref={companyContainerRef}>
                    {workExperience?.map(company => (
                        <Company 
                            key={company.id}
                            company={company}
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