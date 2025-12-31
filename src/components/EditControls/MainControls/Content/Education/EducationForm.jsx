import { useAppContext, useEducation } from '../../../../../AppContext';

import styles from './Education.module.css';

export default function EducationForm({ isNew, handleIsNew, isFormOpen, handleIsFormOpen, formData }) {
    const { setCVData } = useAppContext();
    const education = useEducation();
    
    const educationItem = education.find(item => item.id === formData.id);

    const handleDeleteItem = () => {
        if (!formData.id) throw new Error('formData.id is undefined!');
        
        setCVData(draft => {
            const item = draft.education.find(item => item.id === formData.id);
            if (!item) throw new Error('Item not found!');

            const itemIndex = draft.education.findIndex(item => item.id === formData.id);
            draft.education.splice(itemIndex, 1);
        });

        handleIsFormOpen(false);
        handleFormData('');
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

        handleIsNew(false);  
        handleIsFormOpen(false);
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
        
        handleIsNew(false);  
        handleIsFormOpen(false);
    }

    return (
        <div id='education-form' className={styles.formContainer}>
            <div className={`${styles.formHeaderContainer} ${isFormOpen ? styles.formOpened : ''}`}>
                <span className={`${styles.formHeaderIcon} material-symbols-outlined`}>school</span>
                <span className={styles.formHeadline}>
                    {isNew ? 'Add New Education' : 'Edit Education'}
                </span>
                <button className={`${styles.closeBtn} material-symbols-outlined`} onClick={revertChanges}>close_small</button>
            </div>

            <form className={styles.form} action="#" onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="school">School</label>
                    <input type="text" name="school" id="school" onChange={handleSchoolName} value={educationItem?.schoolName || ''} placeholder="Enter School / University" />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="degree">Degree</label>
                    <input type="text" name="degree" id="degree" onChange={handleQualification} value={educationItem?.qualification || ''} placeholder="Enter Degree / Field of study" />
                </div>
                                
                <div className={styles.formGroup}>
                    <label htmlFor="graduationDate">Graduation Date</label>
                    <input type="text" name="graduationDate" id="graduationDate" onChange={handleGraduationDate} value={educationItem?.graduationDate || ''} placeholder="Enter Graduation Date" />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" id="location" onChange={handleSchoolLocation} value={educationItem?.schoolLocation || ''} placeholder="Enter Location" />
                </div>

            </form>
                <div className={styles.formBtnContainer}>
                    <button className={styles.formBtnDelete} onClick={handleDeleteItem}>
                        <span className={`${styles.formBtnDeleteIcon} material-icons`}>delete</span>
                        <span className={styles.formBtnDeleteText}>Delete</span>
                    </button>
                    <button className={styles.formBtnCancel} onClick={revertChanges}>Cancel</button>
                    <button className={styles.formBtnSave} onClick={handleSubmit}>Save</button>
                </div>
        </div>
    )
}