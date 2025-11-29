import OrderItem from './OrderItem.jsx';

import styles from './Order.module.css';

export default function Order({setOrder}) {
    const cvSections = [
        {
            id: 'workExperience',
            icon: 'business_center',
            headline: 'Experience'
        },
        {
            id: 'skillsToolsInterests',
            icon: 'settings',
            headline: 'Skills, Tools & Interests'
        },
        {
            id: 'education',
            icon: 'school',
            headline: 'Education'
        }
    ]

    return (
        <div className={styles.orderContainer}>
            <div className={styles.orderHeaderContainer}>
                <h2 className={styles.orderHeadline}>Order</h2>
                <span className={styles.orderText}>Arrange the sections in the order you want them to appear on your CV.</span>
            </div>

            <div className={styles.orderCardsContainer}>
                {cvSections.map((item, index) => (
                    <OrderItem 
                        key={item.id} 
                        data={item} 
                        setOrder={setOrder} 
                        isFirst={index === 0}
                        isLast={index === cvSections.length - 1}
                    />
                ))}
            </div>
        </div>
    )
}