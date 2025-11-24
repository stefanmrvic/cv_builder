import { useState } from 'react';

import styles from './Experience.module.css';

export default function Position({data, setCVData, setIsPositionFormOpen, setPositionFormData, companyID}) {
    const handleDelete = (e) => {
        e.stopPropagation();
        
        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === data.id);
            if (position === undefined) throw new Error('Position not found!');

            const positionIndex = company.positions.findIndex(position => position.id === data.id);
            if (positionIndex === -1) throw new Error('Position not found!');

            company.positions.splice(positionIndex, 1);
        })
    }

    const handleVisibility = (e) => {
        e.stopPropagation();
  
        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === data.id);
            if (position === undefined) throw new Error('Position not found!');
            
            position.isVisible = !position.isVisible;
       })
    }

    const handleEdit = (e) => {
        e.stopPropagation();

        if (!data.id) throw new Error('PositionID not found!');

        setPositionFormData({
            id: data.id,
            companyID: companyID,
            isVisible: data.isVisible,
            title: data.title,
            startDate: data.startDatet,
            endDate: data.endDate,
            currentlyEmployed: data.currentlyEmployed,
            responsibilities: data.responsibilities
        })

        setIsPositionFormOpen(true);
    }

    return (
        <div className={styles.positionHeaderContainer} onClick={handleEdit} role='button'>
            <span className={styles.positionHeadline}>{data.title}</span>

            <div className={styles.positionHeaderBtnContainer}>
                <button className={styles.visibilityBtn} onClick={handleVisibility}>
                    <span className={`${styles.visibilityBtnIcon} material-symbols-outlined`}>
                        {data.isVisible ? 'visibility' : 'visibility_off'}
                    </span>
                </button>

                <button className={styles.deleteBtn} onClick={handleDelete}>
                    <span className={`${styles.deleteBtnIcon} material-icons`}>delete</span>
                </button>
            </div>
        </div>
    )
}