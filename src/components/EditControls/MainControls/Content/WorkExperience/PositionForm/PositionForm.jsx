import { useState } from 'react';
import { useAppContext, useWorkExperience } from '../../../../../../AppContext.jsx';
import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } from '../../../../../../utils/localStorage.js';

import PointCard from '../WorkExperienceForm/PointCard.jsx';

import styles from './PositionForm.module.css';

export default function PositionForm({ isNewPosition, handleIsNewPosition, positionFormData, handleIsPositionFormOpen }) {   
    const { setCVData } = useAppContext();
    const workExperience = useWorkExperience();

    const persistentIsNewPoint = getLocalStorageItem('isNewPoint', false);
    const [isNewPoint, setIsNewPoint] = useState(persistentIsNewPoint);

    const company = workExperience.find(item => item.id === positionFormData.companyID);
    const position = company.positions.find(item => item.id === positionFormData.id);

    const handleIsNewPoint = (newState) => {
        setIsNewPoint(newState);
        setLocalStorageItem('isNewPoint', newState);
    }

    const handleDelete = () => {
        if (!positionFormData.companyID) throw new Error('positionFormData.companyID is undefined!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === positionFormData.companyID);
            if (company === undefined) throw new Error('Company not found!');

            const positionIndex = company.positions.findIndex(item => item.id === positionFormData.id);
            if (positionIndex === -1) throw new Error('Position not found!');

            company.positions.splice(positionIndex, 1);
        });

        handleIsPositionFormOpen(false);

        // Removes the stored isExpanded state of Position inside of localStorage, in order to prevent clutter.
        removeLocalStorageItem(`isExpanded - Position: ${positionFormData.id}`);
    }

    const revertChanges = () => {
        if (!positionFormData.companyID) throw new Error('positionFormData.companyID is undefined!');
        
        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === positionFormData.companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(item => item.id === positionFormData.id);
            if (position === undefined) throw new Error('Position not found!');

            position.id = positionFormData.id;
            position.isVisible = positionFormData.isVisible;
            position.title = positionFormData.title;
            position.startDate = positionFormData.startDate;
            position.endDate = positionFormData.endDate;
            position.currentlyEmployed = positionFormData.currentlyEmployed;
            position.responsibilities = positionFormData.responsibilities;   
        });

        handleIsNewPosition(false);
        handleIsPositionFormOpen(false);

        // Collapses all expanded Points & SubPoints cards when the user clicks on X or Cancel button.
        position.responsibilities.map(responsibility => {
            setLocalStorageItem(`isExpanded - Point: ${responsibility.id}`, false);

            responsibility.subPoints.map(subResponsibility => {
                setLocalStorageItem(`isExpanded - SubPoint: ${subResponsibility.id}`, false);
            })
        })
    }

    const handlePositionTitle = (e) => {
        if (!workExperience) throw new Error('WorkExperience not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === positionFormData.companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(item => item.id === positionFormData.id);
            if (position === undefined) throw new Error('Position not found!');

            position.title = e.target.value;
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
            const company = draft.workExperience.find(item => item.id === positionFormData.companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(item => item.id === positionFormData.id);
            if (position === undefined) throw new Error('Position not found!');

            position.startDate = e.target.value;
        });
    }

    const handleEndDate = (e) => {
        if (!position) throw new Error('Position not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === positionFormData.companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(item => item.id === positionFormData.id);
            if (position === undefined) throw new Error('Position not found!');

            position.endDate = e.target.value;
        });
    }

    const handleCurrentlyEmployed = (e) => {
        if (!position) throw new Error('Position not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === positionFormData.companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(item => item.id === positionFormData.id);
            if (position === undefined) throw new Error('Position not found!');

            position.currentlyEmployed = !position.currentlyEmployed;
        });
    }

    const handleAddPoint = (e) => {
        // Stop default form submit behavior
        e.preventDefault();

        if (!position) throw new Error('Position not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === positionFormData.companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(item => item.id === positionFormData.id);
            if (position === undefined) throw new Error('Position not found!');

            const newPoint = {
                id: crypto.randomUUID(),
                isVisible: true,
                point: `Point #${positionFormData.responsibilities.length +1}`,
                subPoints: []
            }

            position.responsibilities.push(newPoint);
        });

        handleIsNewPoint(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        handleIsNewPosition(false);
        handleIsPositionFormOpen(false);
    }

    const startDateValue = formatStartDate();
    const endDateValue = formatEndDate();

    return (
        <div id='position-form' className={styles.formContainer}>
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
                        <input autoFocus type="text" name="title" id="title" onChange={handlePositionTitle} value={position.title} placeholder="Enter Position Title" required />
                    </div>
                    <div className={styles.formGroupDate}>
                        <div className={styles.startDate}>
                            <label htmlFor="startDate">Start Date</label>
                            <span className={styles.startDateValue}>{startDateValue}</span>
                            <input type="date" name="startDate" id="startDate" onChange={handleStartDate} value={position.startDate} placeholder="Enter Start Date" required />
                        </div>
                        <div className={styles.endDate}>
                            <label htmlFor="endDate">End Date</label>
                            <span className={styles.endDateValue}>{endDateValue}</span> 
                            <input type="date" name="endDate" id="endDate" disabled={position.currentlyEmployed ? true : false} onChange={handleEndDate} placeholder="Enter End Date" required />
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
                                    point={point}
                                    // TO-DO Refactor Company/Posiiton ID passing logic
                                    companyID={positionFormData.companyID}
                                    positionID={positionFormData.id}
                                    isNewPoint={isNew}
                                    handleIsNewPoint={handleIsNewPoint}
                                />
                            })
                        )}
                    </div>

                    <div className={styles.addPointBtnContainer}>
                        <button className={styles.addPointBtn} type='button' onClick={handleAddPoint}>
                            <span className={`${styles.addPointBtnIcon} material-symbols-outlined`}>add</span>
                            <span>Add Point</span>
                        </button>
                    </div>
                </div>
            </form>

            <div className={styles.formBtnContainer}>
                <button className={styles.formBtnDelete} type='button' onClick={handleDelete}>
                    <span className={`${styles.formBtnDeleteIcon} material-icons`}>delete</span>
                    <span className={styles.formBtnDeleteText}>Delete</span>
                </button>
                <button className={styles.formBtnCancel} type='button' onClick={revertChanges}>Cancel</button>
                <button className={styles.formBtnSave} onClick={handleSubmit}>Save</button>
            </div>
        </div>
    )
}