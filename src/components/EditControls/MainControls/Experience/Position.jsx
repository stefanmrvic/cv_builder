import styles from './Experience.module.css';

export default function Position({data}) {
    if (!data) return null;

    const handlePositionTitle = (e) => {
        e.stopPropagation();

        setCVData(draft => {
            draft.title = e.target.value;
        });
    }

    return (
        <div className={styles.positionContainer}>
            <div className={styles.formGroup}>
                <label htmlFor="title">Position Title</label>
                <input type="text" name="title" id="title" value={item.companyName} onChange={handlePositionTitle} placeholder="Enter Position Title" />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="title">Position Title</label>
                <input type="text" name="title" id="title" value={item.companyName} placeholder="Enter Position Title" />
            </div>
        </div>
    )
}