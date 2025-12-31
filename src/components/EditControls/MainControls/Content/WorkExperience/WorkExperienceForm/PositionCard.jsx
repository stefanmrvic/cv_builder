import { useState, useEffect } from 'react';
import { useAppContext } from '../../../../../../AppContext.jsx';
import { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem } from '../../../../../../utils/localStorage.js';

import PointCard from './PointCard.jsx';

import styles from './WorkExperienceForm.module.css';

export default function PositionCard({ position, index, isNewPosition, handleIsNewPosition, companyID }) {
    const { setCVData } = useAppContext();

    // Utilizing localStorage to perserve state across page reloads in case user accidentally reloads or closes the tab while filling in the fields.
    // It expands the PositionCard by default if the user created new Position.
    const persistentIsExpanded = getLocalStorageItem(`isExpanded - Position: ${position.id}`, isNewPosition)
    const [isExpanded, setIsExpanded] = useState(persistentIsExpanded);

    const persistentIsNewPoint = getLocalStorageItem('isNewPoint', false)
    const [isNewPoint, setIsNewPoint] = useState(persistentIsNewPoint);

    const handleIsExpanded = (newState) => {
        setIsExpanded(newState);
        setLocalStorageItem(`isExpanded - Position: ${position.id}`, newState)
    }

    const handleIsNewPoint = (newState) => {
        setIsNewPoint(newState);
        setLocalStorageItem('isNewPoint', newState)
    }

    const handleDelete = (e) => {
        e.stopPropagation(); 

        if (!position.id) throw new Error('position.id is undefined!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === companyID);
            if (company === -1) throw new Error('Company not found!');

            const positionIndex = company.positions.findIndex(item => item.id === position.id);
            if (positionIndex === -1) throw new Error('Position index not found!');

            company.positions.splice(positionIndex, 1);
        });

        // Removes the localStorage item of the position's isExpanded state in order to prevent clutter in localStorage object.
        removeLocalStorageItem(`isExpanded - Position: ${position.id}`);
    }

    const handleVisibility = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isExpanded && position.isVisible) handleIsExpanded(false);
        
        if (!position.id) throw new Error('position.id is undefined!');

       setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const positionItem = company.positions.find(item => item.id === position.id)
            if (!positionItem) throw new Error('Position not found!');
            
            positionItem.isVisible = !position.isVisible;
       })
    }

    const handlePositionTitle = (e) => {
        if (!position) throw new Error('Position not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const positionItem = company.positions.find(item => item.id === position.id);
            if (positionItem === undefined) throw new Error('Position not found!');

            positionItem.title = e.target.value;
        });
    }

    const formatStartDate = () => {
        if (!position.startDate) return '';

        const date = new Date(position.startDate).toDateString();
        const dateArr = date.split(' ');

        const year = dateArr[3];
        const month = dateArr[1];

        return `${month}. ${year}`;
    }

    const formatEndDate = () => {
        if (!position.endDate) return '';
        if (position.currentlyEmployed || position.endDate === 'Present') return 'Present';
        
        const date = new Date(position.endDate).toDateString();
        const dateArr = date.split(' ');

        const year = dateArr[3];
        const month = dateArr[1];

        return `${month}. ${year}`;
    }

    const handleStartDate = (e) => {
        if (!position) throw new Error('Position not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const positionItem = company.positions.find(item => item.id === position.id);
            if (positionItem === undefined) throw new Error('Position not found!');

            positionItem.startDate = e.target.value;
        });
    }

    const handleEndDate = (e) => {
        if (!position) throw new Error('Position not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const positionItem = company.positions.find(item => item.id === position.id);
            if (positionItem === undefined) throw new Error('Position not found!');

            positionItem.endDate = e.target.value;
        });
    }

    const handleCurrentlyEmployed = (e) => {
        if (!position) throw new Error('Position not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const positionItem = company.positions.find(item => item.id === position.id);
            if (positionItem === undefined) throw new Error('Position not found!');

            positionItem.currentlyEmployed = !positionItem.currentlyEmployed;
        });
    }

    const handleCollapsing = () => {
        handleIsExpanded(!isExpanded);

        if (isNewPosition) {
            handleIsNewPosition(false);
            setLocalStorageItem('isNewPosition', false);
        }
    }

    const handleAddPoint = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!position) throw new Error('Position not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const positionItem = company.positions.find(item => item.id === position.id)
            if (positionItem === undefined) throw new Error('Position not found!');

            const newPoint = {
                id: crypto.randomUUID(),
                isVisible: true,
                point: `Point #${position.responsibilities.length +1}`,
                subPoints: []
            }

            positionItem.responsibilities.push(newPoint);
        });

        handleIsNewPoint(true);
    }

    const isPlaceholderTitle = position.title.toLowerCase().includes('position');
    const startDateValue = formatStartDate();
    const endDateValue = formatEndDate();

    return (
        <div className={styles.positionContainer}>
            <div className={styles.positionCardContainer} onClick={handleCollapsing}>
                <span className={`${styles.expandArrowIcon} material-icons`}>
                    {isExpanded ? 'arrow_drop_down' : 'arrow_right'}
                </span>

                <span className={styles.positionHeadline}>{position ? position.title : 'Position #' + (index +1)}</span>

                <div className={styles.positionBtnContainer}>
                    <button className={styles.positionVisibilityBtn} onClick={handleVisibility}>
                        <span className={`${styles.positionVisibilityBtnIcon} material-symbols-outlined`}>
                            {position.isVisible ? 'visibility' : 'visibility_off'}
                        </span>
                    </button>

                    <button className={styles.positionDeleteBtn} onClick={handleDelete}>
                        <span className={`${styles.positionDeleteBtnIcon} material-icons`}>delete</span>
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className={styles.positionFormContainer}>
                    <div className={styles.positionFormGroup}>
                        <label htmlFor="title">Position Title</label>
                        <input autoFocus={isNewPosition} type="text" name="title" id="title" value={(isNewPosition && isPlaceholderTitle) ? '' : (position?.title || '')} onChange={handlePositionTitle} placeholder="Enter Position Title" required />
                    </div>
                    <div className={styles.positionFormGroupDate}>
                        <div className={styles.startDate}>
                            <label htmlFor="startDate">Start Date</label>
                            <span className={styles.startDateValue}>{startDateValue}</span>
                            <input type="date" name="startDate" id="startDate" onChange={handleStartDate} placeholder="Enter Start Date" required />
                        </div>
                        <div className={styles.endDate}>
                            <label htmlFor="endDate">End Date</label>
                            <span className={styles.endDateValue}>{endDateValue}</span>
                            <input type="date" name="endDate" id="endDate" disabled={position?.currentlyEmployed} onChange={handleEndDate} placeholder="Enter End Date" required />
                        </div>
                        <div className={styles.currentlyEmployed}>
                            <input className={styles.checkbox} type="checkbox" name="currentlyEmployed" id="currentlyEmployed" checked={position?.currentlyEmployed} onChange={handleCurrentlyEmployed}/>
                            <label className={styles.label} htmlFor="currentlyEmployed">Currently working here</label>
                        </div>
                    </div>

                    <div className={styles.responsibilitiesContainer}>
                        {position.responsibilities.length > 0 && (
                            position.responsibilities.map((point, index) => {
                                debugger;
                                const isNew = isNewPoint && index === position.responsibilities.length - 1;

                                return <PointCard 
                                    key={point.id} 
                                    index={index} 
                                    point={point}
                                    // To-DO Refactor Company/Position ID passing logic
                                    companyID={companyID}
                                    positionID={position.id}
                                    isNewPoint={isNew}
                                    handleIsNewPoint={handleIsNewPoint}
                                />
                            })
                        )}
                    </div>

                    <div className={styles.addPointBtnContainer}>
                        <button className={styles.addPointBtn} onClick={handleAddPoint}>
                            <span className={`${styles.addPointBtnIcon} material-symbols-outlined`}>add</span>
                            <span>Add Point</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}