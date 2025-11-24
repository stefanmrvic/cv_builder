import { useState, useEffect } from 'react';

import SubPointCard from './SubPointCard.jsx';

import styles from './ExperienceForm.module.css';

export default function PointCard({data, setCVData, index, companyID, positionID, isNewPoint, setIsNewPoint}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isNewSubPoint, setIsNewSubPoint] = useState(false);

    // Using useEffect Hook here to automatically expand the Point card if the user created new Point.
    useEffect(() => {
        if (isNewPoint) setIsExpanded(true);
    }, [])

    const handleDelete = (e) => {
        e.stopPropagation(); 

        if (!data.id) throw new Error('experienceFormData.id is undefined!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === positionID);
            if (position === undefined) throw new Error('Position  not found!');     

            const pointIndex = position.responsibilities.findIndex(point => point.id === data.id);
            if (pointIndex === -1) throw new Error('Point index not found!');

            position.responsibilities.splice(pointIndex, 1);
        });
    }

    const handleVisibility = (e) => {
        // Stops bubbling to parent <div> with onClick handler
        e.stopPropagation()
        
        // Stop default form submit behavior
        e.preventDefault();
        
        if (isExpanded && data.isVisible) setIsExpanded(prevState => !prevState);

        if (!data.id) throw new Error('experienceFormData.id is undefined!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === positionID);
            if (position === undefined) throw new Error('Position  not found!');     

            const point = position.responsibilities.find(point => point.id === data.id);
            if (point === undefined) throw new Error('Point not found!');

            point.isVisible = !point.isVisible;
        });
    }

    const handleDescription = (e) => {
        if (!data.id) throw new Error('experienceFormData.id is undefined!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === positionID);
            if (position === undefined) throw new Error('Position  not found!');     

            const point = position.responsibilities.find(point => point.id === data.id);
            if (point === undefined) throw new Error('Point not found!');

            point.point = e.target.value;
        });
    }

    const handleCollapsing = () => {
        setIsExpanded(prevState => !prevState);

        if (isNewPoint) setIsNewPoint(false);
    }

    const handleAddSubPoint = (e) => {
        if (!data) throw new Error('data not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === positionID)
            if (position === undefined) throw new Error('Position not found!');

            const point = position.responsibilities.find(point => point.id === data.id);
            if (point === undefined) throw new Error('Point not found!');

            const newSubPoint = {
                id: crypto.randomUUID(),
                isVisible: true,
                subPoint: `SubPoint #${data.subPoints.length +1}`,
            }

            point.subPoints.push(newSubPoint)
        });

        setIsNewSubPoint(true);
    }

    const isPlaceholderTitle = data.point.toLowerCase().includes('point');

    return (
        <div className={styles.pointContainer}>
            <span className={styles.pointHeadline}>{`Point #${index +1}`}</span>

            <div className={styles.pointCardContainer}>
                <div className={styles.pointHeaderContainer} onClick={handleCollapsing}>
                    <span className={`${styles.expandArrowIcon} material-icons`}>
                        {isExpanded ? 'arrow_drop_down' : 'arrow_right'}
                    </span>

                    <span className={styles.pointDescription}>{data.point}</span>

                    <div className={styles.pointBtnContainer}>
                        <button className={styles.pointVisibilityBtn} onClick={handleVisibility}>
                            <span className={`${styles.pointVisibilityBtnIcon} material-symbols-outlined`}>
                                {data.isVisible ? 'visibility' : 'visibility_off'}
                            </span>
                        </button>

                        <button className={styles.pointDeleteBtn} onClick={handleDelete}>
                            <span className={`${styles.pointDeleteBtnIcon} material-icons`}>delete</span>
                        </button>
                    </div>
                </div>

                {isExpanded && (
                    <div className={styles.pointFormContainer}>
                        <div className={styles.pointFormGroup}>
                            <label htmlFor="point">Description</label>
                            <textarea name="point" id="point" autoFocus={isNewPoint} value={(isNewPoint && isPlaceholderTitle) ? '' : (data?.point || '')} onChange={handleDescription} placeholder="Enter responsibility description..." />
                        </div>

                        <div className={styles.subResponsibilitiesContainer}>
                            {data.subPoints.length > 0 && (
                                data.subPoints.map((subPoint, index) => {
                                    const isNew = isNewSubPoint && index == data.subPoints.length - 1;

                                    return <SubPointCard 
                                        key={subPoint.id} 
                                        index={index} 
                                        data={subPoint}
                                        setCVData={setCVData}
                                        // TO-DO: Refactor later with Context API
                                        companyID={companyID}
                                        positionID={positionID}
                                        pointID={data.id} 
                                        isNewSubPoint={isNew}
                                        setIsNewSubPoint={setIsNewSubPoint}
                                    />
                                })
                            )}
                        </div>

                        <div className={styles.addSubPointBtnContainer}>
                            <button className={styles.addSubPointBtn} onClick={handleAddSubPoint}>
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