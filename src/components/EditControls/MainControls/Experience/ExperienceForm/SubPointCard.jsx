import { useState, useEffect } from 'react';

import styles from './ExperienceForm.module.css';

export default function SubPointCard({data, setCVData, index, companyID, positionID, pointID, isNewSubPoint, setIsNewSubPoint}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Using useEffect Hook here to automatically expand the SubPoint card if the user created new SubPoint.
    useEffect(() => {
        if (isNewSubPoint) setIsExpanded(true);
    }, [])

    const handleDelete = (e) => {
        e.stopPropagation(); 

        if (!data.id) throw new Error('subPoint.id is undefined!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === positionID);
            if (position === undefined) throw new Error('Position  not found!');    
            
            const point = position.responsibilities.find(point => point.id === pointID);
            if (point === undefined) throw new Error('Point not found!');

            const subPointIndex = point.subPoints.findIndex(subPoint => subPoint.id === data.id);
            if (subPointIndex === -1) throw new Error('Sub-Point not found!');

            point.subPoints.splice(subPointIndex, 1);
        });
    }

    const handleVisibility = (e) => {
        e.stopPropagation();
        
        if (isExpanded) setIsExpanded(prevState => !prevState);

        if (!data.id) throw new Error('subPoint.id is undefined!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === positionID);
            if (position === undefined) throw new Error('Position  not found!');     

            const point = position.responsibilities.find(point => point.id === pointID);
            if (point === undefined) throw new Error('Point not found!');

            const subPoint = point.subPoints.find(subPoint => subPoint.id === data.id);
            if (subPoint === undefined) throw new Error('Sub-Point not found!');

            subPoint.isVisible = !subPoint.isVisible;
        });
        
        setIsVisible(prevState => !prevState);
    }

    const handleDescription = (e) => {
        if (!data.id) throw new Error('subPoint.id is undefined!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === positionID);
            if (position === undefined) throw new Error('Position  not found!');     

            const point = position.responsibilities.find(point => point.id === pointID);
            if (point === undefined) throw new Error('Point not found!');

            const subPoint = point.subPoints.find(subPoint => subPoint.id === data.id);
            if (subPoint === undefined) throw new Error('Sub-Point not found!');

            subPoint.subPoint = e.target.value;
        });
    }

    const handleCollapsing = () => {
        setIsExpanded(prevState => !prevState);

        if (isNewSubPoint) setIsNewSubPoint(false);
    }

    const isPlaceholderTitle = data.subPoint.toLowerCase().includes('subpoint');

    return (
        <div className={styles.subPointContainer}>
            <span className={styles.subPointHeadline}>{`Sub-Point #${index +1}`}</span>

            <div className={styles.subPointCardContainer}>
                <div className={styles.subPointHeaderContainer} onClick={handleCollapsing}>
                    <span className={`${styles.expandArrowIcon} material-icons`}>
                        {isExpanded ? 'arrow_drop_down' : 'arrow_right'}
                    </span>

                    <span className={styles.subPointDescription}>{data.subPoint}</span>


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
                            <textarea type="text" name="sub-point" id="sub-point" autoFocus={isNewSubPoint} value={(isNewSubPoint && isPlaceholderTitle) ? '' : (data?.subPoint || '')} onChange={handleDescription} placeholder="Enter sub-point description..." />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}