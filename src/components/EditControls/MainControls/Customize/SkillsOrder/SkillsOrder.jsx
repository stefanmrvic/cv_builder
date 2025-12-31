import { useAppContext } from '../../../../../AppContext.jsx';

import SkillsOrderItem from './SkillsOrderItem.jsx';

import styles from './SkillsOrder.module.css';

export default function SkillsOrder() {
    const { skillsOrder } = useAppContext();

    return (
        <section className={styles.skillsOrderContainer}>
            <div className={styles.skillsOrderHeaderContainer}>
                <h2 className={styles.skillsOrderHeadline}>Skills Order</h2>
                <span className={styles.skillsOrderText}>Arrange the Certifications, Skill, Tools, and Ineterests in the order you want them to appear on your CV.</span>
            </div>

            <div className={styles.skillsOrderCardsContainer}>
                {skillsOrder.map((item, index) => (
                    <SkillsOrderItem 
                        key={item.id} 
                        data={item} 
                        index={index}
                        isFirst={index === 0}
                        isLast={index === skillsOrder.length - 1}
                    />
                ))}
            </div>
        </section>
    )
}