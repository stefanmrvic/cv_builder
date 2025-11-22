import { useState } from 'react';

import Position from './Position.jsx';

import styles from './Experience.module.css';

export default function ExperienceForm({data, setCVData, isNewExperience, setIsNewExperience, setIsExperienceFormOpen, experienceFormData}) {    
    const [isNewPosition, setIsNewPosition] = useState(false);
    const [currentFormDetails, setCurrentFormDetails] = useState({
        id: '',
        isVisible: '',
        companyName: '',
        location: '',
        positions: []
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
            companyName: '',
            location: '',
            positions: []
        })

        setIsNewExperience(false);  
        setIsExperienceFormOpen(false);
    }

    const handleCompanyName = (e) => {
        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === experienceFormData.id);
            if (!company) throw new Error('Company not found!');

            company.companyName = e.target.value;
        });

        setCurrentFormDetails({
            ...currentFormDetails, 
            companyName: e.target.value
        })
    }

    const handleLocation = (e) => {
        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === experienceFormData.id);
            if (!company) throw new Error('Company not found!');

            company.location = e.target.value;
        });

        setCurrentFormDetails({
            ...currentFormDetails, 
            location: e.target.value
        })
    }

    const handleAddPosition = (e) => {
        if (!data) throw new Error('data not found!');

        const newPosition = {
            id: crypto.randomUUID(),
            isVisible: true,
            title: `Position #${experienceFormData.positions.length +1}`,
            startDate: '',
            endDate: '',
            currentlyEmployed: '',
            responsibilities: []
        }

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === experienceFormData.id);
            if (company === undefined) throw new Error('Company not found!');

            company.positions.push(newPosition)
        });

        setCurrentFormDetails({
            ...currentFormDetails, 
            positions: [...currentFormDetails.positions, newPosition]
        })
        
        setIsNewPosition(true);
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

    const company = data.find(company => company.id === experienceFormData.id);

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} action="#" onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="company">Company Name</label>
                    <input type="text" name="company" id="company" autoFocus={isNewExperience} value={company.companyName} onChange={handleCompanyName} placeholder="Enter Company Name" />
                </div>              

                <div className={styles.formGroup}>
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" id="location" value={company.location} onChange={handleLocation} placeholder="Enter Location" />
                </div>

                {/* Render each position in the company */}
                {company.positions.length > 0 && (
                    company.positions.map((position, index) => {
                        const isNew = isNewPosition && index === company.positions.length - 1;

                        return <Position 
                            key={position.id} 
                            index={index} 
                            data={position} 
                            setCVData={setCVData} 
                            // TO-DO: Reformat later with Context
                            companyID={experienceFormData.id}
                            isNewPosition={isNew}
                            setIsNewPosition={setIsNewPosition}
                            positionCount={experienceFormData.positions.length}
                        />
                    })
                )}

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