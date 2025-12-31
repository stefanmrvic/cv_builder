import { useAppContext } from '../../../../../AppContext';

import styles from './SkillsOrder.module.css';

export default function OrderItem({ data, index, isFirst, isLast }) {
    const { skillsOrder, setSkillsOrder } = useAppContext();
    
    const handleOrderShiftUp = () => {
        if (index === 0) return;

        const newArr = skillsOrder.map((item, itemIndex) => {
            if (itemIndex === index - 1) return skillsOrder[index];
            else if (itemIndex === index) return skillsOrder[index - 1];

            return item;
        })

        setSkillsOrder(newArr);
    }

    const handleOrderShiftDown = () => {
        if (index === skillsOrder.length - 1) return;

        const newArr = skillsOrder.map((item, itemIndex) => {
            if (itemIndex === index + 1) return skillsOrder[index];
            else if (itemIndex === index) return skillsOrder[index + 1];

            return item;
        })

        setSkillsOrder(newArr);
    }

    return (
        <div className={styles.skillsOrderCardContainer}>
            <div className={styles.skillsOrderCardHeaderContainer}>
                {/* Checks if the icon is "settings" because it requires different class than the rest of the icons. */}
                <span className={styles.skillsOrderCardHeadline}>{data.headline}</span>
            </div>

            <div className={styles.skillsOrderCardBtnContainer}>
                <button className={styles.skillsOrderCardBtn} disabled={isFirst} onClick={handleOrderShiftUp}>
                    <span className={`${styles.skillsOrderCardBtnIcon} material-symbols-outlined`}>keyboard_double_arrow_up</span>
                </button>
                
                <button className={styles.skillsOrderCardBtn} disabled={isLast} onClick={handleOrderShiftDown}>
                    <span className={`${styles.skillsOrderCardBtnIcon} material-symbols-outlined`}>keyboard_double_arrow_down</span>
                </button>
            </div>
        </div>
    )
}