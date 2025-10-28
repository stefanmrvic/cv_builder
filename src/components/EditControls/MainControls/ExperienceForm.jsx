import styles from './MainControls.module.css'

export default function ExperienceForm({onClick}) {
    return (
        <div className={styles.formContainer}>
            <form className={styles.form} action="#">
                <div className={styles.formGroup}>
                    <label htmlFor="company">Company Name</label>
                    <input type="text" name="company" id="company" placeholder="Enter Company Name" />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="position">Position Title</label>
                    <input type="text" name="position" id="position" placeholder="Enter Position Title" />
                </div>
                                
                <div className={styles.formGroupDate}>
                    <div className={styles.formGroup}>
                        <label htmlFor="startDate">Start Date</label>
                        <input type="text" name="startDate" id="startDate" placeholder="Enter Start Date" />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="endDate">End Date</label>
                        <input type="text" name="endDate" id="endDate" placeholder="Enter End Date" />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" id="location" placeholder="Enter Location" />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" placeholder="Enter Description"></textarea>
                </div>
            </form>
            <div className={styles.formBtnContainer}>
                <button className={styles.formBtnDelete}>
                    <span className={`${styles.formBtnDeleteIcon} material-icons`}>delete</span>
                    <span>Delete</span>
                </button>
                <button className={styles.formBtnCancel} onClick={onClick}>Cancel</button>
                <button className={styles.formBtnSave}>Save</button>
            </div>
        </div>
    )
}