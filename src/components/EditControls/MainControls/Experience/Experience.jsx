import { useState, useRef } from 'react';

import Company from './Company.jsx';
import ExperienceForm from './ExperienceForm.jsx';

import styles from './Experience.module.css';

export default function Experience({data, setCVData}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
    const [isPositionFormOpen, setIsPositionFormOpen] = useState(false);
    const [isNew, setIsNew] = useState(false)
    const [experienceFormData, setExperienceFormData] = useState({
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
        setExperienceFormData(createExperienceItem);
        setIsExperienceFormOpen(true);
    }

    return (
        <div className={styles.experienceContainer}>
            <button className={`${styles.toggleBtn} ${isExperienceFormOpen ? styles.formOpened : ''} ${isExpanded ? styles.active : ''}`} onClick={toggleCollapsing}>
                <span className={`${styles.btnIcon} material-symbols-outlined`}>business_center</span>
                <span className={styles.experienceHeadline}>Experience</span>
                <span className={`${styles.arrowDown} material-symbols-outlined`} ref={arrowDownRef}>keyboard_arrow_down</span>
            </button>

            {(isExpanded && isExperienceFormOpen) && (
                <ExperienceForm 
                    isNew={isNew}
                    setIsNew={setIsNew}
                    isExperienceFormOpen={isExperienceFormOpen}
                    setIsExperienceFormOpen={setIsExperienceFormOpen}
                    experienceFormData={experienceFormData} 
                    setExperienceFormData={setExperienceFormData} 
                    data={data} 
                    setCVData={setCVData} 
                />
            )}

            {/* It purposely doesn't render div container conditionally with checks (isExpanded && !isExperienceFormOpen) to avoid jumping 
                of Experience items when form opens / closes. Instead, it only checks if Experience menu has been expanded. */}
            {isExpanded && (
                // Hides the button elements if the form is opened
                <div className={`${styles.btnContainer} ${isExperienceFormOpen ? styles.hidden : ''}`} ref={btnContainerRef}>

                    {data?.map(item => {
                        return  <Company 
                            key={item.id}
                            itemID={item.id}
                            isVisible={item.isVisible}
                            data={data}
                            setCVData={setCVData}
                            setExperienceFormData={setExperienceFormData}
                            setIsExperienceFormOpen={setIsExperienceFormOpen}
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