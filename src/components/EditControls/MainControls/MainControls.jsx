import Content from './Content/Content.jsx';
import Customize from './Customize/Customize.jsx';

import styles from './MainControls.module.css';

export default function MainControls({ activeTab }) {
    return (
        <div className={styles.mainControls}>
            {activeTab === 'content' ? <Content /> : <Customize /> }  
        </div>
    )
}