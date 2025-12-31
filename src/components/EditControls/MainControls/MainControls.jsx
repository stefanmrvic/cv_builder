import Content from './Content/Content.jsx';
import Customize from './Customize/Customize.jsx';

import styles from './MainControls.module.css';

export default function MainControls({ activeTab }) {
    return (
        <div className={styles.mainControls}>
            {/* Using CSS to apply display none instead of conditional rendering in order to prevent breaking the link between the <nav> ARIA tabs and actual <Content /> & <Customize /> components. */}
            <Content style={{ display: activeTab === 'content' ? 'flex' : 'none' }} /> 
            <Customize style={{ display: activeTab === 'customize' ? 'flex' : 'none' }} /> 
        </div>
    )
}