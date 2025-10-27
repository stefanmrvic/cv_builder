import styles from './MainControls.module.css'

export default function ExperienceForm() {
    return (
        <div className={styles.formContainer}>
            <form className={styles.form} action="#">
                <label htmlFor="school">School</label>
                <input type="text" name="school" id="school" placeholder="Enter school / university" />     

                <label htmlFor="school">Degree</label>
                <input type="text" name="degree" id="degree" placeholder="Enter Degree / Field of study" />
                                
                <label htmlFor="startDate">Start Date</label>
                <input type="text" name="startDate" id="startDate" placeholder="Enter Start Date" />
                                
                <label htmlFor="endDate">End Date</label>
                <input type="text" name="endDate" id="endDate" placeholder="Enter End Date" />

                <label htmlFor="school">Location</label>
                <input type="text" name="location" id="location" placeholder="Enter Location" />
            </form>
            <div className={styles.formBtnContainer}>
                <button>
                    <span className={`${styles.showTextBtnIcon} material-icons`}>delete</span>
                    <span>Delete</span>
                </button>
                <button>Cancel</button>
                <button>Save</button>
            </div>
        </div>
    )
}