import { useAppContext } from '../../../../../AppContext';

import styles from './SectionsOrder.module.css';

export default function OrderItem({ data, index, isFirst, isLast }) {
    const { sectionsOrder, setSectionsOrder } = useAppContext();
    
    const handleOrderShiftUp = () => {
        if (index === 0) return;

        const newArr = sectionsOrder.map((item, itemIndex) => {
            if (itemIndex === index - 1) return sectionsOrder[index];
            else if (itemIndex === index) return sectionsOrder[index - 1];

            return item;
        })

        setSectionsOrder(newArr);
    }

    const handleOrderShiftDown = () => {
        if (index === sectionsOrder.length - 1) return;

        const newArr = sectionsOrder.map((item, itemIndex) => {
            if (itemIndex === index + 1) return sectionsOrder[index];
            else if (itemIndex === index) return sectionsOrder[index + 1];

            return item;
        })

        setSectionsOrder(newArr);
    }

    return (
        <div className={styles.sectionsOrderCardContainer}>
            <div className={styles.sectionsOrderCardHeaderContainer}>
                {/* Checks if the icon is "settings" because it requires different class than the rest of the icons. */}
                <span className={`${styles.sectionsOrderCardIcon} ${data.icon === 'settings' ? 'material-icons' : 'material-symbols-outlined'}`}>{data.icon}</span>
                <span className={styles.sectionsOrderCardHeadline}>{data.headline}</span>
            </div>

            <div className={styles.sectionsOrderCardBtnContainer}>
                <button className={styles.sectionsOrderCardBtn} disabled={isFirst} onClick={handleOrderShiftUp}>
                    <span className={`${styles.sectionsOrderCardBtnIcon} material-symbols-outlined`}>keyboard_double_arrow_up</span>
                </button>
                
                <button className={styles.sectionsOrderCardBtn} disabled={isLast} onClick={handleOrderShiftDown}>
                    <span className={`${styles.sectionsOrderCardBtnIcon} material-symbols-outlined`}>keyboard_double_arrow_down</span>
                </button>
            </div>
        </div>
    )
}