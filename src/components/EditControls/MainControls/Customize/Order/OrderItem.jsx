import styles from './Order.module.css';

const handleOrderSwap = () => {
    
}

export default function OrderItem({data, setCVData, setOrder, isFirst, isLast}) {
    return (
        <div className={styles.orderCardContainer}>
            <div className={styles.orderCardHeaderContainer}>
                {/* Checks if the icon is "settings" because it requires different class than the rest of the icons. */}
                <span className={`${styles.orderCardIcon} ${data.icon === 'settings' ? 'material-icons' : 'material-symbols-outlined'}`}>{data.icon}</span>
                <span className={styles.orderCardHeadline}>{data.headline}</span>
            </div>

            <div className={styles.orderCardBtnContainer}>
                <button className={styles.orderCardBtn} disabled={isLast} onClick={handleOrderSwap}>
                    <span className={`${styles.orderCardBtnIcon} material-symbols-outlined`}>keyboard_double_arrow_down</span>
                </button>

                <button className={styles.orderCardBtn} disabled={isFirst} onClick={handleOrderSwap}>
                    <span className={`${styles.orderCardBtnIcon} material-symbols-outlined`}>keyboard_double_arrow_up</span>
                </button>
            </div>
        </div>
    )
}