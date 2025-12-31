import { useState, useRef } from 'react';
import { useAppContext } from '../../../../../AppContext.jsx';
import { removeLocalStorageItem } from '../../../../../utils/localStorage.js';

import Position from './Position.jsx';

import styles from './WorkExperience.module.css';
import { setLocalStorageItem, getLocalStorageItem } from '../../../../../utils/localStorage.js';

export default function Company({ company, handleExperienceFormData, handleIsExperienceFormOpen, handlePositionFormData, handleIsPositionFormOpen }) {
    const { setCVData } = useAppContext();

    const persistentIsExpanded = getLocalStorageItem(`isExpanded - Company: ${company.id}`, false);
    const [isExpanded, setIsExpanded] = useState(persistentIsExpanded);

    const positionsContainerRef = useRef(null);
    const arrowDownRef = useRef(null);

    const handleIsExpanded = (newState) => {
        setIsExpanded(newState);
        setLocalStorageItem(`isExpanded - Company: ${company.id}`, newState);
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        
        setCVData(draft => {
            const companyItem = draft.workExperience.find(item => item.id === company.id);
            if (!companyItem) throw new Error('Company not found!');

            const companyIndex = draft.workExperience.findIndex(item => item.id === company.id);
            if (companyIndex === undefined) throw new Error('Company not found!');

            draft.workExperience.splice(companyIndex, 1);
        })

        // Removes the stored isExpanded state of Company inside of localStorage, in order to prevent clutter.
        removeLocalStorageItem(`isExpanded - Company: ${company.id}`);
    }

    const handleVisibility = (e) => {
        e.stopPropagation();
  
        setCVData(draft => {
            const companyItem = draft.workExperience.find(item => item.id === company.id);
            if (!companyItem) throw new Error('Company not found!');
            
            companyItem.isVisible = !companyItem.isVisible;
       })
    }

    const handleEdit = (e) => {
        e.stopPropagation();

        if (!company.id) throw new Error('CompanyID not found!');

        handleExperienceFormData({
            id: company.id,
            isVisible: company.isVisible,
            companyName: company.companyName,
            location: company.location,
            positions: company.positions
        })

        handleIsExperienceFormOpen(true);
    }

    const toggleCollapsing = () => {
        // Early return if there are no positions under given company.
        if (positionCount === 0) return;

        arrowDownRef.current.classList.toggle(`${styles.active}`);
        
        if (isExpanded) handleCloseAnimation();
        handleIsExpanded(!isExpanded);
    }
    
    const handleCloseAnimation = () => {
        positionsContainerRef.current.setAttribute("class", `${styles.positionsContainer} ${styles.closing}`)
        positionsContainerRef.current.onanimationend = () => handleIsExpanded(!isExpanded);
    }

    const positionCount = company.positions.length;

    return (
        <div className={styles.companyCard}>
            <div 
                aria-expanded={isExpanded}
                aria-controls='position-items'
                className={styles.companyHeaderContainer} 
                role='button' 
                onClick={toggleCollapsing}
            >
                <div className={styles.companyHeadlineContainer}>
                    {/* Display an arrow icon if there are positions under given Company. */}
                    {positionCount > 0 && (
                        <span className={`${styles.arrowDown} material-symbols-outlined`} ref={arrowDownRef}>keyboard_arrow_down</span>
                    )}
                    <span className={`${styles.companyHeadline} ${positionCount === 0 ? styles.alone : ''}`}>{company.companyName}</span>
                </div>

                <div className={styles.companyHeaderBtnContainer}>
                    <button 
                        aria-label={company.isVisible ? 'Hide company' : 'Show company'}
                        className={styles.visibilityBtn} 
                        onClick={handleVisibility}
                    >
                        <span className={`${styles.visibilityBtnIcon} material-symbols-outlined`}>
                            {company.isVisible ? 'visibility' : 'visibility_off'}
                        </span>
                    </button>

                    <button 
                        aria-label='Delete company'
                        className={styles.deleteBtn} 
                        onClick={handleDelete}
                    >
                        <span className={`${styles.deleteBtnIcon} material-icons`}>delete</span>
                    </button>

                    <button 
                        aria-label='Edit company'
                        aria-controls='company-form'
                        className={styles.editBtn} 
                        onClick={handleEdit}
                    >
                        <span className={`${styles.editBtnIcon} material-symbols-outlined`}>edit_square</span>
                    </button>
                </div>
            </div>

            {/* Show this section if there are job positions under given Company. */}
            {isExpanded && (
                <div 
                    id='position-items'
                    className={styles.positionsContainer} 
                    ref={positionsContainerRef}
                >
                    {company.positions.map(position => (
                        <Position
                            key={position.id}
                            position={position}
                            handlePositionFormData={handlePositionFormData}
                            handleIsPositionFormOpen={handleIsPositionFormOpen}
                            // TO-DO Refactor Company ID passing logic
                            companyID={company.id}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}