import { useState } from 'react';

import styles from './Experience.module.css';

export default function Responsibility({data, index}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleVisibility = (e) => {
        e.stopPropagation();

        if (!itemID) throw new Error('itemID is undefined!');

       setCVData(draft => {
            const item = draft.workExperience.find(item => item.id === itemID);
            
            if (!item) throw new Error('Item not found!');
            
            item.isVisible = !item.isVisible;
       })

       setIsVisible(!isVisible);
    }

    return (
        <div className={styles.responsibilitiesContainer}>
            <div className={styles.responsibilitiesFormGroup}>
                <h3 className={styles.responsibilityHeadline}>Point #{index + 1}</h3>

                <div className={styles.positionContainer}>
                            <div className={styles.positionHeadlineContainer} onClick={() => {setIsExpanded(!isExpanded)}}>
                                <span className={`${styles.expandArrowIcon} material-icons`}>
                                    {isExpanded ? 'arrow_drop_down' : 'arrow_right'}
                                </span>
                
                                <span className={styles.positionHeadline}>{data ? data.title : 'Position #' + index}</span>
                
                                <div className={styles.positionBtnContainer}>
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
                                <div className={styles.positionFormContainer}>
                                    <div className={styles.positionFormGroup}>
                                        <label htmlFor="title">Position Title</label>
                                        <input type="text" name="title" id="title" value={data?.title || ''} onChange={handlePositionTitle} placeholder="Enter Position Title" />
                                    </div>
                                    <div className={styles.positionFormGroupDate}>
                                        <div className={styles.startDate}>
                                            <label htmlFor="startDate">Start Date</label>
                                            <input type="text" name="startDate" id="startDate" value={data?.startDate || ''} placeholder="Enter Start Date" />
                                        </div>
                                        <div className={styles.endDate}>
                                            <label htmlFor="endDate">End Date</label>
                                            <input type="text" name="endDate" id="endDate" value={data?.endDate || ''} placeholder="Enter End Date" />
                                        </div>
                                        <div className={styles.currentlyEmployed}>
                                            <input className={styles.checkbox} type="checkbox" name="currentlyEmployed" id="currentlyEmployed" />
                                            <label className={styles.label} htmlFor="currentlyEmployed">Currently working here</label>
                                        </div>
                                    </div>
                
                                    <div className="responsibilitiesContainer">
                                        <h3 className={styles.responsibilitiesHeadline}>Responsibilities</h3>
                                        
                                        {data.responsibilities?.map((responsibility, index) => (
                                            <Responsibility key={index} index={index} data={responsibility} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

            </div>
        </div>
    )
}