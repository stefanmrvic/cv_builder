import styles from '../MainControls.module.css'

export default function EducationForm({isNew, setIsNew, setIsFormOpen, formData, data, setCVData}) {
    const handleDeleteItem = () => {
        if (!formData.id) throw new Error('formData.id is undefined!');

        setCVData(draft => {
            const itemIndex = draft.education.findIndex(item => item.id === formData.id);
            
            if (itemIndex === undefined) throw new Error('Item not found!');

            draft.education.splice(itemIndex, 1);
        });

        setIsFormOpen(false);
    }

    const revertChanges = () => {
        if (!formData.id) throw new Error('formData.id is undefined!');
        
        setCVData(draft => {
            const item = draft.education.find(item => item.id === formData.id);

            if (!item) throw new Error('Item not found!');

            if (isNew) {
                const itemIndex = draft.education.findIndex(item => item.id === formData.id);
                draft.education.splice(itemIndex, 1);
            } else {
                item.isVisibile = formData.isVisibile;
                item.schoolName = formData.schoolName;
                item.graduationDate = formData.graduationDate;
                item.qualification = formData.qualification;
                item.schoolLocation = formData.schoolLocation;
            }
        });

        setIsNew(false);  
        setIsFormOpen(false);
    }

    const handleSchoolName = (e) => {
        setCVData(draft => {
            const item = draft.education.find(item => item.id === formData.id);

            if (!item) throw new Error('Item not found!');

            item.schoolName = e.target.value;
        });
    }

    const handleGraduationDate = (e) => {
        setCVData(draft => {
            const item = draft.education.find(item => item.id === formData.id);

            if (!item) throw new Error('Item not found!');

            item.graduationDate = e.target.value;
        });
    }

    const handleQualification = (e) => {
        setCVData(draft => {
            const item = draft.education.find(item => item.id === formData.id);

            if (!item) throw new Error('Item not found!');

            item.qualification = e.target.value;
        });
    }

    const handleSchoolLocation = (e) => {
        setCVData(draft => {
            const item = draft.education.find(item => item.id === formData.id);

            if (!item) throw new Error('Item not found!');

            item.schoolLocation = e.target.value;
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsFormOpen(false);
    }

    const item = data.find(item => item.id === formData.id);

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

            </form>
                <div className={styles.formBtnContainer}>
                    <button className={styles.formBtnDelete} onClick={handleDeleteItem}>
                        <span className={`${styles.formBtnDeleteIcon} material-icons`}>delete</span>
                        <span>Delete</span>
                    </button>
                    <button className={styles.formBtnCancel} onClick={revertChanges}>Cancel</button>
                    <button className={styles.formBtnSave} onClick={() => setIsFormOpen(false)}>Save</button>
                </div>
        </div>
    )
}