import { useState, useEffect } from 'react';
import { useAppContext } from '../../../../../../AppContext';

import styles from './WorkExperienceForm.module.css';

export default function SubPointCard({ subPoint, index, companyID, positionID, pointID, isNewSubPoint, setIsNewSubPoint }) {
    const { setCVData } = useAppContext();

    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Using useEffect Hook here to automatically expand the SubPoint card if the user created new SubPoint.
    useEffect(() => {
        if (isNewSubPoint) setIsExpanded(true);
    }, [])

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
    }

    const handleVisibility = (e) => {
        // Stops bubbling to parent <div> with onClick handler
        e.stopPropagation()
        
        // Stop default form submit behavior
        e.preventDefault();
        
        if (isExpanded && subPoint.isVisible) setIsExpanded(prevState => !prevState);

        if (!subPoint.id) throw new Error('subPoint.id is undefined!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(item => item.id === positionID);
            if (position === undefined) throw new Error('Position  not found!');     

            const point = position.responsibilities.find(item => item.id === pointID);
            if (point === undefined) throw new Error('Point not found!');

            const subPoint = point.subPoints.find(item => item.id === subPoint.id);
            if (subPoint === undefined) throw new Error('Sub-Point not found!');

            subPoint.isVisible = !subPoint.isVisible;
        });
        
        setIsVisible(prevState => !prevState);
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

            const subPoint = point.subPoints.find(item => item.id === subPoint.id);
            if (subPoint === undefined) throw new Error('Sub-Point not found!');

            subPoint.subPoint = e.target.value;
        });
    }

    const handleCollapsing = () => {
        setIsExpanded(prevState => !prevState);

        if (isNewSubPoint) setIsNewSubPoint(false);
    }

    const isPlaceholderTitle = subPoint.subPoint.toLowerCase().includes('subpoint');

    return (
        <div className={styles.subPointContainer}>
            <span className={styles.subPointHeadline}>{`Sub-Point #${index +1}`}</span>

            <div className={styles.subPointCardContainer}>
                <div className={styles.subPointHeaderContainer} onClick={handleCollapsing}>
                    <span className={`${styles.expandArrowIcon} material-icons`}>
                        {isExpanded ? 'arrow_drop_down' : 'arrow_right'}
                    </span>

                    <span className={styles.subPointDescription}>{subPoint.subPoint}</span>

                    <div className={styles.subPointBtnContainer}>
                        <button className={styles.subPointVisibilityBtn} onClick={handleVisibility}>
                            <span className={`${styles.subPointVisibilityBtnIcon} material-symbols-outlined`}>
                                {isVisible ? 'visibility' : 'visibility_off'}
                            </span>
                        </button>

                        <button className={styles.subPointDeleteBtn} onClick={handleDelete}>
                            <span className={`${styles.subPointDeleteBtnIcon} material-icons`}>delete</span>
                        </button>
                    </div>
                </div>

                {isExpanded && (
                    <div className={styles.subPointFormContainer}>
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