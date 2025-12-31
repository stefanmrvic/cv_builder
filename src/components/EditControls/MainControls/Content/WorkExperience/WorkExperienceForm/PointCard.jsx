import { useState } from 'react';
import { useAppContext } from '../../../../../../AppContext.jsx';
import { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem } from '../../../../../../utils/localStorage.js';

import SubPointCard from './SubPointCard.jsx';

import styles from './WorkExperienceForm.module.css';

export default function PointCard({ point, index, companyID, positionID, isNewPoint, handleIsNewPoint }) {
    const { setCVData } = useAppContext();

    // Utilizing localStorage to perserve state across page reloads in case user accidentally reloads or closes the tab while filling in the fields.
    // It expands the PointCard by default if the user creates new Point.
    const persistentIsExpanded = getLocalStorageItem(`isExpanded - Point: ${point.id}`, isNewPoint)
    const [isExpanded, setIsExpanded] = useState(persistentIsExpanded);

    const persistentIsNewSubPoint = getLocalStorageItem('isNewSubPoint', false)
    const [isNewSubPoint, setIsNewSubPoint] = useState(persistentIsNewSubPoint);

    const handleIsExpanded = (newState) => {
        setIsExpanded(newState);
        setLocalStorageItem(`isExpanded - Point: ${point.id}`, newState);
    }

    const handleIsNewSubPoint = (newState) => {
        setIsNewSubPoint(newState);
        setLocalStorageItem('isNewSubPoint', newState);
    }

    const handleDelete = (e) => {
        e.stopPropagation(); 

        if (!point.id) throw new Error('experienceFormData.id is undefined!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(item => item.id === positionID);
            if (position === undefined) throw new Error('Position  not found!');     

            const pointIndex = position.responsibilities.findIndex(item => item.id === point.id);
            if (pointIndex === -1) throw new Error('Point index not found!');

            position.responsibilities.splice(pointIndex, 1);
        });

        // Removes the stored isExpanded state of Point inside of localStorage, in order to prevent clutter.
        removeLocalStorageItem(`isExpanded - Point: ${point.id}`);
    }

    const handleVisibility = (e) => {
        // Stops bubbling to parent <div> with onClick handler
        e.stopPropagation()
        
        // Stop default form submit behavior
        e.preventDefault();
        
        // Collapses the Point Description if users turns off the visibility of that point, so that he can focus on other Points.
        if (isExpanded && point.isVisible) handleIsExpanded(false);

        if (!point.id) throw new Error('experienceFormData.id is undefined!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(item => item.id === positionID);
            if (position === undefined) throw new Error('Position  not found!');     

            const pointItem = position.responsibilities.find(item => item.id === point.id);
            if (pointItem === undefined) throw new Error('Point not found!');

            pointItem.isVisible = !point.isVisible;
        });
    }

    const handleDescription = (e) => {
        if (!point.id) throw new Error('experienceFormData.id is undefined!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(item => item.id === positionID);
            if (position === undefined) throw new Error('Position  not found!');     

            const pointItem = position.responsibilities.find(item => item.id === point.id);
            if (pointItem === undefined) throw new Error('Point not found!');

            pointItem.point = e.target.value;
        });
    }

    const handleCollapsing = () => {
        handleIsExpanded(!isExpanded);

        if (isNewPoint) handleIsNewPoint(false);
    }

    const handleAddSubPoint = (e) => {
        e.preventDefault();
        if (!point) throw new Error('Point not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(item => item.id === positionID)
            if (position === undefined) throw new Error('Position not found!');

            const pointItem = position.responsibilities.find(item => item.id === point.id);
            if (pointItem === undefined) throw new Error('Point not found!');

            const newSubPoint = {
                id: crypto.randomUUID(),
                isVisible: true,
                subPoint: `SubPoint #${point.subPoints.length +1}`,
            }

            pointItem.subPoints.push(newSubPoint)
        });

        handleIsNewSubPoint(true);
    }

    const isPlaceholderTitle = point.point.toLowerCase().includes('point');

    return (
        <div aria-expanded={isExpanded} className={styles.pointContainer}>
            <span className={styles.pointHeadline}>{`Point #${index +1}`}</span>

            <div className={styles.pointCardContainer}>
                <div 
                    aria-controls='point-description'
                    className={styles.pointHeaderContainer} 
                    onClick={handleCollapsing}
                >
                    <span className={`${styles.expandArrowIcon} material-icons`}>
                        {isExpanded ? 'arrow_drop_down' : 'arrow_right'}
                    </span>

                    <span className={styles.pointDescription}>{point.point}</span>

                    <div className={styles.pointBtnContainer}>
                        <button 
                            aria-label={point.isVisible ? 'Hide point' : 'Show point'}
                            className={styles.pointVisibilityBtn} 
                            onClick={handleVisibility}
                        >
                            <span className={`${styles.pointVisibilityBtnIcon} material-symbols-outlined`}>
                                {point.isVisible ? 'visibility' : 'visibility_off'}
                            </span>
                        </button>

                        <button 
                            aria-label="Delete point"
                            className={styles.pointDeleteBtn} 
                            onClick={handleDelete}
                        >
                            <span className={`${styles.pointDeleteBtnIcon} material-icons`}>delete</span>
                        </button>
                    </div>
                </div>

                {isExpanded && (
                    <div 
                        id='point-description'
                        className={styles.pointFormContainer}
                    >
                        <div className={styles.pointFormGroup}>
                            <label htmlFor="point">Description</label>
                            <textarea name="point" id="point" className={styles.pointTextarea} autoFocus={isNewPoint} value={(isNewPoint && isPlaceholderTitle) ? '' : (point?.point || '')} onChange={handleDescription} placeholder="Enter responsibility description..." />
                        </div>

                        <div className={styles.subResponsibilitiesContainer}>
                            {point.subPoints.length > 0 && (
                                point.subPoints.map((subPoint, index) => {
                                    const isNew = isNewSubPoint && index == point.subPoints.length - 1;

                                    return <SubPointCard 
                                        key={subPoint.id} 
                                        index={index} 
                                        subPoint={subPoint}
                                        // TO-DO Refactor Company/Posiiton/Point ID passing logic
                                        companyID={companyID}
                                        positionID={positionID}
                                        pointID={point.id} 
                                        isNewSubPoint={isNew}
                                        handleIsNewSubPoint={handleIsNewSubPoint}
                                    />
                                })
                            )}
                        </div>

                        <div className={styles.addSubPointBtnContainer}>
                            <button className={styles.addSubPointBtn} type='button' onClick={handleAddSubPoint}>
                                <span className={`${styles.addSubPointBtnIcon} material-symbols-outlined`}>add</span>
                                <span>Add Sub-Point</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}