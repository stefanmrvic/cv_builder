import styles from './MainControls.module.css';

export default function PersonalDetails() {
    return (
        <div className={styles.personalDetails}>
            <form className={styles.personalDetailsForm} action="">
                <h2 className={styles.personalDataHeadline}>Personal Details</h2>

                <label htmlFor="name">Full name</label>
                <input type="text" id="name" />

                <label htmlFor="email">Email <span className={styles.recommendedText}>recommended</span></label>
                <input type="email" id="email" />

                <label htmlFor="number">Phone number <span className={styles.recommendedText}>recommended</span></label>
                <input type="tel" id="number" />

                <label htmlFor="address">Address <span className={styles.recommendedText}>recommended</span></label>
                <input type="text" id="address" />
            </form>
        </div>
    )
}