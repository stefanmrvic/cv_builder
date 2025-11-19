import { useState } from 'react';

import Position from './Position.jsx';

import styles from './Experience.module.css';

export default function ExperienceForm({data, setCVData, isNewExperience, setIsNewExperience, setIsExperienceFormOpen, experienceFormData}) {    
    const [isNewPosition, setIsNewPosition] = useState(false);

    const handleDelete = () => {
        if (!experienceFormData.id) throw new Error('experienceFormData.id is undefined!');

        setCVData(draft => {
            const itemIndex = draft.workExperience.findIndex(company => company.id === experienceFormData.id);
            
            if (itemIndex === undefined) throw new Error('Company not found!');

            draft.workExperience.splice(itemIndex, 1);
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

        setIsNewExperience(false);  
        setIsExperienceFormOpen(false);
    }

    const handleCompanyName = (e) => {
        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === experienceFormData.id);

            if (!company) throw new Error('Company not found!');

            company.companyName = e.target.value;
        });
    }

    const handleLocation = (e) => {
        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === experienceFormData.id);

            if (!company) throw new Error('Company not found!');

            company.location = e.target.value;
        });
    }

    const handleAddPosition = (e) => {

        if (!data) throw new Error('data not found!');

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === experienceFormData.id);
            if (company === undefined) throw new Error('Company not found!');

            const newPosition = {
                id: crypto.randomUUID(),
                isVisible: true,
                title: '',
                startDate: '',
                endDate: '',
                currentlyEmployed: '',
                responsibilities: []
            }

            company.positions.push(newPosition)
        });

        setIsNewPosition(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const company = data.find(company => company.id === experienceFormData.id);

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} action="#" onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="company">Company Name</label>
                    <input type="text" name="company" id="company" value={company.companyName} onChange={handleCompanyName} placeholder="Enter Company Name" />
                </div>              

                <div className={styles.formGroup}>
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" id="location" value={company.location} onChange={handleLocation} placeholder="Enter Location" />
                </div>

                {/* Render empty position field if no positions exist */}
                {!experienceFormData.positions && <Position isNewPosition={true}/>}

                {/* Render each position in the company */}
                {company.positions?.map((position, index) => (
                    <Position 
                        key={position.id} 
                        index={index} 
                        data={position} 
                        setCVData={setCVData} 
                        // TO-DO: Reformat later with Context
                        companyID={experienceFormData.id} 
                    />
                ))}

                <div className={styles.addPositionBtnContainer}>
                    <button className={styles.addPositionBtn} onClick={handleAddPosition}>
                        <span className={`${styles.addPositionBtnIcon} material-symbols-outlined`}>add</span>
                        <span>Add Position</span>
                    </button>
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