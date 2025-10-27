import { useState } from 'react'

import Content from './Content.jsx'
import Customize from './Customize.jsx'

import styles from './SideControls.module.css'

export default function SideControls() {
    const [ activeTab, setActiveTab] = useState('content');

    return (
        <div className={styles.sideControls}>
            <nav className={styles.sidebar}>
                <Content 
                    className={activeTab === 'content' ? `${styles.active}`: ''}
                    onClick={() => setActiveTab('content')} 
                />
                <Customize 
                    className={activeTab === 'customize' ? `${styles.active}`: ''}
                    onClick={() => setActiveTab('customize')} 
                />
            </nav>
        </div>
    )
}