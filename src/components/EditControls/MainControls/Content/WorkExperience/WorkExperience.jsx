import { useState, useRef, useEffect } from 'react';
import { useAppContext, useWorkExperience } from '../../../../../AppContext.jsx';
import { setLocalStorageItem, getLocalStorageItem } from '../../../../../utils/localStorage.js';

import Company from './Company.jsx';
import PositionForm from './PositionForm/PositionForm.jsx';
import ExperienceForm from './WorkExperienceForm/WorkExperienceForm.jsx';

import styles from './WorkExperience.module.css';

export default function WorkExperience() {
    const { setCVData } = useAppContext();
    const workExperience = useWorkExperience();

    // Tracks the previous length of workExperience to use it in useEffect hook, in order to detect when the new workExperience gets added, so that it can pass 
    // updated array of workExperiences.
    const prevLengthRef = useRef(workExperience.length);

    // Utilizing localStorage to perserve state across page reloads in case user accidentally reloads or closes the tab while filling in the fields.
    const persistentIsExpanded = getLocalStorageItem('isExpanded - WorkExperience', false);
    const [isExpanded, setIsExpanded] = useState(persistentIsExpanded);

    const persistentIsPositionFormOpen = getLocalStorageItem('isFormOpen - Position', false);
    const [isPositionFormOpen, setIsPositionFormOpen] = useState(persistentIsPositionFormOpen);

    const persistentIsExperienceFormOpen = getLocalStorageItem('isFormOpen - Experience', false);
    const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(persistentIsExperienceFormOpen);

    const persistentIsNewPosition = getLocalStorageItem('isNewPosition', false);
    const [isNewPosition, setIsNewPosition] = useState(persistentIsNewPosition);

    const persistentIsNewExperience = getLocalStorageItem('isNewExperience', false);
    const [isNewExperience, setIsNewExperience] = useState(persistentIsNewExperience)

    // Created with purpose of tracking the original state of the Experience Form Data in case user wants to discard the made changes by clicking "Cancel" button.
    const persistentExperienceFormData = getLocalStorageItem('formData - Experience', {
        id: '',
        isVisible: '',
        companyName: '',
        location: '',
        positions: []
    });
    const [experienceFormData, setExperienceFormData] = useState(persistentExperienceFormData);

    // Created with purpose of tracking the original state of the Posiiton Form Data in case user wants to discard the made changes by clicking "Cancel" button.
    const persistentPositionFormData = getLocalStorageItem('formData - Position', {
        id: '',
        companyID: '',
        isVisible: '',
        title: '',
        startDate: '',
        endDate: '',
        currentlyEmployed: '',
        responsibilities: []
    })
    const [positionFormData, setPositionFormData] = useState(persistentPositionFormData);

    const companyContainerRef = useRef(null);

    // Below are the localStorage wrapper functions that update both state and localStorage
    const handleIsExpanded = (newState) => {
        setIsExpanded(newState)
        setLocalStorageItem('isExpanded - WorkExperience', newState);
    }

    const handleIsNewExperience = (newState) => {
        setIsNewExperience(newState)
        setLocalStorageItem('isNewExperience', newState);
    }

    const handleIsExperienceFormOpen = (newState) => {
        setIsExperienceFormOpen(newState)
        setLocalStorageItem('isFormOpen - Experience', newState);
    }
    
    const handleExperienceFormData = (newState) => {
        setExperienceFormData(newState)
        setLocalStorageItem('formData - Experience', newState);
    }
    
    const handleIsNewPosition = (newState) => {
        setIsNewPosition(newState)
        setLocalStorageItem('isNewPosition', newState);
    }

    const handleIsPositionFormOpen = (newState) => {
        setIsPositionFormOpen(newState)
        setLocalStorageItem('isFormOpen - Position', newState);
    }

    const handlePositionFormData = (newState) => {
        setPositionFormData(newState)
        setLocalStorageItem('formData - Position', newState);
    }

    const toggleCollapsing = () => {
        if (isExpanded) handleCloseAnimation();
        handleIsExpanded(!isExpanded);
    }

    const handleCloseAnimation = () => {
        companyContainerRef.current.setAttribute("class", `${styles.companyContainer} ${styles.closing}`)
        companyContainerRef.current.onanimationend = () => handleIsExpanded(!isExpanded);
    }

    const handleAddExperience = () => {
        const newExperience = {
            id: crypto.randomUUID(),
            isVisible: true,
            companyName: '',
            location: '',
            positions: []
        }

        setCVData(draft => {
            draft.workExperience.push(newExperience)
        })
    }

    useEffect(() => {
        const prevLength = prevLengthRef.current;
        const currLength = workExperience.length;

        if (currLength > prevLength) {
            const newlyAddedExperiencePos = workExperience.length - 1;
            
            handleExperienceFormData(workExperience[newlyAddedExperiencePos]);
            handleIsNewExperience(true);
            handleIsExperienceFormOpen(true);
        }

        prevLengthRef.current = workExperience.length;
    }, [workExperience.length])

    return (
        <div className={styles.experienceContainer}>
            {/* Only displays Experience header if both Experience and Position forms are closed. */}
            {(!isExperienceFormOpen && !isPositionFormOpen) && (
                <button className={`${styles.experienceHeaderContainer} ${(isExperienceFormOpen || isPositionFormOpen) ? styles.formOpened : ''} ${isExpanded ? styles.active : ''}`} onClick={toggleCollapsing}>
                    <span className={`${styles.btnIcon} material-symbols-outlined`}>business_center</span>
                    <span className={styles.experienceHeadline}>Work Experience</span>
                    <span className={`${isExpanded ? styles.active : ''} ${styles.arrowDown} material-symbols-outlined`}>keyboard_arrow_down</span>
                </button>
            )}

            {(isExpanded && isExperienceFormOpen) && (
                <ExperienceForm 
                    isNewExperience={isNewExperience}
                    handleIsNewExperience={handleIsNewExperience}
                    isNewPosition={isNewPosition}
                    handleIsNewPosition={handleIsNewPosition}
                    isExperienceFormOpen={isExperienceFormOpen}
                    handleIsExperienceFormOpen={handleIsExperienceFormOpen}
                    experienceFormData={experienceFormData} 
                    handleExperienceFormData={handleExperienceFormData} 
                />
            )}

            {(isExpanded && isPositionFormOpen) && (
                <PositionForm 
                    isNewPosition={isNewPosition}
                    handleIsNewPosition={handleIsNewPosition}
                    positionFormData={positionFormData}
                    isPositionFormOpen={isPositionFormOpen}
                    handleIsPositionFormOpen={handleIsPositionFormOpen}
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
                            handleExperienceFormData={handleExperienceFormData}
                            handleIsExperienceFormOpen={handleIsExperienceFormOpen}
                            handlePositionFormData={handlePositionFormData}
                            handleIsPositionFormOpen={handleIsPositionFormOpen}
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