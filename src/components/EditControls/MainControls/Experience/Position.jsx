import { useState } from 'react';

import Point from './Point.jsx';

import styles from './Experience.module.css';

export default function Position({data, setCVData, index, companyID}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentlyEmployed, setCurrentlyEmployed] = useState(false);

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
            
            position.isVisible = !position.isVisible;
       })
    }

    const handlePositionTitle = (e) => {
        if (!data) throw new Error('data not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === data.id);
            if (position === undefined) throw new Error('Position index not found!');

            position.title = e.target.value;
        });
    }

    const handleStartDate = (e) => {
        if (!data) throw new Error('data not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === data.id);
            if (position === undefined) throw new Error('Position index not found!');

            position.startDate = e.target.value;
        });
    }

    const handleEndDate = (e) => {
        if (!data) throw new Error('data not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === data.id);
            if (position === undefined) throw new Error('Position index not found!');

            position.endDate = e.target.value;
        });
    }

        const handleCurrentlyEmployed = (e) => {
        if (!data) throw new Error('data not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === data.id);
            if (position === undefined) throw new Error('Position index not found!');

            position.currentlyEmployed = !currentlyEmployed;
        });

        setCurrentlyEmployed(prevState => !prevState);
    }

    return (
        <div className={styles.positionContainer}>
            <div className={styles.positionHeadlineContainer} onClick={() => setIsExpanded(!isExpanded)}>
                <span className={`${styles.expandArrowIcon} material-icons`}>
                    {isExpanded ? 'arrow_drop_down' : 'arrow_right'}
                </span>

                <span className={styles.positionHeadline}>{data ? data.title : 'Position #' + (index +1)}</span>

                <div className={styles.positionBtnContainer}>
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

            {isExpanded && (
                <div className={styles.positionFormContainer}>
                    <div className={styles.positionFormGroup}>
                        <label htmlFor="title">Position Title</label>
                        <input type="text" name="title" id="title" value={data?.title || ''} onChange={handlePositionTitle} placeholder="Enter Position Title" />
                    </div>
                    <div className={styles.positionFormGroupDate}>
                        <div className={styles.startDate}>
                            <label htmlFor="startDate">Start Date</label>
                            <input type="text" name="startDate" id="startDate" value={data?.startDate || ''} onChange={handleStartDate} placeholder="Enter Start Date" />
                        </div>
                        <div className={styles.endDate}>
                            <label htmlFor="endDate">End Date</label>
                            <input type="text" name="endDate" id="endDate" disabled={currentlyEmployed ? true : false} value={currentlyEmployed ? 'Present' : data?.endDate || ''} onChange={handleEndDate} placeholder="Enter End Date" />
                        </div>
                        <div className={styles.currentlyEmployed}>
                            <input className={styles.checkbox} type="checkbox" name="currentlyEmployed" id="currentlyEmployed" onChange={handleCurrentlyEmployed}/>
                            <label className={styles.label} htmlFor="currentlyEmployed">Currently working here</label>
                        </div>
                    </div>

                    <div className={styles.responsibilitiesContainer}>
                        <h3 className={styles.responsibilitiesHeadline}>Responsibilities</h3>
                        
                        {data.responsibilities.length > 0 && data.responsibilities.map((point, index) => (
                            <Point 
                                key={point.id} 
                                index={index} 
                                data={point}
                                setCVData={setCVData}
                                // TO-DO: Reformat later with Context
                                companyID={companyID}
                                positionID={data.id}
                            />
                        ))}
                    </div>

                    <div className={styles.addPointBtnContainer}>
                        <button className={styles.addPointBtn}>
                            <span className={`${styles.addPointBtnIcon} material-symbols-outlined`}>add</span>
                            <span>Add Point</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}