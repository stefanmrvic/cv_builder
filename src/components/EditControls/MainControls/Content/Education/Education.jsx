import { useState, useRef } from 'react';
import { useAppContext, useEducation } from '../../../../../AppContext.jsx';

import EducationItem from './EducationItem.jsx';
import EducationForm from './EducationForm.jsx';

import styles from './Education.module.css';

export default function Education() {
    const { setCVData } = useAppContext();
    const education = useEducation();

    const [isExpanded, setIsExpanded] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isNew, setIsNew] = useState(false)
    const [formData, setFormData] = useState({
        id: '',
        isVisible: '',
        schoolName: '',
        graduationDate: '',
        qualification: '',
        schoolLocation: ''
    })

    const educationItemContainerRef = useRef(null);
    const arrowDownRef = useRef(null);

    const toggleCollapsing = () => {
        arrowDownRef.current.classList.toggle(`${styles.active}`);

        if (isExpanded) handleCloseAnimation();
        setIsExpanded(!isExpanded);
    }

    const handleCloseAnimation = () => {
        educationItemContainerRef.current.setAttribute("class", `${styles.educationItemContainer} ${styles.closing}`)
        educationItemContainerRef.current.onanimationend = () => setIsExpanded(!isExpanded);
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

        setIsNew(true)
        setCVData(draft => {
            draft.education.push(createEducationItem)
        })
        setFormData(createEducationItem);
        setIsFormOpen(true);
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
                    setIsNew={setIsNew}
                    isFormOpen={isFormOpen}
                    setIsFormOpen={setIsFormOpen}
                    formData={formData} 
                    setFormData={setFormData} 
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
                            setIsFormOpen={setIsFormOpen}
                            setFormData={setFormData}    
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