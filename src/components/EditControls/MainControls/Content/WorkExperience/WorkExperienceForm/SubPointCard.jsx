import { useState } from 'react';
import { useAppContext } from '../../../../../../AppContext';
import { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem } from '../../../../../../utils/localStorage';

import styles from './WorkExperienceForm.module.css';

export default function SubPointCard({ subPoint, index, companyID, positionID, pointID, isNewSubPoint, handleIsNewSubPoint }) {
    const { setCVData } = useAppContext();

    // Utilizing localStorage to perserve state across page reloads in case user accidentally reloads or closes the tab while filling in the fields.
    // It expands the SubPointCard by default if the user created new SubPoint.
    const persistentIsExpanded = getLocalStorageItem(`isExpanded - SubPoint: ${subPoint.id}`, isNewSubPoint);
    const [isExpanded, setIsExpanded] = useState(persistentIsExpanded);

    const persistentIsVisible = getLocalStorageItem(`isVisibleSubPoint - ${subPoint.id}`, true);
    const [isVisible, setIsVisible] = useState(persistentIsVisible);

    const handleIsExpanded = (newState) => {
        setIsExpanded(newState);
        setLocalStorageItem(`isExpanded - SubPoint: ${subPoint.id}`, newState);
    }

    const handleIsVisible = (newState) => {
        setIsVisible(newState);
        setLocalStorageItem(`isVisible - SubPoint: ${subPoint.id}`, newState);
    }

    const handleDelete = (e) => {
        e.stopPropagation(); 

        if (!subPoint.id) throw new Error('subPoint.id is undefined!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(item => item.id === positionID);
            if (position === undefined) throw new Error('Position  not found!');    
            
            const point = position.responsibilities.find(item => item.id === pointID);
            if (point === undefined) throw new Error('Point not found!');

            const subPointIndex = point.subPoints.findIndex(item => item.id === subPoint.id);
            if (subPointIndex === -1) throw new Error('Sub-Point not found!');

            point.subPoints.splice(subPointIndex, 1);
        });

        // Removes the stored isExpanded state of SubPoint inside of localStorage, in order to prevent clutter.
        removeLocalStorageItem(`isExpanded - SubPoint: ${subPoint.id}`);
    }

    const handleVisibility = (e) => {
        // Stops bubbling to parent <div> with onClick handler
        e.stopPropagation()
        
        // Stops default form submit behavior
        e.preventDefault();
        
        if (isExpanded && subPoint.isVisible) handleIsExpanded(!isExpanded);

        if (!subPoint.id) throw new Error('subPoint.id is undefined!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(item => item.id === positionID);
            if (position === undefined) throw new Error('Position  not found!');     

            const point = position.responsibilities.find(item => item.id === pointID);
            if (point === undefined) throw new Error('Point not found!');

            const subPointItem = point.subPoints.find(item => item.id === subPoint.id);
            if (subPointItem === undefined) throw new Error('Sub-Point not found!');

            subPointItem.isVisible = !subPoint.isVisible;
        });
        
        handleIsVisible(!isVisible);
    }

    const handleDescription = (e) => {
        if (!subPoint.id) throw new Error('subPoint.id is undefined!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(item => item.id === positionID);
            if (position === undefined) throw new Error('Position  not found!');     

            const point = position.responsibilities.find(item => item.id === pointID);
            if (point === undefined) throw new Error('Point not found!');

            const subPointItem = point.subPoints.find(item => item.id === subPoint.id);
            if (subPointItem === undefined) throw new Error('Sub-Point not found!');

            subPointItem.subPoint = e.target.value;
        });
    }

    const handleCollapsing = () => {
        handleIsExpanded(!isExpanded);

        if (isNewSubPoint) handleIsNewSubPoint(false);
    }

    const isPlaceholderTitle = subPoint.subPoint.toLowerCase().includes('subpoint');

    return (
        <div aria-expanded={isExpanded} className={styles.subPointContainer}>
            <span className={styles.subPointHeadline}>{`Sub-Point #${index +1}`}</span>

            <div className={styles.subPointCardContainer}>
                <div 
                    aria-controls='subpoint-description'
                    className={styles.subPointHeaderContainer} 
                    onClick={handleCollapsing}
                >
                    <span className={`${styles.expandArrowIcon} material-icons`}>
                        {isExpanded ? 'arrow_drop_down' : 'arrow_right'}
                    </span>

                    <span className={styles.subPointDescription}>{subPoint.subPoint}</span>

                    <div className={styles.subPointBtnContainer}>
                        <button 
                            aria-label={isVisible ? 'Hide subpoint' : 'Show subpoint'}
                            className={styles.subPointVisibilityBtn} 
                            onClick={handleVisibility}
                        >
                            <span className={`${styles.subPointVisibilityBtnIcon} material-symbols-outlined`}>
                                {isVisible ? 'visibility' : 'visibility_off'}
                            </span>
                        </button>

                        <button 
                            aria-label='Delete subpoint'
                            className={styles.subPointDeleteBtn} 
                            onClick={handleDelete}
                        >
                            <span className={`${styles.subPointDeleteBtnIcon} material-icons`}>delete</span>
                        </button>
                    </div>
                </div>

                {isExpanded && (
                    <div 
                        id='subpoint-description'
                        className={styles.subPointFormContainer}
                    >
                        <div className={styles.subPointFormGroup}>
                            <label htmlFor="sub-point">Description</label>
                            <textarea type="text" name="sub-point" id="sub-point" autoFocus={isNewSubPoint} value={(isNewSubPoint && isPlaceholderTitle) ? '' : (subPoint?.subPoint || '')} onChange={handleDescription} placeholder="Enter sub-point description..." />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}