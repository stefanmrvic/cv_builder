import { useAppContext } from '../../../../../AppContext.jsx';

import SectionsOrderItem from './SectionsOrderItem.jsx';

import styles from './SectionsOrder.module.css';

export default function Order() {
    const { sectionsOrder } = useAppContext();

    return (
        <section className={styles.sectionsOrderContainer}>
            <div className={styles.sectionsOrderHeaderContainer}>
                <h2 className={styles.sectionsOrderHeadline}>Sections Order</h2>
                <span className={styles.sectionsOrderText}>Arrange the sections in the order you want them to appear on your CV.</span>
            </div>

            <div className={styles.orderCardsContainer}>
                {sectionsOrder.map((item, index) => (
                    <SectionsOrderItem 
                        key={item.id} 
                        data={item} 
                        index={index}
                        isFirst={index === 0}
                        isLast={index === sectionsOrder.length - 1}
                    />
                ))}
            </div>
        </section>
    )
}