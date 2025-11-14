import { useState } from 'react';

import styles from './Experience.module.css';

export default function SubPoint({data, index}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleDelete = (e) => {
        e.stopPropagation();
    }

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

    const handleDescription = (e) => {

        // setCVData(draft => {

        // })
    }

    return (
        <div className={styles.responsibilitiesFormContainer}>
            <div className={styles.responsibilitiesFormGroup}>
                <div className={styles.positionContainer}>
                            <div className={styles.positionHeadlineContainer} onClick={() => {setIsExpanded(!isExpanded)}}>
                                <span className={`${styles.expandArrowIcon} material-icons`}>
                                    {isExpanded ? 'arrow_drop_down' : 'arrow_right'}
                                </span>
                
                                <span className={styles.positionHeadline}>{'Sub-Point #' + (index +1)}</span>
                
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
                                        <label htmlFor="sub-point">Description</label>
                                        <input type="text" name="sub-point" id="sub-point" value={data?.subPoint || ''} onChange={handleDescription} placeholder="Enter sub-point description..." />
                                    </div>
                                </div>
                            )}
                        </div>
            </div>
        </div>
    )
}