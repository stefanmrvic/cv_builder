import styles from './BulletPoints.module.css';

export default function BulletPoints({setBulletPoints}) {
    return (
        <div className={styles.bulletPointsContainer}>
            <div className={styles.bulletPointsHeaderContainer}>
                <h2 className={styles.bulletPointsHeadline}>Bullet Points</h2>
                <span className={styles.bulletPointsText}>Choose the bullet point style for your CV sections.</span>
            </div>

            <div className={styles.bulletPointsStyleContainer}>
                <div className={styles.bulletPointsMainContainer}>
                    <h3 className={styles.bulletPointsMainHeadline}>Main Point Style</h3>
                    <button className={styles.bulletPointsMainBtn}>
                        <span className={`${styles.bulletPointsMainBtnIcon} ${styles.circle}`}></span>
                        <span className={styles.bulletPointsMainBtnText}>Circle</span>
                    </button>
                    <button className={`${styles.bulletPointsMainBtn} ${styles.active}`}>
                        <span className={`${styles.bulletPointsMainBtnIcon} ${styles.square}`}></span>
                        <span className={styles.bulletPointsMainBtnText}>Square</span>
                    </button>
                    <button className={styles.bulletPointsMainBtn}>
                        <span className={`${styles.bulletPointsMainBtnIcon} ${styles.triangle}`}></span>
                        <span className={styles.bulletPointsMainBtnText}>Triangle</span>
                    </button>
                    <button className={styles.bulletPointsMainBtn}>
                        <span className={`${styles.bulletPointsMainBtnIcon} ${styles.diamond}`}></span>
                        <span className={styles.bulletPointsMainBtnText}>Diamond</span>
                    </button>
                </div>

                <div className={styles.bulletPointsSubContainer}>
                    <h3 className={styles.bulletPointsSubHeadline}>Sub Point Style</h3>

                    <button className={`${styles.bulletPointsSubBtn} ${styles.active}`}>
                        <span className={`${styles.bulletPointsSubBtnIcon} ${styles.circle}`}></span>
                        <span className={styles.bulletPointsSubBtnText}>Circle</span>
                    </button>

                    <button className={styles.bulletPointsSubBtn}>
                        <span className={`${styles.bulletPointsSubBtnIcon} ${styles.square}`}></span>
                        <span className={styles.bulletPointsSubBtnText}>Square</span>
                    </button>

                    <button className={styles.bulletPointsSubBtn}>
                        <span className={`${styles.bulletPointsSubBtnIcon} ${styles.triangle}`}></span>
                        <span className={styles.bulletPointsSubBtnText}>Triangle</span>
                    </button>

                    <button className={styles.bulletPointsSubBtn}>
                        <span className={`${styles.bulletPointsSubBtnIcon} ${styles.diamond}`}></span>
                        <span className={styles.bulletPointsSubBtnText}>Diamond</span>
                    </button>  
                </div>
            </div>
            
            <div className={styles.bulletPointsPreviewContainer}>
                <h3 className={styles.bulletPointsPreviewHeadline}>PREVIEW</h3>
                <ul className={styles.bulletPointsPreviewList}>
                    <li className={styles.bulletPoint}>
                        <p>As a Full-Stack Software Engineer, I design, develop, and optimize scalable web applications and internal tools.</p>

                        <ul className={styles.subBulletPointList}>
                            <li className={styles.subBulletPoint}>
                                Built a content analytics dashboard using React, Node.js, and TypeScript, improving internal reporting speed by 40%.
                            </li>
                        </ul>
                    </li>
                </ul>

                <ul className={styles.bulletPointsPreviewList}>
                    <li className={styles.bulletPoint}>
                        <p>Led code reviews and implemented testing automation with Jest and Cypress to ensure high-quality releases.</p>

                        <ul className={styles.subBulletPointList}>
                            <li className={styles.subBulletPoint}>
                                Established testing standards that achieved 85% code coverage across frontend applications.
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

    )
}