import styles from './MainControls.module.css'

export default function EducationForm({onClick}) {
    return (
        <div className={styles.formContainer}>
            <form className={styles.form} action="#">
                <div className={styles.formGroup}>
                    <label htmlFor="school">School</label>
                    <input type="text" name="school" id="school" placeholder="Enter school / university" />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="degree">Degree</label>
                    <input type="text" name="degree" id="degree" placeholder="Enter Degree / Field of study" />
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