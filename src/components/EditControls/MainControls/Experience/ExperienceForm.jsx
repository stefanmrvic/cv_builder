import Position from './Position.jsx';

import styles from './Experience.module.css';

export default function ExperienceForm({data, setCVData, isNew, setIsNew, setIsExperienceFormOpen, experienceFormData}) {
    const handleDeleteItem = () => {
        if (!experienceFormData.id) throw new Error('experienceFormData.id is undefined!');

        setCVData(draft => {
            const itemIndex = draft.workExperience.findIndex(item => item.id === experienceFormData.id);
            
            if (itemIndex === undefined) throw new Error('Item not found!');

            draft.workExperience.splice(itemIndex, 1);
        });

        setIsExperienceFormOpen(false);
    }

    const revertChanges = () => {
        if (!experienceFormData.id) throw new Error('experienceFormData.id is undefined!');
        
        setCVData(draft => {
            const item = draft.workExperience.find(item => item.id === experienceFormData.id);

            if (!item) throw new Error('Item not found!');

            if (isNew) {
                const itemIndex = draft.workExperience.findIndex(item => item.id === experienceFormData.id);
                draft.workExperience.splice(itemIndex, 1);
            } else {
                item.id = experienceFormData.id;
                item.isVisible = experienceFormData.isVisible;
                item.companyName = experienceFormData.companyName;
                item.location = experienceFormData.location;
                item.positions = experienceFormData.positions;
            }
        });

        setIsNew(false);  
        setIsExperienceFormOpen(false);
    }

    const handleCompanyName = (e) => {
        setCVData(draft => {
            const item = draft.workExperience.find(item => item.id === experienceFormData.id);

            if (!item) throw new Error('Item not found!');

            item.companyName = e.target.value;
        });
    }

    const handleLocation = (e) => {
        setCVData(draft => {
            const item = draft.workExperience.find(item => item.id === experienceFormData.id);

            if (!item) throw new Error('Item not found!');

            item.location = e.target.value;
        });
    }

    const handleQualification = (e) => {
        setCVData(draft => {
            const item = draft.workExperience.find(item => item.id === experienceFormData.id);

            if (!item) throw new Error('Item not found!');

            item.qualification = e.target.value;
        });
    }

    const handleSchoolLocation = (e) => {
        setCVData(draft => {
            const item = draft.workExperience.find(item => item.id === experienceFormData.id);

            if (!item) throw new Error('Item not found!');

            item.schoolLocation = e.target.value;
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsExperienceFormOpen(false);
    }

    const item = data.find(item => item.id === experienceFormData.id);

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} action="#" onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="company">Company Name</label>
                    <input type="text" name="company" id="company" value={item.companyName} onChange={handleCompanyName} placeholder="Enter Company Name" />
                </div>              

                <div className={styles.formGroup}>
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" id="location" value={item.location} onChange={handleLocation} placeholder="Enter Location" />
                </div>

                {/* Render empty position field if no positions exist */}
                {!experienceFormData.positions && <Position />}

                {/* Render each position in the company */}
                {experienceFormData.positions?.map(position => (
                    <Position key={position.id} data={position} />
                ))}

                <div className={styles.addBtnContainer}>
                    <button 
                        className={`${styles.addBtn} ${styles.btn}`} 
                        // place for onClick={onClick handler}
                    >
                        <span className={`${styles.addBtnIcon} material-symbols-outlined`}>add</span>
                        <span>Position</span>
                    </button>
                </div>
            </form>

            <div className={styles.formBtnContainer}>
                <button className={styles.formBtnDelete} onClick={handleDeleteItem}>
                    <span className={`${styles.formBtnDeleteIcon} material-icons`}>delete</span>
                    <span>Delete</span>
                </button>
                <button className={styles.formBtnCancel} onClick={revertChanges}>Cancel</button>
                <button className={styles.formBtnSave} onClick={() => setIsExperienceFormOpen(false)}>Save</button>
            </div>
        </div>
    )
}