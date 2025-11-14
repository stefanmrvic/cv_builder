import { useState } from 'react';

import SubPoint from './SubPoint.jsx';

import styles from './Experience.module.css';

export default function Point({data, setCVData, index}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleDelete = (e) => {
        e.stopPropagation(); 

        if (!data.id) throw new Error('experienceFormData.id is undefined!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === -1) throw new Error('Company not found!');

            const positionIndex = company.positions.findIndex(position => position.id === data.id);
            if (positionIndex === -1) throw new Error('Position index not found!');

            company.positions.splice(positionIndex, 1);
        });
    }

    const handleVisibility = (e) => {
        e.stopPropagation();
        
        if (isExpanded) setIsExpanded(!isExpanded);
        
        if (!data.id) throw new Error('data.id is undefined!');

       setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            const position = company.positions.find(position => position.id === data.id)
            
            if (!position) throw new Error('position not found!');
            
            point.isVisible = !point.isVisible;
       })
    }

    const handleDescription = (e) => {

        // setCVData(draft => {

        // })
    }

    return (
        <div className={styles.pointContainer}>
            <div className={styles.pointHeadlineContainer} onClick={() => {setIsExpanded(!isExpanded)}}>
                <span className={`${styles.expandArrowIcon} material-icons`}>
                    {isExpanded ? 'arrow_drop_down' : 'arrow_right'}
                </span>

                <span className={styles.positionHeadline}>{'Point #' + (index +1)}</span>

                <div className={styles.pointBtnContainer}>
                    <button className={styles.deleteBtn} >
                        <span className={`${styles.deleteBtnIcon} material-icons`}>delete</span>
                    </button>

                    <button className={styles.visibilityBtn} >
                        <span className={`${styles.visibilityBtnIcon} material-symbols-outlined`}>
                            {isVisible ? 'visibility' : 'visibility_off'}
                        </span>
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className={styles.pointFormContainer}>
                    <div className={styles.pointFormGroup}>
                        <label htmlFor="point">Description</label>
                        <textarea name="point" id="point" value={data?.point || ''} onChange={handleDescription} placeholder="Enter responsibility description..." />
                    </div>

                    <div className="subResponsibilitiesContainer">
                        <h3 className={styles.subResponsibilitiesHeadline}>Sub-points</h3>
                        
                        {data.subPoints?.map((subPoint, index) => (
                            <SubPoint key={subPoint.id} index={index} data={subPoint} />
                        ))}
                    </div>

                    <div className={styles.addSubPointBtnContainer}>
                        <button className={styles.addSubPointBtn}>
                            <span className={`${styles.addSubPointBtnIcon} material-symbols-outlined`}>add</span>
                            <span>Add Sub-Point</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}