import { useState } from 'react';

import PointCard from '../WorkExperienceForm/PointCard.jsx';

import styles from './PositionForm.module.css';

export default function PositionForm({data, setCVData, isNewPosition, setIsNewPosition, positionFormData, setIsPositionFormOpen}) {    
    const [isNewPoint, setIsNewPoint] = useState(false);

    const handleDelete = () => {
        if (!positionFormData.companyID) throw new Error('positionFormData.companyID is undefined!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === positionFormData.companyID);
            if (company === undefined) throw new Error('Company not found!');

            const positionIndex = company.positions.findIndex(position => position.id === positionFormData.id);
            if (positionIndex === -1) throw new Error('Position not found!');

            company.positions.splice(positionIndex, 1);
        });

        setIsPositionFormOpen(false);
    }

    const revertChanges = () => {
        if (!positionFormData.companyID) throw new Error('positionFormData.companyID is undefined!');
        
        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === positionFormData.companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === positionFormData.id);
            if (position === undefined) throw new Error('Position not found!');

            position.id = positionFormData.id;
            position.isVisible = positionFormData.isVisible;
            position.title = positionFormData.title;
            position.startDate = positionFormData.startDate;
            position.endDate = positionFormData.endDate;
            position.currentlyEmployed = positionFormData.currentlyEmployed;
            position.responsibilities = positionFormData.responsibilities;   
        });

        setIsNewPosition(false);
        setIsPositionFormOpen(false);
    }

    const handlePositionTitle = (e) => {
        if (!data) throw new Error('Data not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === positionFormData.companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === positionFormData.id);
            if (position === undefined) throw new Error('Position not found!');

            position.title = e.target.value;
        });
    }

    const handleStartDate = (e) => {
        if (!data) throw new Error('Data not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === positionFormData.companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === positionFormData.id);
            if (position === undefined) throw new Error('Position not found!');

            position.startDate = e.target.value;
        });
    }

    const handleEndDate = (e) => {
        if (!data) throw new Error('Data not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === positionFormData.companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === positionFormData.id);
            if (position === undefined) throw new Error('Position not found!');

            position.endDate = e.target.value;
        });
    }

    const handleCurrentlyEmployed = (e) => {
        if (!data) throw new Error('Data not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === positionFormData.companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === positionFormData.id);
            if (position === undefined) throw new Error('Position not found!');

            position.currentlyEmployed = !position.currentlyEmployed;
        });
    }

    const handleAddPoint = (e) => {
        // Stop default form submit behavior
        e.preventDefault();

        if (!data) throw new Error('Data not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === positionFormData.companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === positionFormData.id);
            if (position === undefined) throw new Error('Position not found!');

            const newPoint = {
                id: crypto.randomUUID(),
                isVisible: true,
                point: `Point #${positionFormData.responsibilities.length +1}`,
                subPoints: []
            }

            position.responsibilities.push(newPoint);
        });

        setIsNewPoint(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsNewPosition(false);
        setIsPositionFormOpen(false);
    }

    const company = data.find(company => company.id === positionFormData.companyID);
    const position = company.positions.find(position => position.id === positionFormData.id)

    return (
        <div className={styles.formContainer}>
            <div className={`${styles.formHeaderContainer} ${styles.formOpened}`}>
                <span className={`${styles.formHeaderIcon} material-symbols-outlined`}>business_center</span>
                <span className={styles.formHeadline}>
                    {isNewPosition ? 'Add New Position' : 'Edit Position'}
                </span>
                <button className={`${styles.closeBtn} material-symbols-outlined`} onClick={revertChanges}>close_small</button>
            </div>

            <form className={styles.form} action="#" onSubmit={handleSubmit}>
                <div className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Position Title</label>
                        <input autoFocus type="text" name="title" id="title" value={position?.title || ''} onChange={handlePositionTitle} placeholder="Enter Position Title" />
                    </div>
                    <div className={styles.formGroupDate}>
                        <div className={styles.startDate}>
                            <label htmlFor="startDate">Start Date</label>
                            <input type="text" name="startDate" id="startDate" value={position?.startDate || ''} onChange={handleStartDate} placeholder="Enter Start Date" />
                        </div>
                        <div className={styles.endDate}>
                            <label htmlFor="endDate">End Date</label>
                            <input type="text" name="endDate" id="endDate" disabled={position.currentlyEmployed ? true : false} value={position.currentlyEmployed ? 'Present' : position?.endDate || ''} onChange={handleEndDate} placeholder="Enter End Date" />
                        </div>
                        <div className={styles.currentlyEmployed}>
                            <input className={styles.checkbox} type="checkbox" name="currentlyEmployed" id="currentlyEmployed" checked={position?.currentlyEmployed} onChange={handleCurrentlyEmployed}/>
                            <label className={styles.label} htmlFor="currentlyEmployed">Currently working here</label>
                        </div>
                    </div>

                    <div className={styles.responsibilitiesContainer}>
                        {position.responsibilities.length > 0 && (
                            position.responsibilities.map((point, index) => {
                                const isNew = isNewPoint && index === position.responsibilities.length - 1;

                                return <PointCard 
                                    key={point.id} 
                                    index={index} 
                                    data={point}
                                    setCVData={setCVData}
                                    // TO-DO: Refactor later with Context API
                                    companyID={positionFormData.companyID}
                                    positionID={positionFormData.id}
                                    isNewPoint={isNew}
                                    setIsNewPoint={setIsNewPoint}
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
            </form>

            <div className={styles.formBtnContainer}>
                <button className={styles.formBtnDelete} onClick={handleDelete}>
                    <span className={`${styles.formBtnDeleteIcon} material-icons`}>delete</span>
                    <span className={styles.formBtnDeleteText}>Delete</span>
                </button>
                <button className={styles.formBtnCancel} onClick={revertChanges}>Cancel</button>
                <button className={styles.formBtnSave} onClick={handleSubmit}>Save</button>
            </div>
        </div>
    )
}