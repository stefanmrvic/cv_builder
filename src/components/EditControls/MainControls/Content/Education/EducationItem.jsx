import { useAppContext, useEducation } from '../../../../../AppContext';

import styles from './Education.module.css';

export default function EducationItem({ educationID, isVisible, setIsFormOpen, setFormData }) {
    const { cvData, setCVData } = useAppContext();
    const education = useEducation();

    const populateForm = (id) => {
        const educationItem = education.find(item => item.id === id)

        if (!educationItem) return;

        setFormData({
            id: educationItem.id,
            isVisible: educationItem.isVisibile,
            schoolName: educationItem.schoolName,
            graduationDate: educationItem.graduationDate,
            qualification: educationItem.qualification,
            schoolLocation: educationItem.schoolLocation
        })

        setIsFormOpen(true);
    }

    const handleDeleteItem = (e) => {
        e.stopPropagation();

        if (!educationID) throw new Error('educationID is undefined!');

        setCVData(draft => {
            const educationItemIndex = draft.education.findIndex(item => item.id === educationID);

            if (educationItemIndex === undefined) throw new Error('Item not found!');

            draft.education.splice(educationItemIndex, 1);
        })
    }

    const handleVisibility = (e) => {
        e.stopPropagation();

        if (!educationID) throw new Error('educationID is undefined!');

       setCVData(draft => {
            const educationItem = draft.education.find(item => item.id === educationID);

            if (!educationItem) throw new Error('educationItem not found!');

            educationItem.isVisible = !educationItem.isVisible;
       })
    }

    const schoolName = cvData.education.find(item => item.id === educationID)?.schoolName;

    return (
        <div className={styles.educationItem} onClick={() => populateForm(educationID)} role='button'>
            <span className={styles.educationItemHeadline}>{schoolName}</span>
            <div className={styles.educationBtnContainer}>
                <button onClick={handleVisibility}>
                    <span className={`${styles.visibilityBtnIcon} material-symbols-outlined`}>
                        {isVisible ? 'visibility' : 'visibility_off'}
                    </span>
                </button>
                
                <button onClick={handleDeleteItem}>
                    <span className={`${styles.deleteBtnIcon} material-icons`}>delete</span>
                </button>
            </div>
        </div>
    )
}