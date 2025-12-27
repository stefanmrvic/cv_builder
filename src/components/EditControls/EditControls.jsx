import { useState } from 'react';

import SideControls from './SideControls/SideControls.jsx';
import TopControls from './TopControls/TopControls.jsx';
import MainControls from './MainControls/MainControls.jsx';

import styles from './EditControls.module.css';

export default function EditControls() {
    const [activeTab, setActiveTab] = useState('content');

    return (
        <div className={styles.editControls}>
            <SideControls activeTab={activeTab} setActiveTab={setActiveTab} />
            <TopControls />
            <MainControls activeTab={activeTab} />
        </div>
    )
}