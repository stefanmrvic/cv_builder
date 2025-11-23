import { useState } from 'react';

import PointCard from '../ExperienceForm/PointCard.jsx';

import styles from './PositionForm.module.css';

export default function PositionForm({data, setCVData, isPositionFormOpen, setIsPositionFormOpen, companyID}) {    
    const [isNewPoint, setIsNewPoint] = useState(false);
    const [currentFormDetails, setCurrentFormDetails] = useState({
        id: '',
        isVisible: '',
        title: '',
        startDate: '',
        endDate: '',
        currentlyEmployed: '',
        responsibilities: []
    })

    const handleDelete = () => {
        if (!experienceFormData.id) throw new Error('experienceFormData.id is undefined!');

        setCVData(draft => {
            const companyIndex = draft.workExperience.findIndex(company => company.id === experienceFormData.id);
            if (companyIndex === undefined) throw new Error('Company not found!');

            draft.workExperience.splice(companyIndex, 1);
        });

        setIsExperienceFormOpen(false);
    }

    const revertChanges = () => {
        if (!experienceFormData.id) throw new Error('experienceFormData.id is undefined!');
        
        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === experienceFormData.id);

            if (!company) throw new Error('Company not found!');

            if (isNewExperience) {
                const companyIndex = draft.workExperience.findIndex(company => company.id === experienceFormData.id);
                draft.workExperience.splice(companyIndex, 1);
            } else {
                company.id = experienceFormData.id;
                company.isVisible = experienceFormData.isVisible;
                company.companyName = experienceFormData.companyName;
                company.location = experienceFormData.location;
                company.positions = experienceFormData.positions;
            }
        });

        setCurrentFormDetails({
            id: '',
            isVisible: '',
            title: '',
            startDate: '',
            endDate: '',
            currentlyEmployed: '',
            responsibilities: []
        })

        setIsNewExperience(false);  
        setIsExperienceFormOpen(false);
    }

    const handlePositionTitle = (e) => {
        if (!data) throw new Error('Data not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === data.id);
            if (position === undefined) throw new Error('Position not found!');

            position.title = e.target.value;
        });
    }

    const handleStartDate = (e) => {
        if (!data) throw new Error('Data not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === data.id);
            if (position === undefined) throw new Error('Position not found!');

            position.startDate = e.target.value;
        });
    }

    const handleEndDate = (e) => {
        if (!data) throw new Error('Data not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === data.id);
            if (position === undefined) throw new Error('Position not found!');

            position.endDate = e.target.value;
        });
    }

    const handleCurrentlyEmployed = (e) => {
        if (!data) throw new Error('Data not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === data.id);
            if (position === undefined) throw new Error('Position not found!');

            position.currentlyEmployed = !currentlyEmployed;
        });

        setCurrentlyEmployed(prevState => !prevState);
    }

    const handleAddPoint = (e) => {
        if (!data) throw new Error('Data not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (company === undefined) throw new Error('Company not found!');

            const position = company.positions.find(position => position.id === data.id)
            if (position === undefined) throw new Error('Position not found!');

            const newPoint = {
                id: crypto.randomUUID(),
                isVisible: true,
                point: `Point #${data.responsibilities.length +1}`,
                subPoints: []
            }

            position.responsibilities.push(newPoint);
        });

        setIsNewPoint(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setCurrentFormDetails({
            ...currentFormDetails, 
            id: crypto.randomUUID()
        });

        if (!currentFormDetails.id) throw new Error('currentFormDetails.id is undefined!');

        setCVData(draft => {
            draft.workExperience.push(currentFormDetails);
        });
    }

    //const company = data.find(company => company.id === experienceFormData.id);

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} action="#" onSubmit={handleSubmit}>

                <div className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Position Title</label>
                        <input autoFocus type="text" name="title" id="title" value={data?.title || ''} onChange={handlePositionTitle} placeholder="Enter Position Title" />
                    </div>
                    <div className={styles.formGroupDate}>
                        <div className={styles.startDate}>
                            <label htmlFor="startDate">Start Date</label>
                            <input type="text" name="startDate" id="startDate" value={data?.startDate || ''} onChange={handleStartDate} placeholder="Enter Start Date" />
                        </div>
                        <div className={styles.endDate}>
                            <label htmlFor="endDate">End Date</label>
                            <input type="text" name="endDate" id="endDate" disabled={data.currentlyEmployed ? true : false} value={data.currentlyEmployed ? 'Present' : data?.endDate || ''} onChange={handleEndDate} placeholder="Enter End Date" />
                        </div>
                        <div className={styles.currentlyEmployed}>
                            <input className={styles.checkbox} type="checkbox" name="currentlyEmployed" id="currentlyEmployed" onChange={handleCurrentlyEmployed}/>
                            <label className={styles.label} htmlFor="currentlyEmployed">Currently working here</label>
                        </div>
                    </div>

                    <div className={styles.responsibilitiesContainer}>
                        {data.responsibilities.length > 0 && (
                            data.responsibilities.map((point, index) => {
                                const isNew = isNewPoint && index === data.responsibilities.length - 1;

                                return <PointCard 
                                    key={point.id} 
                                    index={index} 
                                    data={point}
                                    setCVData={setCVData}
                                    // TO-DO: Reformat later with Context
                                    companyID={companyID}
                                    positionID={data.id}
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
                    <span>Delete</span>
                </button>
                <button className={styles.formBtnCancel} onClick={revertChanges}>Cancel</button>
                <button className={styles.formBtnSave} onClick={() => setIsExperienceFormOpen(false)}>Save</button>
            </div>
        </div>
    )
}