import Position from './Position.jsx';

import styles from './Experience.module.css';

export default function ExperienceForm({data, setCVData, isNew, setIsNew, setIsExperienceFormOpen, experienceFormData}) {
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

            if (isNew) {
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

        setIsNew(false);  
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

    const handleQualification = (e) => {
        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === experienceFormData.id);

            if (!company) throw new Error('Company not found!');

            company.qualification = e.target.value;
        });
    }

    const handleSchoolLocation = (e) => {
        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === experienceFormData.id);

            if (!company) throw new Error('Company not found!');

            company.schoolLocation = e.target.value;
        });
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
                {!experienceFormData.positions && <Position />}

                {/* Render each position in the company */}
                {company.positions?.map((position, index) => (
                    <Position 
                        key={position.id} 
                        index={index} 
                        data={position} 
                        setCVData={setCVData} 
                        companyID={experienceFormData.id} 
                    />
                ))}

                <div className={styles.addPositionBtnContainer}>
                    <button className={styles.addPositionBtn}>
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