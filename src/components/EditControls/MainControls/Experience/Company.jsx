import styles from '../MainControls.module.css';

export default function Company({itemID, isVisible, setCVData, onClick, company}) {
    const handleDeleteItem = (e) => {
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

    return (
        <a  onClick={onClick} className={`${styles.btn} ${styles.company}`}>
            <span className={styles.btnText}>{company}</span>
            <div className={styles.companyBtnContainer}>
                <button onClick={handleDeleteItem}>
                    <span className={`${styles.deleteBtnIcon} material-icons`}>delete</span>
                </button>
                <button onClick={handleVisibility}>
                    <span className={`${styles.visibilityBtnIcon} material-symbols-outlined`}>
                        {isVisible ? 'visibility' : 'visibility_off'}
                    </span>
                </button>
            </div>
        </a>
    )
}