import Position from './Position.jsx';

import styles from './Experience.module.css';

export default function ExperienceForm({isNew, setIsNew, setIsExperienceFormOpen, experienceFormData, data, setCVData}) {
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
                console.log('kurcinaa')
            }
        });

        setIsNew(false);  
        setIsExperienceFormOpen(false);
    }

    const handleSchoolName = (e) => {
        setCVData(draft => {
            const item = draft.workExperience.find(item => item.id === experienceFormData.id);

            if (!item) throw new Error('Item not found!');

            item.schoolName = e.target.value;
        });
    }

    const handleGraduationDate = (e) => {
        setCVData(draft => {
            const item = draft.workExperience.find(item => item.id === experienceFormData.id);

            if (!item) throw new Error('Item not found!');

            item.graduationDate = e.target.value;
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
                    <input type="text" name="company" id="company" placeholder="Enter Company Name" />
                </div>              

                <div className={styles.formGroup}>
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" id="location" placeholder="Enter Location" />
                </div>

                <Position />

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