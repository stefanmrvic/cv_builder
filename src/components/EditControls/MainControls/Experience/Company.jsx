import { useState, useRef } from 'react';

import Position from './Position.jsx';

import styles from './Experience.module.css';

export default function Company({data, setCVData, setIsExperienceFormOpen, setExperienceFormData}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const positionsContainerRef = useRef(null);
    const arrowDownRef = useRef(null);

    const handleDelete = (e) => {
        e.stopPropagation();
        
        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === data.id);
            if (!company) throw new Error('Company not found!');

            const companyIndex = draft.workExperience.findIndex(company => company.id === data.id);
            if (companyIndex === undefined) throw new Error('Company not found!');

            draft.workExperience.splice(companyIndex, 1);
        })
    }

    const handleVisibility = (e) => {
        e.stopPropagation();
  
        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === data.id);
            if (!company) throw new Error('Company not found!');
            
            company.isVisible = !company.isVisible;
       })
    }

    const handleEdit = (e) => {
        e.stopPropagation();

        if (!data.id) throw new Error('CompanyID not found!');

        setExperienceFormData({
            id: data.id,
            isVisible: data.isVisible,
            companyName: data.companyName,
            location: data.location,
            positions: data.positions
        })

        setIsExperienceFormOpen(true);
    }

    const toggleCollapsing = () => {
        arrowDownRef.current.classList.toggle(`${styles.active}`);
        
        if (isExpanded) handleCloseAnimation();
        setIsExpanded(!isExpanded);
    }
    
    const handleCloseAnimation = () => {
        positionsContainerRef.current.setAttribute("class", `${styles.positionsContainer} ${styles.closing}`)
        positionsContainerRef.current.onanimationend = () => setIsExpanded(!isExpanded);
    }

    return (
        <div className={styles.companyCard}>
            <div onClick={toggleCollapsing} className={styles.companyHeaderContainer} role='button'>
                <div className={styles.companyHeadlineContainer}>
                    {/* Display an arrow icon if there are positions under given Company. */}
                    {data.positions.length > 0 && (
                        <span className={`${styles.arrowDown} material-symbols-outlined`} ref={arrowDownRef}>keyboard_arrow_down</span>
                    )}
                    <span className={styles.companyHeadline}>{data.companyName}</span>
                </div>

                <div className={styles.companyHeaderBtnContainer}>
                    <button className={styles.visibilityBtn} onClick={handleVisibility}>
                        <span className={`${styles.visibilityBtnIcon} material-symbols-outlined`}>
                            {data.isVisible ? 'visibility' : 'visibility_off'}
                        </span>
                    </button>

                    <button className={styles.deleteBtn} onClick={handleDelete}>
                        <span className={`${styles.deleteBtnIcon} material-icons`}>delete</span>
                    </button>

                    <button className={styles.editBtn} onClick={handleEdit}>
                        <span className={`${styles.editBtnIcon} material-symbols-outlined`}>edit_square</span>
                    </button>
                </div>
            </div>

            {/* Expose this section if there are job positions under the given Company. */}
            {isExpanded && (
                <div className={styles.positionsContainer} ref={positionsContainerRef}>
                    {data.positions.map(position => (
                        <Position
                            key={position.id}
                            data={position}
                            setCVData={setCVData}
                            companyID={data.id}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}