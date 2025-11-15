import styles from './Experience.module.css';

export default function Company({data, setCVData, companyID, companyName, isVisible, setIsExperienceFormOpen, setExperienceFormData, onClick}) {
    const populateForm = (id) => {
        const company = data.find(company => company.id === id);
        if (!company) throw new Error('Company not found!');

        setExperienceFormData({
            id: company.id,
            isVisible: company.isVisible,
            companyName: company.companyName,
            location: company.location,
            positions: company.positions
        })
    }
    
    const handleDelete = (e) => {
        e.stopPropagation();

        const company = data.find(company => company.id === companyID);
        if (!company) throw new Error('Company not found!');

        setCVData(draft => {
            const companyIndex = draft.workExperience.findIndex(company => company.id === companyID);
            if (companyIndex === undefined) throw new Error('Company not found!');

            draft.workExperience.splice(companyIndex, 1);
        })
    }

    const handleVisibility = (e) => {
        e.stopPropagation();

        const company = data.find(company => company.id === companyID);
        if (!company) throw new Error('Company not found!');

       setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === companyID);
            if (!company) throw new Error('Company not found!');
            
            company.isVisible = !company.isVisible;
       })
    }

    const handleEdit = (e) => {
        e.stopPropagation();

        const company = data.find(company => company.id === companyID);
        if (!company) throw new Error('Company not found!');

        populateForm(companyID);
        setIsExperienceFormOpen(true);
    }

    return (
        <a onClick={onClick} className={`${styles.btn} ${styles.company}`}>
            <span className={styles.btnText}>{companyName}</span>
            <div className={styles.companyBtnContainer}>
                <button className={styles.visibilityBtn} onClick={handleVisibility}>
                    <span className={`${styles.visibilityBtnIcon} material-symbols-outlined`}>
                        {isVisible ? 'visibility' : 'visibility_off'}
                    </span>
                </button>

                <button className={styles.deleteBtn} onClick={handleDelete}>
                    <span className={`${styles.deleteBtnIcon} material-icons`}>delete</span>
                </button>

                <button className={styles.editBtn} onClick={handleEdit}>
                    <span className={`${styles.editBtnIcon} material-symbols-outlined`}>edit_square</span>
                </button>
            </div>
        </a>
    )
}