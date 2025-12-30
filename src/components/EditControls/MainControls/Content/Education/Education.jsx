import { useState, useRef } from 'react';
import { useAppContext, useEducation } from '../../../../../AppContext.jsx';
import { getLocalStorageItem, setLocalStorageItem } from '../../../../../utils/localStorage.js';

import EducationItem from './EducationItem.jsx';
import EducationForm from './EducationForm.jsx';

import styles from './Education.module.css';

export default function Education() {
    const { setCVData } = useAppContext();
    const education = useEducation();

    // Utilizing localStorage to perserve state across page reloads in case user accidentally reloads or closes the tab while filling in the fields.
    const persistentIsExpanded = getLocalStorageItem('isExpanded - Education', false);
    const [isExpanded, setIsExpanded] = useState(persistentIsExpanded);

    const persistentIsFormOpen = getLocalStorageItem('isFormOpen - Education', false);
    const [isFormOpen, setIsFormOpen] = useState(persistentIsFormOpen);

    const persistentIsNew = getLocalStorageItem('isNew - Education', false);
    const [isNew, setIsNew] = useState(persistentIsNew)

    const persistentFormData = getLocalStorageItem('formData - Education', {
        id: '',
        isVisible: '',
        schoolName: '',
        graduationDate: '',
        qualification: '',
        schoolLocation: ''
    });
    const [formData, setFormData] = useState(persistentFormData)

    const educationItemContainerRef = useRef(null);
    const arrowDownRef = useRef(null);

    const handleIsExpanded = (newState) => {
        setIsExpanded(newState);
        setLocalStorageItem('isExpanded - Education', newState)
    }

    const handleIsFormOpen = (newState) => {
        setIsFormOpen(newState);
        setLocalStorageItem('isFormOpen - Education', newState);
    }

    const handleFormData = (newState) => {
        setFormData(newState);
        setLocalStorageItem('formData - Education', newState);
    }

    const handleIsNew = (newState) => {
        setIsNew(newState);
        setLocalStorageItem('isNew - Education', newState);
    }

    const toggleCollapsing = () => {
        arrowDownRef.current.classList.toggle(`${styles.active}`);

        if (isExpanded) handleCloseAnimation();
        handleIsExpanded(!isExpanded);
    }

    const handleCloseAnimation = () => {
        educationItemContainerRef.current.setAttribute("class", `${styles.educationItemContainer} ${styles.closing}`)
        educationItemContainerRef.current.onanimationend = () => handleIsExpanded(!isExpanded);
    }

    const handleAddBtnClick = () => {
        const createEducationItem = {
            id: crypto.randomUUID(),
            isVisible: true, 
            schoolName: '',
            graduationDate: '',
            qualification: '',
            schoolLocation: ''
        }

        handleIsNew(true)
        setCVData(draft => {
            draft.education.push(createEducationItem)
        })
        handleFormData(createEducationItem);
        handleIsFormOpen(true);
    }

    return (
        <div className={styles.educationContainer}>
            {!isFormOpen && (
                <button className={`${styles.educationHeader} ${isFormOpen ? styles.formOpened : ''} ${isExpanded ? styles.active : ''}`} onClick={toggleCollapsing}>
                    <span className={`${styles.btnIcon} material-symbols-outlined`}>school</span>
                    <span className={styles.educationHeadline}>Education</span>
                    <span className={`${styles.arrowDown} material-symbols-outlined`} ref={arrowDownRef}>keyboard_arrow_down</span>
                </button>
            )}

            {(isExpanded && isFormOpen) && (
                <EducationForm 
                    isNew={isNew}
                    handleIsNew={handleIsNew}
                    isFormOpen={isFormOpen}
                    handleIsFormOpen={handleIsFormOpen}
                    formData={formData} 
                    handleFormData={handleFormData} 
                />
            )}

            {/* It purposely doesn't render div container conditionally with checks (isExpanded && !isFormOpen) to avoid jumping 
                of Education items when form opens / closes. Instead, it only checks if Education menu has been expanded. */}
            {isExpanded && (
                // Hides the button elements if the form is opened
                <div className={`${styles.educationItemContainer} ${isFormOpen ? styles.hidden : ''}`} ref={educationItemContainerRef}>
                    {education?.map(item => {
                        return <EducationItem 
                            key={item.id}
                            educationID={item.id}
                            isVisible={item.isVisible}
                            handleIsFormOpen={handleIsFormOpen}
                            handleFormData={handleFormData}    
                        />
                    })}

                    <div className={styles.addBtnContainer}>
                        <button 
                            className={`${styles.addBtn} ${styles.btn}`} 
                            onClick={handleAddBtnClick}
                        >
                            <span className={`${styles.addBtnIcon} material-symbols-outlined`}>add</span>
                            <span>Education</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}