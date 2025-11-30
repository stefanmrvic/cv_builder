import styles from './Order.module.css';

export default function OrderItem({data, setCVData, index, order, setOrder, isFirst, isLast}) {
    const handleOrderShiftUp = () => {
        if (index === 0) return;

        const newArr = order.map((item, itemIndex) => {
            if (itemIndex === index - 1) return order[index];
            else if (itemIndex === index) return order[index - 1];

            return item;
        })

        setOrder(newArr);
    }

    const handleOrderShiftDown = () => {
        if (index === order.length - 1) return;

        const newArr = order.map((item, itemIndex) => {
            if (itemIndex === index + 1) return order[index];
            else if (itemIndex === index) return order[index + 1];

            return item;
        })

        setOrder(newArr);
    }

    return (
        <div className={styles.orderCardContainer}>
            <div className={styles.orderCardHeaderContainer}>
                {/* Checks if the icon is "settings" because it requires different class than the rest of the icons. */}
                <span className={`${styles.orderCardIcon} ${data.icon === 'settings' ? 'material-icons' : 'material-symbols-outlined'}`}>{data.icon}</span>
                <span className={styles.orderCardHeadline}>{data.headline}</span>
            </div>

            <div className={styles.orderCardBtnContainer}>
                <button className={styles.orderCardBtn} disabled={isFirst} onClick={handleOrderShiftUp}>
                    <span className={`${styles.orderCardBtnIcon} material-symbols-outlined`}>keyboard_double_arrow_up</span>
                </button>
                
                <button className={styles.orderCardBtn} disabled={isLast} onClick={handleOrderShiftDown}>
                    <span className={`${styles.orderCardBtnIcon} material-symbols-outlined`}>keyboard_double_arrow_down</span>
                </button>
            </div>
        </div>
    )
}