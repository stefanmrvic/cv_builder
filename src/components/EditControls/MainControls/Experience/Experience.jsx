import { useState, useRef } from 'react';

import Company from './Company.jsx';
import ExperienceForm from './ExperienceForm.jsx';

import styles from '../MainControls.module.css';

export default function Experience({data, setCVData}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isNew, setIsNew] = useState(false)
    const [formData, setFormData] = useState({
        id: '',
        isVisible: '',
        companyName: '',
        location: '',
        positions: []
    })

    const btnContainerRef = useRef(null);
    const arrowDownRef = useRef(null);

    const toggleCollapsing = () => {
        arrowDownRef.current.classList.toggle(`${styles.active}`);

        if (isExpanded) handleCloseAnimation();

        setIsExpanded(!isExpanded);
    }

    const handleCloseAnimation = () => {
        btnContainerRef.current.setAttribute("class", `${styles.btnContainer} ${styles.closing}`)
        btnContainerRef.current.onanimationend = () => setIsExpanded(!isExpanded);
    }

    const populateForm = (id) => {
        const item = data.find(item => item.id === id)

        if (!item) return;

        setFormData({
            id: item.id,
            isVisible: item.isVisibile,
            schoolName: item.schoolName,
            graduationDate: item.graduationDate,
            qualification: item.qualification,
            schoolLocation: item.schoolLocation
        })
    }

    const handleAddBtnClick = () => {
        const createExperienceItem = {
            id: crypto.randomUUID(),
            isVisible: true,
            companyName: '',
            location: '',
            positions: []
        }

        setIsNew(true)
        setCVData(draft => {
            draft.workExperience.push(createExperienceItem)
        })
        setFormData(createExperienceItem);
        setIsFormOpen(true);
    }

    return (
        <div className={styles.experienceContainer}>
            <button className={`${styles.toggleBtn} ${isFormOpen ? styles.formOpened : ''} ${isExpanded ? styles.active : ''}`} onClick={toggleCollapsing}>
                <span className={`${styles.btnIcon} material-symbols-outlined`}>business_center</span>
                <span className={styles.experienceHeadline}>Experience</span>
                <span className={`${styles.arrowDown} material-symbols-outlined`} ref={arrowDownRef}>keyboard_arrow_down</span>
            </button>

            {(isExpanded && isFormOpen) && (
                <ExperienceForm 
                    isNew={isNew}
                    setIsNew={setIsNew}
                    isFormOpen={isFormOpen}
                    setIsFormOpen={setIsFormOpen}
                    formData={formData} 
                    setFormData={setFormData} 
                    data={data} 
                    setCVData={setCVData} 
                />
            )}

            {/* It purposely doesn't render div container conditionally with checks (isExpanded && !isFormOpen) to avoid jumping 
                of Experience items when form opens / closes. Instead, it only checks if Experience menu has been expanded. */}
            {isExpanded && (
                // Hides the button elements if the form is opened
                <div className={`${styles.btnContainer} ${isFormOpen ? styles.hidden : ''}`} ref={btnContainerRef}>

                    {data?.map(item => {
                        return  <Company 
                            key={item.id}
                            itemID={item.id}
                            isVisible={item.isVisible}
                            onClick={() => {
                                populateForm(item.id)
                                setIsFormOpen(true)}
                            }
                            setCVData={setCVData}
                            company={item.companyName}
                        />
                    })}

                    <div className={styles.addBtnContainer}>
                        <button 
                            className={`${styles.addBtn} ${styles.btn}`} 
                            onClick={handleAddBtnClick}
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