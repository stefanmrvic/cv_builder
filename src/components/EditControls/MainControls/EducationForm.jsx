import styles from './MainControls.module.css'

export default function EducationForm({isNew, setIsNew, isFormOpen, setIsFormOpen, formData, cvData, setCVData}) {
    const revertChanges = () => {
        if (!formData.id) return;

        if (isNew) {
            setCVData(draft => {
                const item = draft.education.find(item => item.id === formData.id);

                if (!item) return;

                const itemIndex = draft.education.findIndex(item => item.id === formData.id)
                draft.education.splice(itemIndex, 1);

                setIsNew(false);
                return;
            })
        }

        setCVData(draft => {
            const item = draft.education.find(item => item.id === formData.id);

            if (!item) return;

            item.schoolName = formData.schoolName;
            item.graduationDate = formData.graduationDate;
            item.qualification = formData.qualification;
            item.schoolLocation = formData.schoolLocation;
        })
    }

    const handleSchoolName = (e) => {
        setCVData(draft => {
            const item = draft.education.find(item => item.id === formData.id);

            if (!item) return;

            item.schoolName = e.target.value;
        });
    }

    const handleGraduationDate = (e) => {
        setCVData(draft => {
            const item = draft.education.find(item => item.id === formData.id);

            if (!item) return;

            item.graduationDate = e.target.value;
        });
    }

    const handleQualification = (e) => {
        setCVData(draft => {
            const item = draft.education.find(item => item.id === formData.id);

            if (!item) return;

            item.qualification = e.target.value;
        });
    }

    const handleSchoolLocation = (e) => {
        setCVData(draft => {
            const item = draft.education.find(item => item.id === formData.id);

            if (!item) return;

            item.schoolLocation = e.target.value;
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setCVData(draft => {
            const item = draft.education.find(item => item.id === formData.id);

            if (!item) return;

            item.schoolName = formData.schoolName;
            item.graduationDate = formData.graduationDate;
            item.qualification = formData.qualification;
            item.schoolLocation = formData.schoolLocation;
        });

        setIsFormOpen(!isFormOpen);
    }

    const item = cvData.education.find(item => item.id === formData.id);

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} action="#" onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="school">School</label>
                    <input type="text" name="school" id="school" onChange={handleSchoolName} value={item?.schoolName || ''} placeholder="Enter School / University" />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="degree">Degree</label>
                    <input type="text" name="degree" id="degree" onChange={handleQualification} value={item?.qualification || ''} placeholder="Enter Degree / Field of study" />
                </div>
                                
                <div className={styles.formGroup}>
                    <label htmlFor="graduationDate">Graduation Date</label>
                    <input type="text" name="graduationDate" id="graduationDate" onChange={handleGraduationDate} value={item?.graduationDate || ''} placeholder="Enter Graduation Date" />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" id="location" onChange={handleSchoolLocation} value={item?.schoolLocation || ''} placeholder="Enter Location" />
                </div>

                <div className={styles.formBtnContainer}>
                    <button className={styles.formBtnDelete}>
                        <span className={`${styles.formBtnDeleteIcon} material-icons`}>delete</span>
                        <span>Delete</span>
                    </button>
                    <button className={styles.formBtnCancel} onClick={revertChanges}>Cancel</button>
                    <button className={styles.formBtnSave} type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}