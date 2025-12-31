import { useAppContext } from '../../../../../AppContext';

import styles from './BulletPoints.module.css';

export default function BulletPoints() {
    const { bulletPoints, setBulletPoints } = useAppContext();

    const handleMainBulletPointChange = (e) => {
        const bulletPoint = e.target.closest(`.${styles.bulletPointsMainBtn}`);
        if (!bulletPoint) throw new Error('BulletPoint ID not found!');

        setBulletPoints({...bulletPoints, main: bulletPoint.id})
    }

    const handleSubBulletPointChange = (e) => {
        const bulletPoint = e.target.closest(`.${styles.bulletPointsSubBtn}`);
        if (!bulletPoint) throw new Error('BulletPoint ID not found!');

        setBulletPoints({...bulletPoints, sub: bulletPoint.id})
    }

    return (
        <section className={styles.bulletPointsContainer}>
            <div className={styles.bulletPointsHeaderContainer}>
                <h2 className={styles.bulletPointsHeadline}>Bullet Points</h2>
                <span className={styles.bulletPointsText}>Choose the bullet point style for your CV sections.</span>
            </div>

            <div className={styles.bulletPointsStyleContainer}>
                <div className={styles.bulletPointsMainContainer}>
                    <h3 id='main-point-label' className={styles.bulletPointsMainHeadline}>Main Point Style</h3>

                    <div className={styles.bulletPointsMainBtnContainer} role='radiogroup' aria-labelledby='main-point-label'>
                        <button id='circle' role='radio' aria-checked={bulletPoints.main === 'circle'} className={`${styles.bulletPointsMainBtn} ${bulletPoints.main === 'circle' ? styles.active : ''}`} onClick={handleMainBulletPointChange}>
                            <span className={`${styles.bulletPointsMainBtnIcon} ${styles.circle}`}></span>
                            <span className={styles.bulletPointsMainBtnText}>Circle</span>
                        </button>
                        <button id='square' role='radio' aria-checked={bulletPoints.main === 'square'} className={`${styles.bulletPointsMainBtn} ${bulletPoints.main === 'square' ? styles.active : ''}`} onClick={handleMainBulletPointChange}>
                            <span className={`${styles.bulletPointsMainBtnIcon} ${styles.square}`}></span>
                            <span className={styles.bulletPointsMainBtnText}>Square</span>
                        </button>
                        <button id='triangle' role='radio' aria-checked={bulletPoints.main === 'triangle'} className={`${styles.bulletPointsMainBtn} ${bulletPoints.main === 'triangle' ? styles.active : ''}`} onClick={handleMainBulletPointChange}>
                            <span className={`${styles.bulletPointsMainBtnIcon} ${styles.triangle}`}></span>
                            <span className={styles.bulletPointsMainBtnText}>Triangle</span>
                        </button>
                        <button id='diamond' role='radio' aria-checked={bulletPoints.main === 'diamond'} className={`${styles.bulletPointsMainBtn} ${bulletPoints.main === 'diamond' ? styles.active : ''}`} onClick={handleMainBulletPointChange}>
                            <span className={`${styles.bulletPointsMainBtnIcon} ${styles.diamond}`}></span>
                            <span className={styles.bulletPointsMainBtnText}>Diamond</span>
                        </button>
                    </div>
                </div>

                <div className={styles.bulletPointsSubContainer}>
                    <h3 id='sub-point-label' className={styles.bulletPointsSubHeadline}>Sub Point Style</h3>

                    <div className={styles.bulletPointsSubBtnContainer} role='radiogroup' aria-labelledby='sub-point-label'>
                        <button id='circle' role='radio' aria-checked={bulletPoints.sub === 'circle'} className={`${styles.bulletPointsSubBtn} ${bulletPoints.sub === 'circle' ? styles.active : ''}`} onClick={handleSubBulletPointChange}>
                            <span className={`${styles.bulletPointsSubBtnIcon} ${styles.circle}`}></span>
                            <span className={styles.bulletPointsSubBtnText}>Circle</span>
                        </button>
                        <button id='square' role='radio' aria-checked={bulletPoints.sub === 'square'} className={`${styles.bulletPointsSubBtn} ${bulletPoints.sub === 'square' ? styles.active : ''}`} onClick={handleSubBulletPointChange}>
                            <span className={`${styles.bulletPointsSubBtnIcon} ${styles.square}`}></span>
                            <span className={styles.bulletPointsSubBtnText}>Square</span>
                        </button>
                        <button id='triangle' role='radio' aria-checked={bulletPoints.sub === 'triangle'} className={`${styles.bulletPointsSubBtn} ${bulletPoints.sub === 'triangle' ? styles.active : ''}`} onClick={handleSubBulletPointChange}>
                            <span className={`${styles.bulletPointsSubBtnIcon} ${styles.triangle}`}></span>
                            <span className={styles.bulletPointsSubBtnText}>Triangle</span>
                        </button>
                        <button id='diamond' role='radio' aria-checked={bulletPoints.sub === 'diamond'} className={`${styles.bulletPointsSubBtn} ${bulletPoints.sub === 'diamond' ? styles.active : ''}`} onClick={handleSubBulletPointChange}>
                            <span className={`${styles.bulletPointsSubBtnIcon} ${styles.diamond}`}></span>
                            <span className={styles.bulletPointsSubBtnText}>Diamond</span>
                        </button>
                    </div>
                </div>
            </div>
            
            <div className={styles.bulletPointsPreviewContainer}>
                <h3 className={styles.bulletPointsPreviewHeadline}>PREVIEW</h3>
                <ul className={styles.bulletPointsPreviewList}>
                    <li className={`${styles.bulletPoint} ${styles.mainBulletPoint} ${styles[bulletPoints.main]}`}>
                        <p className={styles.bulletPointPara}>Led cross-functional team to deliver product ahead of schedule.</p>

                        <ul className={styles.subBulletPointList}>
                            <li className={`${styles.subBulletPoint} ${styles.subBulletPoint} ${styles[bulletPoints.sub]}`}>
                                Coordinated with 5 departments across 3 time zones.
                            </li>
                        </ul>
                    </li>
                </ul>

                <ul className={styles.bulletPointsPreviewList}>
                    <li className={`${styles.bulletPoint} ${styles.mainBulletPoint} ${styles[bulletPoints.main]}`}>
                        <p className={styles.bulletPointPara}>Increased user engagement by 45% through UX improvements.</p>

                        <ul className={styles.subBulletPointList}>
                            <li className={`${styles.subBulletPoint} ${styles.subBulletPoint} ${styles[bulletPoints.sub]}`}>
                                Implemented A/B testing framework for data-driven decisions.
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </section>
    )
}