import styles from './Experience.module.css';

export default function Company({itemID, isVisible, data, setCVData, setIsExperienceFormOpen, setExperienceFormData, onClick, company}) {
    const populateForm = (id) => {
        const item = data.find(item => item.id === id);

        if (!item) return;

        setExperienceFormData({
            id: item.id,
            isVisible: item.isVisible,
            companyName: item.companyName,
            location: item.location,
            positions: item.positions
        })
    }
    
    const handleDelete = (e) => {
        e.stopPropagation();

        if (!itemID) throw new Error('itemID is undefined!');

        setCVData(draft => {
            const itemIndex = draft.workExperience.findIndex(item => item.id === itemID);

            if (itemIndex === undefined) throw new Error('Item not found!');
            draft.workExperience.splice(itemIndex, 1);
        })
    }

    const handleVisibility = (e) => {
        e.stopPropagation();

        if (!itemID) throw new Error('itemID is undefined!');

       setCVData(draft => {
            const item = draft.workExperience.find(item => item.id === itemID);
            
            if (!item) throw new Error('Item not found!');
            
            item.isVisible = !item.isVisible;
       })
    }

    const handleEdit = (e) => {
        e.stopPropagation();

        if (!itemID) throw new Error('itemID is undefined!');
        const item = data.find(item => item.id === itemID);

        populateForm(item.id);
        setIsExperienceFormOpen(true);
    }

    return (
        <a onClick={onClick} className={`${styles.btn} ${styles.company}`}>
            <span className={styles.btnText}>{company}</span>
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