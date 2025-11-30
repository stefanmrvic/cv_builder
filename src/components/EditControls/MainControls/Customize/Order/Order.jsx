import OrderItem from './OrderItem.jsx';

import styles from './Order.module.css';

export default function Order({order, setOrder}) {
    console.log(order)
    return (
        <div className={styles.orderContainer}>
            <div className={styles.orderHeaderContainer}>
                <h2 className={styles.orderHeadline}>Order</h2>
                <span className={styles.orderText}>Arrange the sections in the order you want them to appear on your CV.</span>
            </div>

            <div className={styles.orderCardsContainer}>
                {order.map((item, index) => (
                    <OrderItem 
                        key={item.id} 
                        data={item} 
                        index={index}
                        order={order}
                        setOrder={setOrder} 
                        isFirst={index === 0}
                        isLast={index === order.length - 1}
                    />
                ))}
            </div>
        </div>
    )
}