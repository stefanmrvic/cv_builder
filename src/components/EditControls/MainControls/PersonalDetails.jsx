import styles from './MainControls.module.css';

export default function PersonalDetails() {
    return (
        <div className={styles.personalDetails}>
            <form className={styles.personalDetailsForm} action="">
                <h2 className={styles.headline}>Personal Details</h2>

                <label for="name">Full name</label>
                <input type="text" id="name" />

                <label for="email">Email <span className='recommended-text'>recommended</span></label>
                <input type="email" id="email" />

                <label for="number">Phone number <span className='recommended-text'>recommended</span></label>
                <input type="tel" id="number" />

                <label for="address">Address <span className='recommended-text'>recommended</span></label>
                <input type="text" id="address" />
            </form>
        </div>
    )
}